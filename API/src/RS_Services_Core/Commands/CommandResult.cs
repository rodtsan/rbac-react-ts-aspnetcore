using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace RS_Services_Core.Commands
{
	public class CommandResult : ObjectResult
  {

    public static CommandResult Ok = new CommandResult(HttpStatusCode.NoContent, null);

    public bool IsOk { get; }
    public string Message { get; set; }
    public object Content { get; }


    public CommandResult() : this(HttpStatusCode.OK, null, null)
    {

    }

    public CommandResult(HttpStatusCode code, object content) : this(code, content, null)
    {

    }

    public CommandResult(HttpStatusCode code, object content, string message) : base(content)
    {
      IsOk = (int)code < (int)HttpStatusCode.BadRequest;
      StatusCode = (int)code;
      Content = content;
      Message = message;
    }

    public static CommandResult NonExistentCommand(string command)
    {
      var message = $"Invalid command type {command}";

      return new CommandResult(HttpStatusCode.InternalServerError, null, message);
    }

    public static CommandResult FromValidationErrors(IEnumerable<string> errors)
    {
      var content = new
      {
        errors = errors.Select(p => new
        {
          message = p
        })
      };

      string message = errors.ToArray().FirstOrDefault("Invalid");

      return new CommandResult(HttpStatusCode.BadRequest, content, message);
    }
  }
}