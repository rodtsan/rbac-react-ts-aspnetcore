using RS_Services_Core.Commands;
using RS_Services_API.Commands.Models;

namespace RS_Services_API.Commands
{
	public class SignInCommand : CommandBase
  {
    public SignInCommand(SignInModel model)
    {
      Model = model;
    }
    protected override IEnumerable<string> OnValidation()
    {
      if (string.IsNullOrEmpty(Model.Email))
        yield return $"{nameof(Model.Email)} field is required";
      if (string.IsNullOrEmpty(Model.Password))
        yield return $"{nameof(Model.Password)} field is required";
    }

    public SignInModel Model { get; }
  }
}
