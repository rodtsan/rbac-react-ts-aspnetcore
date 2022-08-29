using Microsoft.AspNetCore.Identity;
using RS_Services_API.Services;
using RS_Services_Core.Commands;
using RS_Services_Core.Models;
using RS_Services_Core.Services;
using System.Web;

namespace RS_Services_API.Commands
{
    public class SignUpCommandHandler : IHandleCommand<SignUpCommand>
    {
        private const string EMAIL_TEMPLATE_PATH = "EmailTemplates\\confirm_email_link.html";
        private const string EMAIL_TEMPLATE_SUBJECT = "Confirmation Email";
        private readonly UserManager _userManager;
        private readonly IEmailService _emailService;
        public SignUpCommandHandler(UserManager userManager,
          IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }

        public async Task<CommandHandlerResult> HandleAsync(SignUpCommand command)
        {
            var model = command.Model;

            string userName = model.Email!.Trim().ToLower();

            var user = new User
            {
                UserName = model.Email,
                Email = userName,
                Profile = new Profile
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = userName,
                }
            };

            if (!string.IsNullOrEmpty(model.MiddleName)) user.Profile.MiddleName = model.MiddleName;
            if (!string.IsNullOrEmpty(model.CompanyName)) user.Profile.CompanyName = model.CompanyName;
            if (!string.IsNullOrEmpty(model.Website)) user.Profile.Website = model.Website;
            if (!string.IsNullOrEmpty(model.Address1)) user.Profile.Address1 = model.Address1;
            if (!string.IsNullOrEmpty(model.Address2)) user.Profile.Address2 = model.Address2;
            if (!string.IsNullOrEmpty(model.City)) user.Profile.City = model.City;
            if (!string.IsNullOrEmpty(model.StateCode)) user.Profile.StateCode = model.StateCode;
            if (!string.IsNullOrEmpty(model.CountryCode)) user.Profile.CountryCode = model.CountryCode;
            if (!string.IsNullOrEmpty(model.Phone)) user.Profile.Phone = model.Phone;
            if (!string.IsNullOrEmpty(model.PictureUrl)) user.Profile.PictureUrl = model.PictureUrl;
            if (!string.IsNullOrEmpty(model.PostalCode)) user.Profile.PostalCode = model.PostalCode;

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return CommandHandlerResult.Error(result.Errors.Select(q => q.Description).FirstOrDefault("Error occured while creating user account"));

            if (model.Roles.Any())
                await _userManager.AddToRolesAsync(user, model.Roles);

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var encodedToken = HttpUtility.UrlEncode(token);

            if (_emailService.IsSendEmailEnabled)
            {
                var link = $"{model.ConfirmEmailUrl}?userId={user.Id}&token={encodedToken}";
                var message = _emailService.GetHtmlContent(EMAIL_TEMPLATE_PATH)
                    .Replace("{{FirstName}}", model.FirstName)
                    .Replace("{{Link}}", link);

                try
                {
                    await _emailService.SendEmailAsync(model.Email, model.FirstName, EMAIL_TEMPLATE_SUBJECT, message);
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
                Token = token,
            });
        }
    }
}