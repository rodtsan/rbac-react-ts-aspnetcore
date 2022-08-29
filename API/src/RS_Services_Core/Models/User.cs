using Microsoft.AspNetCore.Identity;

namespace RS_Services_Core.Models
{
    public class User : IdentityUser<Guid>
    {
        public Profile Profile { get; set; }
        public string RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public DateTime? LastEditedWhen { get; set; }
        public DateTime CreatedWhen { get; set; } = DateTime.UtcNow;
        public bool Deleted { get; set; } = false;
    }

    public class UserClaim : IdentityUserClaim<Guid> { }
    public class UserLogin : IdentityUserLogin<Guid> { }
    public class UserToken : IdentityUserToken<Guid> { }
    public class UserRole : IdentityUserRole<Guid> { }
}
