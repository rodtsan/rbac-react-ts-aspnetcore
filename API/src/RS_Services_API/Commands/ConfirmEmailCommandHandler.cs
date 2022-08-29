using Microsoft.AspNetCore.Identity;
using RS_Services_API.Queries;
using RS_Services_API.Services;
using RS_Services_Core.Commands;
using RS_Services_Core.Models;
using RS_Services_Core.Services;
using System.Web;

namespace RS_Services_API.Commands
{
    public class ConfirmEmailCommandHandler : IHandleCommand<ConfirmEmailCommand>
    {
        private readonly UserManager _userManager;
        public ConfirmEmailCommandHandler(
          UserManager userManager)
        {
            _userManager = userManager;
        }

        public async Task<CommandHandlerResult> HandleAsync(ConfirmEmailCommand command)
        {
            var model = command.Model;
            var user = await _userManager.FindByIdAsync(model.UserId.ToString());
            if (user is null)
                return CommandHandlerResult.Error("Unable to find the user");

            var result = await _userManager.ConfirmEmailAsync(user, model.Token);
            if (!result.Succeeded)
            {
                string message = result.Errors.Select(q => q.Description).FirstOrDefault("Error occured while validating email address");
                return CommandHandlerResult.Error(message);

            }
            return CommandHandlerResult.OkDelayed(this, _ => new
            {
                UserId = user.Id,
                user.UserName,
                user.EmailConfirmed,
            });
        }
    }
}
