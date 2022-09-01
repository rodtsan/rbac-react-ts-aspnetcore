namespace RS_Services_Core.Models
{
	public interface IUserClaims
	{
		string Email { get; set; }
		string FamilyName { get; set; }
		string GivenName { get; set; }
		Guid Id { get; set; }
		string Name { get; set; }
		string Picture { get; set; }
		List<string> Roles { get; set; }
	}
}