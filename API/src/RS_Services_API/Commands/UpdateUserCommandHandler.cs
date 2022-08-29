using RS_Services_API.Commands.Models;
using RS_Services_API.Services;
using RS_Services_Core.Commands;

namespace RS_Services_API.Commands
{
    public class UpdateUserCommandHandler : IHandleCommand<UpdateUserCommand>
    {
        private readonly UserManager _userManager;
        private readonly ICommandBus _commandBus;
        public UpdateUserCommandHandler(UserManager userManager, ICommandBus commandBus)
        {
            _userManager = userManager;
            _commandBus = commandBus;
        }

        public async Task<CommandHandlerResult> HandleAsync(UpdateUserCommand command)
        {
            var model = command.Model;

            var user = await _userManager.FindByIdAsync(model.UserId.ToString());
            if (user is null)
                return CommandHandlerResult.Error("Unable to find the user");

            user.LockoutEnabled = model.LockoutEnabled;
            user.EmailConfirmed = model.EmailConfirmed;
            user.PhoneNumberConfirmed = model.PhoneNumberConfirmed;
            user.TwoFactorEnabled = model.TwoFactorEnabled;

            var result = await _userManager.UpdateAsync(user);

			if (!result.Succeeded)
			{
				var error = result.Errors.Select(q => q.Description).FirstOrDefault("Error occured while updating this user");
				return CommandHandlerResult.Error(error);
			}

			var addUserRolesCommand = new AddUserRolesCommand(new AddUserRolesModel{
                UserId = user.Id,
                Roles = model.Roles
            });

            var commandResult = await _commandBus.SendAsync(addUserRolesCommand);

            if (!commandResult.IsOk)
                return CommandHandlerResult.Error(commandResult.Message); 
            
            var commandResultValue = commandResult.Value as dynamic;

            return CommandHandlerResult.OkDelayed(this, _ => new
            {
                model.UserId,
				model.LockoutEnabled,
				model.EmailConfirmed,
                model.PhoneNumberConfirmed,
                model.TwoFactorEnabled,
				commandResultValue.Roles
			});
        }
    }
}
