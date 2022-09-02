using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RS_Services_Core.Models;

namespace RS_Services_API.Data
{
    public class ProfileDbContext : IdentityDbContext<User, Role, Guid, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>, IProfileDbContext
    {
        public ProfileDbContext(DbContextOptions<ProfileDbContext> options) : base(options) {

         }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.SetStringMaxLengthConvention(256);

            builder.Entity<User>(entity =>
            {
                entity.HasOne(q => q.Profile)
                        .WithOne(q => q.User)
                        .HasForeignKey<Profile>(q => q.ProfileId)
                        .OnDelete(DeleteBehavior.Cascade);

                entity.Property(q => q.CreatedWhen)
                .HasDefaultValue(DateTime.UtcNow)
                .ValueGeneratedOnAdd();

				entity.Property(q => q.Deleted)
			   .HasDefaultValue(false)
			   .ValueGeneratedOnAdd();

                entity.Navigation(n => n.Profile).AutoInclude(true);
			});

            builder.Entity<Role>(entity =>
            {
                entity.Property(q => q.CreatedWhen)
                .HasDefaultValue(DateTime.UtcNow)
				.ValueGeneratedOnAdd();

				entity.HasData(
                     new Role
                     {
                         Id = Guid.NewGuid(),
                         Name = "administrator",
                         Description = "Administrators",
                         NormalizedName = "ADMINISTRATOR",
                         ConcurrencyStamp = Guid.NewGuid().ToString(),
                         CreatedWhen = DateTime.UtcNow
                     },
                     new Role
                     {
                         Id = Guid.NewGuid(),
                         Name = "manager",
                         Description = "Project Managers",
                         NormalizedName = "MANAGER",
                         ConcurrencyStamp = Guid.NewGuid().ToString(),
                         CreatedWhen = DateTime.UtcNow
                     },
                     new Role
                     {
                         Id = Guid.NewGuid(),
                         Name = "editor",
                         Description = "Editors",
                         NormalizedName = "EDITOR",
                         ConcurrencyStamp = Guid.NewGuid().ToString(),
                         CreatedWhen = DateTime.UtcNow
                     },
                     new Role
                     {
                         Id = Guid.NewGuid(),
                         Name = "user",
                         Description = "Standard users",
                         NormalizedName = "USER",
                         ConcurrencyStamp = Guid.NewGuid().ToString(),
                         CreatedWhen = DateTime.UtcNow
                     }
                    );
            });

            builder.Entity<UserRole>(entity =>
            {
                entity.HasKey(q => new { q.UserId, q.RoleId });

                entity.HasIndex(q => new { q.UserId, q.RoleId });

            });

            builder.Entity<Profile>(entity =>
            {
                entity.HasKey(q => q.ProfileId);

                entity.Property(q => q.FirstName)
                  .HasMaxLength(48);

                entity.Property(q => q.LastName)
                  .HasMaxLength(48);

                entity.Property(q => q.MiddleName)
                  .HasMaxLength(48);

                entity.Property(q => q.Email)
                  .HasMaxLength(60);

                entity.Property(q => q.CompanyName)
                                  .HasMaxLength(100);

                entity.Property(q => q.PictureUrl)
                  .HasMaxLength(280);

                entity.Property(q => q.Phone)
                  .HasMaxLength(18);

                entity.Property(q => q.Address1)
                  .HasMaxLength(60);

                entity.Property(q => q.Address2)
                  .HasMaxLength(60);

                entity.Property(q => q.City)
                  .HasMaxLength(32);

                entity.Property(q => q.PostalCode)
                  .HasMaxLength(12);

                entity.HasOne(q => q.User)
                .WithOne(q => q.Profile);

                entity.HasBaseModel();

                entity.Ignore(q => q.FullName);

            });

            builder.SetTableName("");

            base.OnModelCreating(builder);
        }

        public override int SaveChanges()
        {
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await base.SaveChangesAsync(cancellationToken);
        }

        public override EntityEntry Update(object entity)
        {
            return base.Update(entity);
        }

        public override EntityEntry Remove(object entity)
        {
            return base.Remove(entity);
        }

		public bool HasUnsavedChanges()
		{
			return ChangeTracker.Entries().Any(e => e.State == EntityState.Added
													  || e.State == EntityState.Modified
													  || e.State == EntityState.Deleted);
		}

		public DbSet<Profile> Profiles { get; set; }
        public override DbSet<User> Users { get => base.Users; set => base.Users = value; }
        public override DbSet<UserClaim> UserClaims { get => base.UserClaims; set => base.UserClaims = value; }
        public override DbSet<UserLogin> UserLogins { get => base.UserLogins; set => base.UserLogins = value; }
        public override DbSet<UserToken> UserTokens { get => base.UserTokens; set => base.UserTokens = value; }
        public override DbSet<UserRole> UserRoles { get => base.UserRoles; set => base.UserRoles = value; }
        public override DbSet<Role> Roles { get => base.Roles; set => base.Roles = value; }
        public override DbSet<RoleClaim> RoleClaims { get => base.RoleClaims; set => base.RoleClaims = value; }
    }


    static class ModelBuilderExtensions
    {
        public static void HasBaseModel<T>(this EntityTypeBuilder<T> entity) where T : BaseModel
        {
            entity.HasOne(q => q.CreatedBy)
                .WithMany()
                .HasForeignKey(q => q.CreatedById);

            entity.HasOne(q => q.LastEditedBy)
                .WithMany()
                .HasForeignKey(q => q.LastEditedById);

            entity.Property(q => q.LastEditedWhen)
                .HasDefaultValue(DateTime.UtcNow)
                .ValueGeneratedOnUpdate();

            entity.Property(q => q.CreatedWhen)
                .HasDefaultValue(DateTime.UtcNow)
                .ValueGeneratedOnAdd();
        }
        public static void SetStringMaxLengthConvention(this ModelBuilder builder, int length)
        {
            foreach (var entity in builder.Model.GetEntityTypes())
            {
                foreach (var property in entity.GetProperties())
                {
                    if (property.ClrType == typeof(string))
                    {
                        property.SetMaxLength(length);
                    }
                }
            }
        }

        public static void SetTableName(this ModelBuilder builder, string prefix)
        {
            foreach (var entity in builder.Model.GetEntityTypes())
            {
				entity.SetTableName(entity.GetTableName().Replace("AspNet", prefix));
            }
        }
    }
}