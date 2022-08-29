using RS_Services_Core.Models;
using System.Security.Claims;

namespace RS_Services_Core.Services
{
	public interface ITokenProvider
	{
		string GenerateJwtToken(IUserClaims userClaims);
		string GenerateRefreshToken();
		ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
		string GenerateJwtTokenFromPrincipal(ClaimsPrincipal principal);
	}
}
