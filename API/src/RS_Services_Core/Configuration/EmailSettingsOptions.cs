namespace RS_Services_Core.Configuration
{
	public class EmailSettingsOptions
	{
		public static string EmailSettingsSection = "EmailSettings";
		public bool SendEmailEnabled { get; set; }
		public string SmtpDomain { get; set; } = string.Empty;
		public int SmtpPort { get; set; }
		public string SmtpUserName { get; set; } = string.Empty;
		public string SmtpEmail { get; set; } = string.Empty;
		public string SmtpPassword { get; set; } = string.Empty;
		public string CCEmails { get; set; } = string.Empty;
	}
}
