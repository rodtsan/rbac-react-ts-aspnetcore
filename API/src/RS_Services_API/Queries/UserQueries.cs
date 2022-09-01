using Microsoft.EntityFrameworkCore;
using RS_Services_API.Data;
using RS_Services_API.Queries.Models;
using RS_Services_Core.Models;

namespace RS_Services_API.Queries
{
    public class UserQueries : IUserQueries
    {
        private readonly IProfileDbContext _dbContext;
        public UserQueries(IProfileDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<IEnumerable<UserRoleViewModel>> GetUserRoles(Guid userId)
        {
            var userRoles = await _dbContext.UserRoles
                .AsNoTracking()
                .Where(q => q.UserId == userId)
                .GroupBy(q => new
                {
                    q.UserId,
                    q.RoleId
                }).Select(q => new
                {
                    q.Key.RoleId,
                    q.Key.UserId
                })
                .ToListAsync();

            return _dbContext.Roles
                .AsNoTracking()
                .ToList()
                .GroupJoin(userRoles, x => x.Id, y => y.RoleId, (x, y) => new
                {
                    RoleId = x.Id,
                    x.Name,
                    x.Description,
                    UserRoles = y
                }).SelectMany(q => q.UserRoles.DefaultIfEmpty(new
                {
                    q.RoleId,
                    UserId = Guid.Empty
                }), (x, y) => new
                {
                    x.RoleId,
                    x.Name,
                    x.Description,
                    UserRole = y
                }).Select(q => new UserRoleViewModel
                {
                    RoleId = q.RoleId,
                    Name = q.Name,
                    Description = q.Description,
                    UserId = q.UserRole.UserId,
                    Selected = q.UserRole.UserId != Guid.Empty
                }).ToList();
				

        }

        public async Task<UserViewModel> GetUserInfo(Guid userId)
        {
            return (await _dbContext.Users
                .Include(q => q.Profile)
                .AsNoTracking()
                .Where(q => q.Id == userId && !q.Deleted)
                .ToListAsync())
                .GroupJoin(_dbContext.Roles.AsNoTracking().Join(_dbContext.UserRoles.AsNoTracking(), x => x.Id, y => y.RoleId, (x, y) => new
                {
                    RoleId = x.Id,
                    x.Name,
                    y.UserId
                }).GroupBy(q => q.UserId).Select(q => new
                {
                    UserId = q.Key,
                    Roles = q.Select(r => r.Name)
                }), x => x.Id, y => y.UserId, (x, y) => new
                {
                    UserId = x.Id,
                    x.Profile.FirstName,
                    x.Profile.LastName,
                    x.Profile.PictureUrl,
                    x.Email,
                    x.EmailConfirmed,
                    x.LockoutEnabled,
                    x.PhoneNumberConfirmed,
                    x.TwoFactorEnabled,
                    x.AccessFailedCount,
                    x.CreatedWhen,
                    x.LastEditedWhen,
                    x.Deleted,
                    Roles = y
                }).SelectMany(q => q.Roles.DefaultIfEmpty(new
                {
                    q.UserId,
                    Roles = Enumerable.Empty<string>()
                }), (x, y) => new UserViewModel
                {
                    UserId = x.UserId,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Email = x.Email,
                    PictureUrl = x.PictureUrl,
                    EmailConfirmed = x.EmailConfirmed,
                    LockoutEnabled = x.LockoutEnabled,
                    PhoneNumberConfirmed = x.PhoneNumberConfirmed,
                    TwoFactorEnabled = x.TwoFactorEnabled,
                    AccessFailedCount = x.AccessFailedCount,
                    CreatedWhen = x.CreatedWhen,
                    LastEditedWhen = x.LastEditedWhen,
                    Deleted = x.Deleted,
                    Roles = y.Roles
                }).SingleOrDefault();
        }

        public async Task<PageModel<UserViewModel>> GetUsersPerPage(PageModel model)
        {
            var query = _dbContext.Users
                .Include(q => q.Profile)
                .AsNoTracking()
                .Where(q => q.Deleted == model.Deleted)
                .Select(q => new
                {
                    UserId = q.Id,
                    q.Profile.FirstName,
                    q.Profile.LastName,
                    q.Profile.PictureUrl,
                    q.Email,
                    q.EmailConfirmed,
                    q.LockoutEnabled,
                    q.PhoneNumberConfirmed,
                    q.TwoFactorEnabled,
                    q.AccessFailedCount,
                    q.CreatedWhen,
                    q.LastEditedWhen,
                    q.Deleted,
                });


            if (!string.IsNullOrEmpty(model.Keywords))
            {
                string keywords = model.Keywords.Trim().ToLower();
                query = query.Where(q => q.Email.ToLower().Contains(keywords) ||
                    q.FirstName.ToLower().Contains(keywords) ||
                    q.LastName.ToLower().Contains(keywords));
            }

            string orderBy = model.OrderBy ?? "createdwhen_desc";

            switch (orderBy.ToLower())
            {
                case "createdwhen_asc":
                    {
                        query = query.OrderBy(q => q.CreatedWhen);
                        break;
                    }
                case "createdwhen_desc":
                    {
                        query = query.OrderByDescending(q => q.CreatedWhen);
                        break;
                    }
                case "email_asc":
                    {
                        query = query.OrderBy(q => q.Email);
                        break;
                    }
                case "email_desc":
                    {
                        query = query.OrderByDescending(q => q.Email);
                        break;
                    }
                case "firstname_asc":
                    {
                        query = query.OrderBy(q => q.FirstName);
                        break;
                    }
                case "firstname_desc":
                    {
                        query = query.OrderByDescending(q => q.FirstName);
                        break;
                    }
                case "lastname_asc":
                    {
                        query = query.OrderBy(q => q.LastName);
                        break;
                    }
                case "lastname_desc":
                    {
                        query = query.OrderByDescending(q => q.LastName);
                        break;
                    }
                default:
                    {
                        query = query.OrderByDescending(q => q.CreatedWhen);
                        break;
                    }
            }


            int pageSize = Math.Max(10, model.PageSize);
            int page = Math.Max(1, model.Page);
            var pageModel = new PageModel<UserViewModel>
            {
                Page = model.Page,
                PageSize = pageSize,
                RecordCount = query.Count(),
                Records = (await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync()).GroupJoin(_dbContext.Roles.AsNoTracking().Join(_dbContext.UserRoles.AsNoTracking(), x => x.Id, y => y.RoleId, (x, y) => new
                {
                    RoleId = x.Id,
                    x.Name,
                    y.UserId
                }).GroupBy(q => q.UserId).Select(q => new
                {
                    UserId = q.Key,
                    Roles = q.Select(r => r.Name)
                }), x => x.UserId, y => y.UserId, (x, y) => new
                {
                    x.UserId,
                    x.FirstName,
                    x.LastName,
                    x.PictureUrl,
                    x.Email,
                    x.EmailConfirmed,
                    x.LockoutEnabled,
                    x.PhoneNumberConfirmed,
                    x.TwoFactorEnabled,
                    x.AccessFailedCount,
                    x.CreatedWhen,
                    x.LastEditedWhen,
                    x.Deleted,
                    Roles = y
                }).SelectMany(q => q.Roles.DefaultIfEmpty(new
                {
                    q.UserId,
                    Roles = Enumerable.Empty<string>()
                }), (x, y) => new UserViewModel
                {
                    UserId = x.UserId,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Email = x.Email,
                    PictureUrl = x.PictureUrl,
                    EmailConfirmed = x.EmailConfirmed,
                    LockoutEnabled = x.LockoutEnabled,
                    PhoneNumberConfirmed = x.PhoneNumberConfirmed,
                    TwoFactorEnabled = x.TwoFactorEnabled,
                    AccessFailedCount = x.AccessFailedCount,
                    CreatedWhen = x.CreatedWhen,
                    LastEditedWhen = x.LastEditedWhen,
                    Deleted = x.Deleted,
                    Roles = y.Roles
                })
            };

            return pageModel;
        }

        public async Task<UserClaimsViewModel> GetUserClaims(Guid userId)
        {
            return (await _dbContext.Users
                         .Include(q => q.Profile)
                         .AsNoTracking()
                         .Where(q => q.Id == userId && q.Deleted == false)
                         .ToListAsync())
                         .GroupJoin(_dbContext.Roles.AsNoTracking().Join(_dbContext.UserRoles.AsNoTracking(), x => x.Id, y => y.RoleId, (x, y) => new
                         {
                             RoleId = x.Id,
                             x.Name,
                             y.UserId
                         }).GroupBy(q => q.UserId).Select(q => new
                         {
                             UserId = q.Key,
                             Roles = q.Select(r => r.Name)
                         }), x => x.Id, y => y.UserId, (x, y) =>
                         new
                         {
                             UserId = x.Id,
                             x.Profile.FirstName,
                             x.Profile.LastName,
                             x.Profile.PictureUrl,
                             x.Email,
                             Roles = y
                         }).SelectMany(q => q.Roles.DefaultIfEmpty(new
                         {
                             q.UserId,
                             Roles = Enumerable.Empty<string>(),
                         }), (x, y) => new UserClaimsViewModel
                         {
                             Id = x.UserId,
                             Name = x.Email,
                             GivenName = x.FirstName,
                             FamilyName = x.LastName,
                             Email = x.Email,
                             Picture = x.PictureUrl,
                             Roles = y.Roles.ToList()
                         }).SingleOrDefault();
        }

        public async Task<ProfileViewModel> GetUserProfile(Guid profileId)
        {
            return await _dbContext.Users
                .AsNoTracking().Join(_dbContext.Profiles.AsNoTracking(), x => x.Id, y => y.ProfileId, (x, y) => new ProfileViewModel
                {
                    ProfileId = x.Id,
                    FirstName = y.FirstName,
                    LastName = y.LastName,
                    MiddleName = y.MiddleName,
                    CompanyName = y.CompanyName,
                    Website = y.Website,
                    Email = x.Email,
                    Phone = y.Phone,
                    PictureUrl = y.PictureUrl,
                    Address1 = y.Address1,
                    Address2 = y.Address2,
                    City = y.City,
                    StateCode = y.StateCode,
                    PostalCode = y.PostalCode,
                    CountryCode = y.CountryCode,
                    BirthDate = y.BirthDate,
                    CreatedWhen = x.CreatedWhen,
                    LastEditedWhen = x.LastEditedWhen,
                    Deleted = x.Deleted
                })
                .SingleOrDefaultAsync(q => q.ProfileId == profileId && q.Deleted == false);
        }

    }
}
