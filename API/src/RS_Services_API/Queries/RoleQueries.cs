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

        public async Task<PageModel<RoleViewModel>> GetRolesPerPage(PageModel model)
        {
            var users = _dbContext.UserRoles.AsNoTracking()
                .Join(_dbContext.Users.AsNoTracking().Where(q => !q.Deleted), x => x.UserId, y => y.Id, (x, y) => new
                {
                    UserId = y.Id,
                    x.RoleId,
                })
                .GroupBy(q => q.RoleId)
                .Select(q => new
                {
                    RoleId = q.Key,
                    Count = q.Count(),
                }).AsEnumerable();

            var query = _dbContext.Roles.AsNoTracking()
                .AsEnumerable()
                .GroupJoin(users, x => x.Id, y => y.RoleId, (x, y) => new
                {
                    RoleId = x.Id,
                    x.Name,
                    x.Description,
                    x.CreatedWhen,
                    Users = y
                }).SelectMany(q => q.Users.DefaultIfEmpty(new
                {
                    q.RoleId,
                    Count = 0
                }), (x, y) => new RoleViewModel
                {
                    RoleId = x.RoleId,
                    Name = x.Name,
                    Description = x.Description ?? string.Empty,
                    CreatedWhen = x.CreatedWhen,
                    UsersCount = y.Count
                });

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
            int pageSize = model.PageSize;
            int page = Math.Max(1, model.Page);
            var pageModel = new PageModel<RoleViewModel>
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

        public async Task<RoleViewModel> GetRole(Guid roleId)
        {
            var users = _dbContext.UserRoles.AsNoTracking()
                    .Join(_dbContext.Users.AsNoTracking().Where(q => !q.Deleted), x => x.UserId, y => y.Id, (x, y) => new
                    {
                        UserId = y.Id,
                        x.RoleId,
                    })
                    .GroupBy(q => q.RoleId)
                    .Select(q => new
                    {
                        RoleId = q.Key,
                        Count = q.Count(),
                    }).AsEnumerable();


            var result = _dbContext.Roles
                .AsNoTracking()
                .Where(q => q.Id == roleId)
                .AsEnumerable()
                .GroupJoin(users, x => x.Id, y => y.RoleId, (x, y) => new
                {
                    RoleId = x.Id,
                    x.Name,
                    x.Description,
                    x.CreatedWhen,
                    Users = y
                }).SelectMany(q => q.Users.DefaultIfEmpty(new
                {
                    q.RoleId,
                    Count = 0
                }), (x, y) => new RoleViewModel
                {
                    RoleId = x.RoleId,
                    Name = x.Name,
                    Description = x.Description ?? string.Empty,
                    CreatedWhen = x.CreatedWhen,
                    UsersCount = y.Count
                }).SingleOrDefault();

            return await Task.FromResult(result);
        }
    }
}