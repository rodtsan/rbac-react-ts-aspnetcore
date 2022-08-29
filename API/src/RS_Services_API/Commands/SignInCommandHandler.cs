using Microsoft.AspNetCore.Identity;
using RS_Services_API.Queries;
using RS_Services_API.Services;
using RS_Services_Core.Commands;
using RS_Services_Core.Models;
using RS_Services_Core.Services;

namespace RS_Services_API.Commands
{
    public class SignInCommandHandler : IHandleCommand<SignInCommand>
    {
        private readonly UserManager _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenProvider _tokenProvider;
        private readonly IUserQueries _queries;
        public SignInCommandHandler(
          UserManager userManager,
          SignInManager<User> signInManager,
          ITokenProvider tokenProvider,
          IUserQueries queries)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenProvider = tokenProvider;
            _queries = queries;
        }

        public async Task<CommandHandlerResult> HandleAsync(SignInCommand command)
        {

            var model = command.Model;
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null)
                return CommandHandlerResult.Error("The user email does not exists");

            if (user.Deleted)
                return CommandHandlerResult.Error("This user has been deleted");

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, true);

            if (result.Succeeded)
            {
                var userClaim = await _queries.GetUserClaims(user.Id);

                string token = _tokenProvider.GenerateJwtToken(userClaim);
                string refreshToken = _tokenProvider.GenerateRefreshToken();

                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

                var updateResult = await _userManager.UpdateAsync(user);

                if (updateResult.Succeeded)
                {
                    return CommandHandlerResult.OkDelayed(this, _ => new
                    {
                        AccessToken = token,
                        RefreshToken = refreshToken,
                        UserId = user.Id
                    });
                }
                return CommandHandlerResult.Error("Error occured while updating refresh token");
            }


            if (result.IsLockedOut)
                return CommandHandlerResult.Error("This user account is locked");

			/* Check whether email is confirmed */
            if (result.IsNotAllowed) 
                return CommandHandlerResult.Error("This user account is not allowed");


            return CommandHandlerResult.Error("Invalid username or password");
        }
    }
}
