using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using RS_Services_Core.Models;

namespace RS_Services_API.Data
{
	public interface IProfileDbContext
	{
		DbSet<Profile> Profiles { get; set; }
		DbSet<RoleClaim> RoleClaims { get; set; }
		DbSet<Role> Roles { get; set; }
		DbSet<UserClaim> UserClaims { get; set; }
		DbSet<UserLogin> UserLogins { get; set; }
		DbSet<UserRole> UserRoles { get; set; }
		DbSet<User> Users { get; set; }
		DbSet<UserToken> UserTokens { get; set; }
		EntityEntry Update(object entity);
		EntityEntry Remove(object entity);
		int SaveChanges();
		Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

		bool HasUnsavedChanges();
	}
}