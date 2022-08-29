using Microsoft.AspNetCore.Identity;
using RS_Services_Core.Commands;
using RS_Services_Core.Models;

namespace RS_Services_API.Commands
{
    public class CreateRoleCommandHandler : IHandleCommand<CreateRoleCommand>
    {
        private readonly RoleManager<Role> _roleManager;
        public CreateRoleCommandHandler(RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
        }
        public async Task<CommandHandlerResult> HandleAsync(CreateRoleCommand command)
        {
            var model = command.Model;
            
            var role = new Role
            {
                Name = model.Name,
                Description = model.Description,
            };

            var result = await _roleManager.CreateAsync(role);

            if (!result.Succeeded)
            {
                var error = result.Errors.Select(q => q.Description).FirstOrDefault("Error occured while creating a new role");
                return CommandHandlerResult.Error(error);
            }

            return CommandHandlerResult.OkDelayed(this, _ => new
            {
                RoleId = role.Id,
                role.Name,
                role.Description,
            });
        }
    }
}
