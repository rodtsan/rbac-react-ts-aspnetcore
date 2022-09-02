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
        public async Task<PageModel<UserViewModel>> GetUsersPerPageAsync(PageModel model)
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
                Page = page,
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
        public async Task<ProfileViewModel> GetProfileAsync(Guid profileId)
        {
            return await _dbContext.Users
                .AsNoTracking().Select(q => new ProfileViewModel
                {
                    ProfileId = q.Id,
                    FirstName = q.Profile.FirstName,
                    LastName = q.Profile.LastName,
                    MiddleName = q.Profile.MiddleName,
                    CompanyName = q.Profile.CompanyName,
                    Website = q.Profile.Website,
                    Email = q.Profile.Email,
                    Phone = q.Profile.Phone,
                    PictureUrl = q.Profile.PictureUrl,
                    Address1 = q.Profile.Address1,
                    Address2 = q.Profile.Address2,
                    City = q.Profile.City,
                    StateCode = q.Profile.StateCode,
                    PostalCode = q.Profile.PostalCode,
                    CountryCode = q.Profile.CountryCode,
                    BirthDate = q.Profile.BirthDate,
                    CreatedWhen = q.CreatedWhen,
                    LastEditedWhen = q.LastEditedWhen,
                    Deleted = q.Deleted
                })
                .SingleOrDefaultAsync(q => q.ProfileId == profileId && q.Deleted == false);
        }
        public async Task<UserViewModel> GetUserAsync(Guid userId)
        {
            return (await _dbContext.Users
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
        public async Task<IEnumerable<UserRoleViewModel>> GetUserRolesAsync(Guid userId)
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

    }
}
