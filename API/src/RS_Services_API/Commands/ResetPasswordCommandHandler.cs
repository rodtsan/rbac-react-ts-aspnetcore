using Microsoft.AspNetCore.Identity;
using RS_Services_API.Queries;
using RS_Services_API.Services;
using RS_Services_Core.Commands;
using RS_Services_Core.Models;
using RS_Services_Core.Services;
using System.Web;

namespace RS_Services_API.Commands
{
    public class ResetPasswordCommandHandler : IHandleCommand<ResetPasswordCommand>
    {
        private const string EMAIL_TEMPLATE_PATH = "EmailTemplates\\reset_password_link.html";
        private readonly UserManager _userManager;
        private readonly IEmailService _emailService;
        public ResetPasswordCommandHandler(
          UserManager userManager,
          IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }

        public async Task<CommandHandlerResult> HandleAsync(ResetPasswordCommand command)
        {
            var model = command.Model;
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null)
                return CommandHandlerResult.Error("The user email address does not exists");

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);

            if (!result.Succeeded)
            {
                var error = result.Errors.Select(q => q.Description).FirstOrDefault("Error occured while resetting password");
                return CommandHandlerResult.Error(error);
            }

            return CommandHandlerResult.OkDelayed(this, _ => new
            {
                UserId = user.Id,
                Token = model.Token,
            });
        }
    }
}
