namespace RS_Services_API.Queries.Models
{
	public class UserRoleViewModel
	{
		public Guid RoleId { get; set; } = Guid.Empty;
		public string Name { get; set; }
		public string Description { get; set; }
		public Guid UserId { get; set; } = Guid.Empty;
		public bool Selected { get; set; }
	}
}
