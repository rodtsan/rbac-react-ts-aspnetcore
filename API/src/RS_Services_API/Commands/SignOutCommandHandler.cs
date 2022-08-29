using Microsoft.AspNetCore.Identity;
using RS_Services_API.Services;
using RS_Services_Core.Commands;
using RS_Services_Core.Models;

namespace RS_Services_API.Commands
{
	public class SignOutCommandHandler : IHandleCommand<SignOutCommand>
	{
		private readonly UserManager _userManager;
		public SignOutCommandHandler(UserManager userManager)
		{
			_userManager = userManager;
		}

		public async Task<CommandHandlerResult> HandleAsync(SignOutCommand command)
		{
			var user = await _userManager.FindByNameAsync(command.UserName);
			
			if (user is not null) {
				user.RefreshToken = null;
				await _userManager.UpdateAsync(user);
			}
				
			return CommandHandlerResult.OkDelayed(this, _ => new {
				SignOut = true
			});
		}
	}
}
