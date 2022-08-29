namespace RS_Services_API.Commands.Models
{
	public class ConfirmEmailModel
	{
		public Guid UserId { get; set; }
		public string Token { get; set; }
	}
}
