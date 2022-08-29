

using RS_Services_Core.Commands;
using RS_Services_API.Commands.Models;

namespace RS_Services_API.Commands
{
    public class AddUserRolesCommand : CommandBase
    {
        public AddUserRolesCommand(AddUserRolesModel model)
        {
            Model = model;
        }

        protected override IEnumerable<string> OnValidation()
        {
            if (Model.UserId == Guid.Empty)
                yield return "UserId field is required";

        }

        public AddUserRolesModel Model { get; set; }
    }
}