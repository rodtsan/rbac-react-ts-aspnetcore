using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RS_Services_Core.Commands;
using RS_Services_Core.Controllers;
using RS_Services_API.Commands.Models;
using RS_Services_API.Commands;
using RS_Services_API.Queries;
using RS_Services_API.Queries.Models;

namespace RS_Services_API.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/Users/[action]")]
    [ApiController]
    [Authorize(Roles = "administrator")]
    public class UserController : BaseController
    {
        private readonly IUserQueries _userQueries;
        public UserController(IUserQueries userQueries, ICommandBus commandBus) : base(commandBus)
        {
            _userQueries = userQueries;
        }

        [HttpGet]
        public async Task<ActionResult> GetUsersPerPage([FromQuery] PageModel model)
        {
            var pageModel = await _userQueries.GetUsersPerPage(model);
            return Ok(pageModel);
        }

        [HttpGet("{userId:guid}")]
        public async Task<ActionResult> GetUserInfo(Guid userId)
        {
            var user = await _userQueries.GetUserInfo(userId);
            if (user is null) return NotFound();
            return Ok(user);
        }

        [HttpGet("{userId:guid}")]
        public async Task<ActionResult> GetUserRoles(Guid userId)
        {
            var userRoles = await _userQueries.GetUserRoles(userId);
            return Ok(userRoles);
        }

        [HttpPatch("{userId:guid}")]
        public async Task<ActionResult> AddUserRoles([FromBody] AddUserRolesModel model)
        {
            var command = new AddUserRolesCommand(model);
            return await ExecuteAsync(command);
        }

        [HttpPatch("{userId:guid}")]
        public async Task<ActionResult> UpdateUser([FromBody] UpdateUserModel model)
        {
            var command = new UpdateUserCommand(model);
            return await ExecuteAsync(command);
        }

        [HttpDelete("{userId:guid}")]
        public async Task<ActionResult> DeleteUser(Guid userId)
        {
            var command = new DeleteUserCommand(userId);
            return await ExecuteAsync(command);
        }

    }
}
