using RS_Services_Core.Commands;
using RS_Services_API.Commands.Models;

namespace RS_Services_API.Commands
{
    public class DeleteUserCommand : CommandBase
    {
        public DeleteUserCommand(Guid model)
        {
            UserId = model;
        }

        protected override IEnumerable<string> OnValidation()
        {
            if (UserId == Guid.Empty)
                yield return $"{nameof(UserId)} field is required.";
        }

        public Guid UserId { get; }
    }
}
