using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using RS_Services_Core.Configuration;
using RS_Services_Core.Services;

namespace RS_Services_API_Tests
{
    public class EmailTemplates_Tests
    {
        private const string CONFIRM_EMAIL_EMAIL_TEMPLATE = "EmailTemplates\\confirm_email_link.html";
        private const string RESET_PASSWORD_EMAIL_TEMPLATE = "EmailTemplates\\reset_password_link.html";
        private readonly IEmailService _service;

        public EmailTemplates_Tests()
        {
            var logger = Mock.Of<ILogger<EmailService>>();
            var options = Options.Create(new EmailSettingsOptions());
            _service = new Mock<EmailService>(options, logger).Object;
        }

        [Test]
        public void GetHtmlContent_Confirm_Email_Test()
        {
            // Actual
            var actual = _service.GetHtmlContent(CONFIRM_EMAIL_EMAIL_TEMPLATE);

            Assert.That(actual, Is.Not.Empty);
            Assert.That(actual, Is.TypeOf<string>());
        }

        [Test]
        public void GetHtmlContent_Reset_Password_Email_Test()
        {
            // Actual
            var actual = _service.GetHtmlContent(RESET_PASSWORD_EMAIL_TEMPLATE);

            Assert.That(actual, Is.Not.Empty);
            Assert.That(actual, Is.TypeOf<string>());
        }
    }


}
