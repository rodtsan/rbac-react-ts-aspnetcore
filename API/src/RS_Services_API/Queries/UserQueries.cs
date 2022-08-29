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
            var result = _dbContext.Roles
                .AsNoTracking()
                .AsEnumerable()
                .GroupJoin(_dbContext.UserRoles
                .AsNoTracking()
                .Where(q => q.UserId == userId)
                .GroupBy(q => new
                {
                    q.RoleId,
                    q.UserId
                })
                .Select(q => new
                {
                    q.Key.RoleId,
                    q.Key.UserId,
                }), x => x.Id, y => y.RoleId, (x, y) => new
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
                    Description = q.Description ?? string.Empty,
                    UserId = q.UserRole.UserId,
                    Selected = q.UserRole.UserId != Guid.Empty
                }).OrderBy(q => q.Name);

            return await Task.FromResult(result);
        }

        public async Task<UserViewModel> GetUserInfo(Guid userId)
        {
            var result = _dbContext.Users
                .Include(q => q.Profile)
                .AsNoTracking()
                .Where(q => q.Id == userId && !q.Deleted)
                .AsEnumerable()
                .GroupJoin(_dbContext.Roles.AsNoTracking().Join(_dbContext.UserRoles.AsNoTracking(), x => x.Id, y => y.RoleId, (x, y) => new
                {
                    RoleId = x.Id,
                    x.Name,
                    y.UserId
                }).GroupBy(q => q.UserId).Select(q => new
                {
                    UserId = q.Key,
                    Roles = q.Select(q1 => q1.Name)
                }), x => x.Id, y => y.UserId, (x, y) =>
                new
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
            return await Task.FromResult(result);
        }

        public async Task<PageModel<UserViewModel>> GetUsersPerPage(PageModel model)
        {
            var query = _dbContext.Users
                .Include(q => q.Profile)
                .AsNoTracking()
                .Where(q => q.Deleted == model.Deleted)
                .AsEnumerable()
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


            int pageSize = model.PageSize;
            int page = Math.Max(1, model.Page);
            var pageModel = new PageModel<UserViewModel>
            {
                Page = model.Page,
                PageSize = pageSize,
                RecordCount = query.Count()
            };

            if (pageSize > 0)
            {
                pageModel.Records = query.Skip((page - 1) * pageSize).Take(pageSize);
            }
            else
            {
                pageModel.Records = query.AsEnumerable();
            }

            return await Task.FromResult(pageModel);
        }

        public async Task<UserClaimsViewModel> GetUserClaims(Guid userId)
        {
            var result = _dbContext.Users
                .Include(q => q.Profile)
                .AsNoTracking()
                .Where(q => q.Id == userId && !q.Deleted)
                .AsEnumerable()
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
                    Roles = Enumerable.Empty<string>()
                }), (x, y) => new UserClaimsViewModel
                {
                    Id = x.UserId,
                    Name = x.Email,
                    GivenName = x.FirstName,
                    FamilyName = x.LastName,
                    Email = x.Email,
                    Picture = x.PictureUrl,
                    Roles = y.Roles
                }).SingleOrDefault() ?? new UserClaimsViewModel { };

            return await Task.FromResult(result);
        }

        public async Task<ProfileViewModel> GetUserProfile(Guid profileId)
        {
            return await _dbContext.Users
                .Include(q => q.Profile)
                .AsNoTracking()
                .Where(q => q.Id == profileId && !q.Deleted)
                .Select(q => new ProfileViewModel
                {
                    UserId = q.Id,
                    ProfileId = q.Id,
                    FirstName = q.Profile.FirstName ?? string.Empty,
                    LastName = q.Profile.LastName ?? string.Empty,
                    MiddleName = q.Profile.MiddleName ?? string.Empty,
                    CompanyName = q.Profile.CompanyName ?? string.Empty,
                    Website = q.Profile.Website ?? string.Empty,
                    Email = q.Email,
                    Phone = q.Profile.Phone ?? string.Empty,
                    PictureUrl = q.Profile.PictureUrl ?? string.Empty,
                    Address1 = q.Profile.Address1 ?? string.Empty,
                    Address2 = q.Profile.Address2 ?? string.Empty,
                    City = q.Profile.City ?? string.Empty,
                    StateCode = q.Profile.StateCode ?? string.Empty,
                    PostalCode = q.Profile.PostalCode ?? string.Empty,
                    CountryCode = q.Profile.CountryCode ?? string.Empty,
                    BirthDate = q.Profile.BirthDate,
                    CreatedWhen = q.CreatedWhen,
                    LastEditedWhen = q.LastEditedWhen,
                }).SingleOrDefaultAsync();
        }

    }
}
