using Microsoft.AspNetCore.Identity;
using RS_Services_API.Queries;
using RS_Services_API.Services;
using RS_Services_Core.Commands;
using RS_Services_Core.Models;
using RS_Services_Core.Services;
using System.Web;

namespace RS_Services_API.Commands
{
    public class ForgotPasswordCommandHandler : IHandleCommand<ForgotPasswordCommand>
    {
        private const string EMAIL_TEMPLATE_PATH = "EmailTemplates\\reset_password_link.html";
        private const string EMAIL_TEMPLATE_SUBJECT = "Reset Password";
        private readonly UserManager _userManager;
        private readonly IEmailService _emailService;
        public ForgotPasswordCommandHandler(
          UserManager userManager,
          IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }

        public async Task<CommandHandlerResult> HandleAsync(ForgotPasswordCommand command)
        {
            var model = command.Model;
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null)
                return CommandHandlerResult.Error("The user email does not exists");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = HttpUtility.UrlEncode(token);

            var link = $"{model.ForgotPasswordReturnUrl}?userId={user.Id}&token={encodedToken}";

            if (_emailService.IsSendEmailEnabled)
            {
                var firstName = user.Profile?.FirstName ?? user.UserName;
                var message = _emailService.GetHtmlContent(EMAIL_TEMPLATE_PATH)
                    .Replace("{{FirstName}}", firstName)
                    .Replace("{{Link}}", link);
                try
                {
                    await _emailService.SendEmailAsync(model.Email, firstName, EMAIL_TEMPLATE_SUBJECT, message);
                }
                catch (System.Net.Mail.SmtpException stmpEx)
                {
                    return CommandHandlerResult.Error(stmpEx.Message);
                }
                catch (Exception ex)
                {
                    return CommandHandlerResult.Error(ex.Message);
                }
            }
            return CommandHandlerResult.OkDelayed(this, _ => new
            {
                UserId = user.Id,
                Token = encodedToken,
                EmailEnabled = _emailService.IsSendEmailEnabled,
            });
        }
    }
}
