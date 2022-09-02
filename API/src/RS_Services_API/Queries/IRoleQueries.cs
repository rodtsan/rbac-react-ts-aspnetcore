using RS_Services_Core.Models;
using RS_Services_API.Queries.Models;

namespace RS_Services_API.Queries
{
    public interface IRoleQueries
    {
        Task<RoleViewModel> GetRoleAsync(Guid roleId);
        Task<PageModel<RoleViewModel>> GetRolesPerPageAsync(PageModel model);
    }
}