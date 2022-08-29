using RS_Services_Core.Commands;
using RS_Services_API.Commands.Models;

namespace RS_Services_API.Commands
{
    public class UpdateProfileCommand : CommandBase
    {
        public UpdateProfileCommand(UpdateProfileModel model)
        {
            Model = model;
        }
        protected override IEnumerable<string> OnValidation()
        {
            if (string.IsNullOrEmpty(Model.FirstName))
                yield return $"{nameof(Model.FirstName)} field is required";
            if (string.IsNullOrEmpty(Model.LastName))
                yield return $"{nameof(Model.LastName)} field is required";

        }

        public UpdateProfileModel Model { get; }
    }
}
