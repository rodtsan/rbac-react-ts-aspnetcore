using RS_Services_Core.Commands;
using RS_Services_API.Commands.Models;

namespace RS_Services_API.Commands
{
    public class CreateRoleCommand : CommandBase
    {
        public CreateRoleCommand(CreateRoleModel model)
        {
            Model = model;
        }

        protected override IEnumerable<string> OnValidation()
        {
            if (string.IsNullOrEmpty(Model.Name))
                yield return "Name field is required";
            if (string.IsNullOrEmpty(Model.Description))
                Model.Description = Model.Name;

        }

        public CreateRoleModel Model { get; }
    }
}
