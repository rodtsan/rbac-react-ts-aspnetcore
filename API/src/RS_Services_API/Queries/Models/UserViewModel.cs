
namespace RS_Services_API.Queries.Models
{
	public class UserViewModel 
	{
		public Guid UserId { get; set; }
		public string FirstName { get; set; } = string.Empty;
		public string LastName { get; set; } = string.Empty;
		public string PictureUrl { get; set; } = string.Empty;
		public string Email { get; set; } = string.Empty;
		public bool EmailConfirmed { get; set; }
		public bool PhoneNumberConfirmed { get; set; }
		public bool LockoutEnabled { get; set; }
		public DateTimeOffset? LockoutEnd { get; set; }
		public bool TwoFactorEnabled { get; set; }
		public int AccessFailedCount { get; set; }
		public DateTime CreatedWhen { get; set; }
		public DateTime? LastEditedWhen { get; set; }
		public bool Deleted { get; set; }
		public IEnumerable<string> Roles { get; set; } = Enumerable.Empty<string>();
	}

	public class UserNameViewModel
	{
		public Guid UserId { get; set; }
		public string FirstName { get; set; } = string.Empty;
		public string LastName { get; set; } = string.Empty;
	}
}
