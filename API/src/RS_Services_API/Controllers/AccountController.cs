using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RS_Services_Core.Commands;
using RS_Services_Core.Controllers;
using RS_Services_Core.Models;
using RS_Services_API.Commands;
using RS_Services_API.Commands.Models;
using RS_Services_API.Services;

namespace RS_Services_API.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]/[action]")]
    [ApiController]
    public class AccountController : BaseController
    {
        private readonly UserManager _userManager;
        private readonly ILogger<AccountController> _logger;
        public AccountController(ICommandBus commandBus, UserManager userManager, SignInManager<User> signInManager, ILogger<AccountController> logger) : base(commandBus)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult> SignUp([FromBody] SignUpModel model)
        {
            var command = new SignUpCommand(model);
            return await SendAsync(command);
        }

        [HttpPost]
        public async Task<ActionResult> SignIn([FromBody] SignInModel model)
        {
            var command = new SignInCommand(model);
            return await SendAsync(command);
        }

        [HttpGet]
        public async Task<ActionResult> ConfirmEmail([FromQuery] ConfirmEmailModel model)
        {
            var command = new ConfirmEmailCommand(model);
            return await SendAsync(command);
        }

        [HttpGet]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordModel model)
        {
            var command = new ForgotPasswordCommand(model);
            return await SendAsync(command);
        }

        [HttpPost]
        public async Task<ActionResult> ResetPassword([FromForm] ResetPasswordModel model)
        {
            var command = new ResetPasswordCommand(model);
            return await SendAsync(command);
        }

        [HttpGet]
        public async Task<ActionResult> GenerateEmailConfirmationToken(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            return Ok(token);
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> Revoke()
        {
            var command = new SignOutCommand(User.Identity?.Name);
            return await SendAsync(command);
        }

        [HttpPost]
        public async Task<IActionResult> Refresh([FromBody] TokenRequestModel model)
        {
            var command = new TokenRequestCommand(model);
            return await ExecuteAsync(command);
        }

        [HttpGet, Authorize]
        public IActionResult KeepAlive() => NoContent();

    }
}
