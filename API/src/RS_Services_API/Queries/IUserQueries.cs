using RS_Services_Core.Models;
using RS_Services_API.Queries.Models;

namespace RS_Services_API.Queries
{
	public interface IUserQueries
	{
		Task<IEnumerable<UserRoleViewModel>> GetUserRoles(Guid userId);
		Task<UserViewModel> GetUserInfo(Guid userId);
		Task<PageModel<UserViewModel>> GetUsersPerPage(PageModel model);
		Task<UserClaimsViewModel> GetUserClaims(Guid userId);
		Task<ProfileViewModel> GetUserProfile(Guid profileId);
	}
}