using RS_Services_Core.Commands;
using RS_Services_API.Commands.Models;

namespace RS_Services_API.Commands
{
    public class SignOutCommand : CommandBase
    {
        public SignOutCommand(string userName)
        {
            UserName = userName;
        }

        protected override IEnumerable<string> OnValidation()
        {
            if (string.IsNullOrEmpty(UserName))
                yield return $"{nameof(UserName)} field is required.";
        }

        public string UserName { get; }
    }
}
