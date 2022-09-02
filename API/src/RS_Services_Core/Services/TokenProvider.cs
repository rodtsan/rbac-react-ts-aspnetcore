using IdentityModel;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RS_Services_Core.Configuration;
using RS_Services_Core.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace RS_Services_Core.Services
{

	public class TokenProvider : ITokenProvider
	{
		private readonly JwtOptions _jwtOptions;
		private const int EXPIRES_IN_MINUTES = 60;
		public TokenProvider(IOptions<JwtOptions> options)
		{
			_jwtOptions = options.Value;
		}

		public string GenerateJwtToken(IList<Claim> claims)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.UTF8.GetBytes(_jwtOptions.SigningKey);
			var securityKey = new SymmetricSecurityKey(key);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Issuer = _jwtOptions.Issuer,
				Audience = _jwtOptions.Audience,
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.UtcNow.AddMinutes(EXPIRES_IN_MINUTES),
				SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);

			return tokenHandler.WriteToken(token);
		}

		public string GenerateJwtTokenFromPrincipal(ClaimsPrincipal principal)
		{
			if (principal is null)
				throw new SecurityTokenException("Invalid claims principal");

			var key = Encoding.UTF8.GetBytes(_jwtOptions.SigningKey);
			var securityKey = new SymmetricSecurityKey(key);
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
			var tokenHandler = new JwtSecurityTokenHandler();

			var token = new JwtSecurityToken(_jwtOptions.Issuer,
			 _jwtOptions.Audience,
			 claims: principal.Claims,
			 notBefore: DateTime.UtcNow,
			 expires: DateTime.UtcNow.AddMinutes(EXPIRES_IN_MINUTES),
			 signingCredentials: credentials);

			return tokenHandler.WriteToken(token);
		}

		public string GenerateRefreshToken()
		{
			var randomNumber = new byte[32];
			using (var rng = RandomNumberGenerator.Create())
			{
				rng.GetBytes(randomNumber);
				return Convert.ToBase64String(randomNumber);
			}
		}

		public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
		{
			var tokenValidationParameters = new TokenValidationParameters
			{
				ValidateActor = true,
				ValidateAudience = true,
				ValidateIssuer = true,
				ValidateIssuerSigningKey = true,
				ValidIssuer = _jwtOptions.Issuer,
				ValidAudience = _jwtOptions.Audience,
				IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SigningKey)),
				ValidateLifetime = false,
				ClockSkew = TimeSpan.Zero
			};
			var tokenHandler = new JwtSecurityTokenHandler();
			var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
			var jwtSecurityToken = securityToken as JwtSecurityToken;
			if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
				throw new SecurityTokenException("Invalid token");
			return principal;
		}
	}
}
