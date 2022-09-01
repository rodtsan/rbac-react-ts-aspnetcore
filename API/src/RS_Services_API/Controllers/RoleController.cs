using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RS_Services_Core.Commands;
using RS_Services_Core.Controllers;
using RS_Services_API.Commands;
using RS_Services_API.Commands.Models;
using RS_Services_API.Queries;
using RS_Services_API.Queries.Models;

namespace RS_Services_API.Controllers
{
	[ApiVersion("1.0")]
	[Route("api/v{version:apiVersion}/Roles/[action]")]
	[ApiController]
	// [Authorize(Roles = "administrator")]
	public class RoleController : BaseController
	{
		private readonly IRoleQueries _roleQueries;
		public RoleController(IRoleQueries roleQueries, ICommandBus commandBus) : base(commandBus)
		{
			_roleQueries = roleQueries;
		}

		[HttpGet]
		public async Task<ActionResult> GetRolesPerPage([FromQuery] PageModel model)
		{
			var roles = await _roleQueries.GetRolesPerPage(model);
			return Ok(roles);
		}

		[HttpGet("{roleId:guid}")]
		public async Task<ActionResult> GetRole(Guid roleId)
		{
			var role = await _roleQueries.GetRole(roleId);
			if (role is null) return NotFound();
			return Ok(role);
		}

		[HttpPost]
		public async Task<ActionResult> CreateRole([FromBody] CreateRoleModel model)
		{
			var command = new CreateRoleCommand(model);
			return await SendAsync(command);
		}

		[HttpPatch("{roleId:guid}")]
		public async Task<ActionResult> UpdateRole([FromBody] UpdateRoleModel model)
		{
			var command = new UpdateRoleCommand(model);
			return await SendAsync(command);
		}

		[HttpDelete("{roleId:guid}")]
		public ActionResult DeleteRole(Guid roleId) => Ok();
		
	}
}
