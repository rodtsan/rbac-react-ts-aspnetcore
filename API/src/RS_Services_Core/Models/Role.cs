using Microsoft.AspNetCore.Identity;

namespace RS_Services_Core.Models
{
	public class Role : IdentityRole<Guid> {
		public string Description { get; set; }
		public DateTime? LastEditedWhen { get; set; }
		public DateTime CreatedWhen { get; set; } = DateTime.UtcNow;
	}
	
	public class RoleClaim: IdentityRoleClaim<Guid> { }

}
