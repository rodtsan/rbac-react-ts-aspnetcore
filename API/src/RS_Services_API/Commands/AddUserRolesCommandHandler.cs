using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RS_Services_API.Data;
using RS_Services_API.Services;
using RS_Services_Core.Commands;
using RS_Services_Core.Models;

namespace RS_Services_API.Commands
{
    public class AddUserRolesCommandHandler : IHandleCommand<AddUserRolesCommand>
    {
        private readonly UserManager _userManager;
        private readonly IProfileDbContext _dbContext;
        public AddUserRolesCommandHandler(UserManager userManager,
          IProfileDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }

        public async Task<CommandHandlerResult> HandleAsync(AddUserRolesCommand command)
        {
            var model = command.Model;
            
            var user = await _userManager.FindByIdAsync(model.UserId.ToString());

            if (user is null) return CommandHandlerResult.Error("Unable to find the user");

			var userRoles = _dbContext.UserRoles.Where(q => q.UserId == user.Id);

            var rolesFromModel = model.Roles.Select(r => Guid.Parse(r));

            var rolesToBeRemoved = userRoles.Where(q => !rolesFromModel.Any(r => r == q.RoleId));

            var rolesToBeAdded = rolesFromModel.Where(q => !userRoles.Any(r => r.RoleId == q)).Select(q => new UserRole
            {
                UserId = model.UserId,
                RoleId = q
            });

            if (rolesToBeRemoved.Any())
                _dbContext.UserRoles.RemoveRange(rolesToBeRemoved);

            if (rolesToBeAdded.Any())
                _dbContext.UserRoles.AddRange(rolesToBeAdded);

            var roles = userRoles.Join(_dbContext.Roles.AsNoTracking(), x => x.RoleId, y => y.Id, (x, y) => y.Name);

            return CommandHandlerResult.OkDelayed(this, _ => new
            {
                UserId = user.Id,
                Roles = roles,
            });

        }
    }
}