using RS_Services_Core.Commands;
using RS_Services_API.Commands.Models;

namespace RS_Services_API.Commands
{
    public class UpdateUserCommand : CommandBase
    {
        public UpdateUserCommand(UpdateUserModel model)
        {
            Model = model;
        }

        protected override IEnumerable<string> OnValidation()
        {
            if (Model.UserId == Guid.Empty)
                yield return $"{nameof(Model.UserId)} field is required.";
        }

        public UpdateUserModel Model { get; }
    }
}
