namespace RS_Services_API.Queries.Models
{
	public class RoleViewModel
	{
		public Guid RoleId { get; set; } = Guid.Empty;
		public string Name { get; set; }
		public string Description { get; set; }
		public DateTime CreatedWhen { get; set; }
		public int UsersCount { get; set; }
	}
}
