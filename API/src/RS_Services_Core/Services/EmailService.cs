using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RS_Services_Core.Configuration;
using System.Net;
using System.Net.Mail;
using System.Reflection;

namespace RS_Services_Core.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettingsOptions _options;
        private readonly ILogger<EmailService> _logger;
        public EmailService(IOptions<EmailSettingsOptions> options, ILogger<EmailService> logger)
        {
			_options = options.Value;
            _logger = logger;
        }

        public bool IsSendEmailEnabled => _options.SendEmailEnabled;

		public async Task SendEmailAsync(string email, string subject, string message)
        {
            await SendEmailAsync(email, null, subject, message);
        }

        public async Task SendEmailAsync(string email, string displayName, string subject, string message)
        {
            var mail = new MailMessage
            {
                From = new MailAddress(_options.SmtpEmail, _options.SmtpUserName)
            };
            mail.To.Add(new MailAddress(email, displayName));
            if (!string.IsNullOrEmpty(_options.CCEmails))
            {
                var ccEmails = _options.CCEmails.Split(',');
                foreach (var ccEmail in ccEmails)
                    mail.CC.Add(new MailAddress(ccEmail));
            }
            mail.Subject = subject;
            mail.Body = message;
            mail.IsBodyHtml = true;
            mail.Priority = MailPriority.High;

            using SmtpClient smtp = new(_options.SmtpDomain, _options.SmtpPort);
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(_options.SmtpEmail, _options.SmtpPassword);
            smtp.EnableSsl = true;
            try
            {
                // if (sendCompletedEventHandler != null)
                //     smtp.SendCompleted += sendCompletedEventHandler;
                await smtp.SendMailAsync(mail);
				_logger.LogInformation($"Message has been successfully send to {email}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occured while sending a message");
                throw;
            }

        }

		public string GetHtmlContent(string emailTemplatePath)
		{
			string executableLocation = Path.GetDirectoryName(
	        Assembly.GetExecutingAssembly().Location);
			string filePath = Path.Combine(executableLocation, emailTemplatePath);
			using StreamReader SourceReader = File.OpenText(filePath);
            return SourceReader.ReadToEnd();
        }

		private void Smtp_SendCompleted(object sender, System.ComponentModel.AsyncCompletedEventArgs e)
        {
            var mail = e.UserState as MailMessage;
            if (e.Cancelled)
            {
                //var smtp = SmtpClientInstance();
                //smtp.Send(mail);
            }
            if (e.Error != null)
            {
                _logger.LogError(e.Error, "Send email error");
            }
        }
    }
}
