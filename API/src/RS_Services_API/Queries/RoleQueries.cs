using Microsoft.EntityFrameworkCore;
using RS_Services_API.Data;
using RS_Services_API.Queries.Models;

namespace RS_Services_API.Queries
{
    public class RoleQueries : IRoleQueries
    {
        private readonly IProfileDbContext _dbContext;
        public RoleQueries(IProfileDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<PageModel<RoleViewModel>> GetRolesPerPageAsync(PageModel model)
        {
            var query = _dbContext.Roles.AsNoTracking();

            if (!string.IsNullOrEmpty(model.Keywords))
            {
                string keywords = model.Keywords.Trim().ToLower();

                query = query.Where(q =>
                    q.Name.ToLower().Contains(keywords) ||
                    q.Description.ToLower().Contains(keywords));
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
                case "name_asc":
                    {
                        query = query.OrderBy(q => q.Name);
                        break;
                    }
                case "name_desc":
                    {
                        query = query.OrderByDescending(q => q.Name);
                        break;
                    }
                case "description_asc":
                    {
                        query = query.OrderBy(q => q.Description);
                        break;
                    }
                case "description_desc":
                    {
                        query = query.OrderByDescending(q => q.Description);
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

            var userRoles = _dbContext.UserRoles
                .AsNoTracking()
                .GroupBy(q => q.RoleId).Select(q => new
                {
                    RoleId = q.Key,
                    Count = q.Count(),
                });


            var pageModel = new PageModel<RoleViewModel>
            {
                Page = page,
                PageSize = pageSize,
                RecordCount = query.Count(),
                Records = (await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync())
                .GroupJoin(userRoles, x => x.Id, y => y.RoleId, (x, y) => new
                {
                    RoleId = x.Id,
                    x.Name,
                    x.Description,
                    x.CreatedWhen,
                    UserRoles = y,
                }).SelectMany(q => q.UserRoles.DefaultIfEmpty(new
                {
                    q.RoleId,
                    Count = 0
                }), (x, y) => new RoleViewModel
                {
                    RoleId = x.RoleId,
                    Name = x.Name,
                    Description = x.Description,
                    CreatedWhen = x.CreatedWhen,
                    UsersCount = y.Count
                }).ToList()
            };

            return pageModel;
        }

        public async Task<RoleViewModel> GetRoleAsync(Guid roleId)
        {
            return await _dbContext.Roles.AsNoTracking().Join(_dbContext.UserRoles
                .AsNoTracking()
                .GroupBy(q => q.RoleId)
                .Select(q => new
                {
                    RoleId = q.Key,
                    Count = q.Count()
                }), x => x.Id, y => y.RoleId, (x, y) => new RoleViewModel
                {
                    RoleId = x.Id,
                    Name = x.Name,
                    Description = x.Description ?? string.Empty,
                    CreatedWhen = x.CreatedWhen,
                    UsersCount = y.Count
                }).SingleOrDefaultAsync(q => q.RoleId == roleId);

        }
    }
}