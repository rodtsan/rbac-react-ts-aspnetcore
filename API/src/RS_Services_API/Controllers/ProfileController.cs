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
    [Route("api/v{version:apiVersion}/Profiles/[action]")]
    [ApiController]
    [Authorize]
    public class ProfileController : BaseController
    {
        private readonly IUserQueries _userQueries;
        public ProfileController(IUserQueries userQueries, ICommandBus commandBus) : base(commandBus)
        {
            _userQueries = userQueries;
        }

        [HttpGet("{profileId:guid}")]
        public async Task<ActionResult> GetProfile(Guid profileId)
        {
            var profile = await _userQueries.GetUserProfile(profileId);
            if (profile is null)
                return NotFound();
            return Ok(profile);
        }

        [HttpPatch("{profileId:guid}")]
        public async Task<ActionResult> UpdateProfile([FromBody] UpdateProfileModel model)
        {
            var command = new UpdateProfileCommand(model);
            return await ExecuteAsync(command);
        }
    }
}
