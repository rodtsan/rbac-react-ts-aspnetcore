using Microsoft.AspNetCore.Mvc;
using RS_Services_Core.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RS_Services_Core.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        private readonly ICommandBus _commandBus;
        public BaseController(ICommandBus commandBus)
        {
            _commandBus = commandBus;
        }

        protected async Task<ActionResult> SendAsync<T>(T command) where T : ICommand
        {
            var result = await _commandBus.SendAsync(command);
            if (result.IsOk) return Ok(result.Value);
            return BadRequest(result.Value);
        }

        protected async Task<ActionResult> ExecuteAsync<T>(T command) where T : ICommand
        {
            var result = await _commandBus.ExecuteAsync(command);
            if (result.IsOk) return Ok(result.Value);
            return BadRequest(result.Value);
        }
    }
}
