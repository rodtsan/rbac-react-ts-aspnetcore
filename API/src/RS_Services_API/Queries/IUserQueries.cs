using RS_Services_Core.Models;
using RS_Services_API.Queries.Models;

namespace RS_Services_API.Queries
{
    public interface IUserQueries
    {
        Task<IEnumerable<UserRoleViewModel>> GetUserRolesAsync(Guid userId);
        Task<UserViewModel> GetUserAsync(Guid userId);
        Task<PageModel<UserViewModel>> GetUsersPerPageAsync(PageModel model);
        Task<ProfileViewModel> GetProfileAsync(Guid profileId);
    }
}