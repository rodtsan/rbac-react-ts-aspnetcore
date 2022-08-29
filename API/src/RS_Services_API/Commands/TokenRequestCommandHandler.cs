using Microsoft.AspNetCore.Identity;
using RS_Services_API.Queries;
using RS_Services_API.Services;
using RS_Services_Core.Commands;
using RS_Services_Core.Models;
using RS_Services_Core.Services;

namespace RS_Services_API.Commands
{
	public class TokenRequestCommandHandler : IHandleCommand<TokenRequestCommand>
	{
		private readonly ITokenProvider _tokenProvider;
		private readonly UserManager _userManager;
		public TokenRequestCommandHandler(ITokenProvider tokenProvider, UserManager userManager)
		{
			_tokenProvider = tokenProvider;
			_userManager = userManager;
		}

		public async Task<CommandHandlerResult> HandleAsync(TokenRequestCommand command)
		{
			var model = command.Model;

			var principal = _tokenProvider.GetPrincipalFromExpiredToken(model.AccessToken!);

			if (principal is null)
				return CommandHandlerResult.Error("Invalid principal");

			var user = await _userManager.FindByNameAsync(principal.Identity?.Name);

			if (user is null || user.RefreshToken != model.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
				return CommandHandlerResult.Error("Invalid token");

			var newAccessToken = _tokenProvider.GenerateJwtTokenFromPrincipal(principal);
			
			user.RefreshToken = _tokenProvider.GenerateRefreshToken();

			await _userManager.UpdateAsync(user);

			return CommandHandlerResult.OkDelayed(this, _ => new
			{
				AccessToken = newAccessToken,
				user.RefreshToken,
			});
		}

	}
}
