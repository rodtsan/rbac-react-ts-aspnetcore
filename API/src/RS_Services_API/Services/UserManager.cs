using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RS_Services_API.Data;
using RS_Services_Core.Models;
using System.Security.Claims;

namespace RS_Services_API.Services
{
    public class UserManager : UserManager<User>
    {
        private readonly IProfileDbContext _dbContext;
        public UserManager(IProfileDbContext dbContext, IUserStore<User> store, IOptions<IdentityOptions> optionsAccessor, IPasswordHasher<User> passwordHasher, IEnumerable<IUserValidator<User>> userValidators, IEnumerable<IPasswordValidator<User>> passwordValidators, ILookupNormalizer keyNormalizer, IdentityErrorDescriber errors, IServiceProvider services, ILogger<UserManager<User>> logger) : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
        {
            _dbContext = dbContext;
        }

        public override async Task<User> FindByEmailAsync(string email)
        {
            string normalizeEmail = email.Trim().ToLower();
            return await _dbContext.Users.Include(q => q.Profile).SingleOrDefaultAsync(q => q.Email.ToLower() == normalizeEmail);
        }

        public override async Task<IList<Claim>> GetClaimsAsync(User user)
        {
            var roles = await GetRolesAsync(user);
            return new Claim[] {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.Profile.FirstName),
                new Claim(ClaimTypes.Surname, user.Profile.LastName),
              }.Union(roles.Select(r => new Claim(ClaimTypes.Role, r))).ToList();
        }
    }
}
