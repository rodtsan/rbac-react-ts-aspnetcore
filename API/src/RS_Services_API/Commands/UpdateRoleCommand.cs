using RS_Services_Core.Commands;
using RS_Services_API.Commands.Models;

namespace RS_Services_API.Commands
{
    public class UpdateRoleCommand : CommandBase
    {
        public UpdateRoleCommand(UpdateRoleModel model)
        {
            Model = model;
        }

        protected override IEnumerable<string> OnValidation()
        {
            if (string.IsNullOrEmpty(Model.Name))
                yield return $"{nameof(Model.Name)} field is required.";
            if (string.IsNullOrEmpty(Model.Description))
                Model.Description = Model.Name;
        }

        public UpdateRoleModel Model { get; }
    }
}
