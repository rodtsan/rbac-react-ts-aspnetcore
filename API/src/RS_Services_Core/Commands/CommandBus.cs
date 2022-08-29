using Autofac;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security;
using static System.Formats.Asn1.AsnWriter;

namespace RS_Services_Core.Commands
{
	public abstract class CommandBus<TDb> : ICommandBus
	  where TDb : DbContext
	{
		private const string SCOPE_NAME = "CommandHandlers";
		private readonly ILifetimeScope _scope;
		private CommandHandlerResult _innerOkResult;

		public CommandBus(ILifetimeScope scope)
		{
			if (scope == null)
			{
				throw new ArgumentNullException("scope");
			}
			_scope = scope;
		}

		public CommandResult GetDelayedCommandResult()
		{
			if (_innerOkResult == null || !_innerOkResult.HasDelayedContent)
			{
				return GetCommandResultFromCommandHandlerResult(_innerOkResult);
			}

			_innerOkResult.ResolveAndUpdateDelayedContent();
			return GetCommandResultFromCommandHandlerResult(_innerOkResult);
		}


		private async Task<CommandResult> ValidateAsync<TCommand>(TCommand command) where TCommand : ICommand
		{
			try
			{
				var innerHandler = _scope.ResolveOptional(typeof(IHandleCommand<TCommand>)) as IHandleCommand<TCommand>;

				if (innerHandler != null)
				{
					command.Validate();

					if (command.IsValid)
					{
						_innerOkResult = await innerHandler.HandleAsync(command);

						if (_innerOkResult == null || !_innerOkResult.HasDelayedContent)
						{
							return GetCommandResultFromCommandHandlerResult(_innerOkResult);
						}

						_innerOkResult.ResolveAndUpdateDelayedContent();

						return GetCommandResultFromCommandHandlerResult(_innerOkResult);
					}
					else
					{
						return CommandResult.FromValidationErrors(command.ValidationErrorMessages);

					}
				}

				return CommandResult.NonExistentCommand(typeof(TCommand).Name);
			}
			catch (SecurityException ex)
			{
				return new CommandResult(HttpStatusCode.Forbidden, null, ex.Message);
			}
			catch (Exception ex)
			{
				return new CommandResult(HttpStatusCode.InternalServerError, null, ex.Message);
			}
		}

		public async Task<CommandResult> SendAsync<TCommand>(TCommand command) where TCommand : ICommand
		{
			return await ValidateAsync<TCommand>(command);
		}
		public async Task<CommandResult> ExecuteAsync<TCommand>(TCommand command) where TCommand : ICommand
		{
			var context = _scope.Resolve<TDb>();
			using var transaction = await context.Database.BeginTransactionAsync();
			try
			{
				var result = await ValidateAsync(command);
				if (result.IsOk)
				{
					result = GetDelayedCommandResult();

					await context.SaveChangesAsync();

					await transaction.CommitAsync();

				}
				else
				{
					result.Message = result.Value?.ToString();

					await transaction.RollbackAsync();
				}
				return result;

			}
			catch (Exception ex)
			{
				await transaction.RollbackAsync();

				return new CommandResult(HttpStatusCode.InternalServerError, null, ex.Message);
			}
		}


		private CommandResult GetCommandResultFromCommandHandlerResult(CommandHandlerResult result)
		{
			if (result == CommandHandlerResult.Ok)
			{
				return CommandResult.Ok;
			}
			var content = result?.Content;
			var statusCode = result?.StatusCode ?? HttpStatusCode.NoContent;
			return new CommandResult(statusCode, content);
		}

		public async Task<int> ApplyChangesAsync()
		{
			return await _scope.Resolve<TDb>().SaveChangesAsync();
		}
	}
}
