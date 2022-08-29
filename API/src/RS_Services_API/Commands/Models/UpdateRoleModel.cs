namespace RS_Services_API.Commands.Models
{
	public class UpdateRoleModel
	{
		public Guid RoleId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
	}
}
