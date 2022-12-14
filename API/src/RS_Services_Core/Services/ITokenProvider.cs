using RS_Services_Core.Models;
using System.Security.Claims;

namespace RS_Services_Core.Services
{
	public interface ITokenProvider
	{
		string GenerateJwtToken(IList<Claim> claims);
		string GenerateRefreshToken();
		ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
		string GenerateJwtTokenFromPrincipal(ClaimsPrincipal principal);
	}
}
