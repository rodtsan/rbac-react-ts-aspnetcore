using Microsoft.AspNetCore.Identity;
using RS_Services_Core.Commands;
using RS_Services_Core.Models;

namespace RS_Services_API.Commands
{
	public class UpdateRoleCommandHandler : IHandleCommand<UpdateRoleCommand>
	{
		private readonly RoleManager<Role> _roleManager;
		public UpdateRoleCommandHandler(RoleManager<Role> roleManager)
		{
			_roleManager = roleManager;
		}

		public async Task<CommandHandlerResult> HandleAsync(UpdateRoleCommand command)
		{
			var model = command.Model;

			var role = await _roleManager.FindByIdAsync(model.RoleId.ToString());
			if (role is null)
				return CommandHandlerResult.Error("Unable to find the role");
			
			role.Name = model.Name;
			role.Description = model.Description;

			var result = await _roleManager.UpdateAsync(role);

			if (!result.Succeeded)
			{
				var error = result.Errors.Select(q => q.Description).FirstOrDefault("Error occured while updating this role");
				return CommandHandlerResult.Error(error);
			}

			return CommandHandlerResult.OkDelayed(this, _ => model);
		}
	}
}
