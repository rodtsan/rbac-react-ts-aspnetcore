using System.Net.Mail;

namespace RS_Services_Core.Services
{
    public interface IEmailService
    {
		bool IsSendEmailEnabled { get; }
		Task SendEmailAsync(string email, string subject, string message);
        Task SendEmailAsync(string email, string displayName, string subject, string message);
        string GetHtmlContent(string filePath);

	}
}