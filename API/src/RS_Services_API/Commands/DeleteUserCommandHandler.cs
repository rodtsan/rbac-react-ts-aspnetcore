using Microsoft.AspNetCore.Identity;
using RS_Services_API.Commands.Models;
using RS_Services_API.Services;
using RS_Services_Core.Commands;

namespace RS_Services_API.Commands
{
	public class DeleteUserCommandHandler : IHandleCommand<DeleteUserCommand>
	{
		private readonly UserManager _userManager;
		public DeleteUserCommandHandler(UserManager userManager)
		{
			_userManager = userManager;
		}

		public async Task<CommandHandlerResult> HandleAsync(DeleteUserCommand command)
		{
			var userId = command.UserId;

			var user = await _userManager.FindByIdAsync(userId.ToString());
			if (user is null)
				return CommandHandlerResult.Error("Unable to find the user");

			var result = new IdentityResult { };
			if (user.Deleted)
			{
				/* Permanently deleted */
				result = await _userManager.DeleteAsync(user);
			}
			else
			{
				user.Deleted = true;
				result = await _userManager.UpdateAsync(user);
			}

			if (!result.Succeeded)
			{
				var error = result.Errors.Select(q => q.Description).FirstOrDefault("Error occured while deleting this user");
				return CommandHandlerResult.Error(error);
			}

			return CommandHandlerResult.OkDelayed(this, _ => new
			{
				UserId = userId,
			});
		}
	}
}
