using RS_Services_Core.Commands;
using RS_Services_API.Commands.Models;
using System.ComponentModel.DataAnnotations;

namespace RS_Services_API.Commands
{
    public class ConfirmEmailCommand : CommandBase
    {
        public ConfirmEmailCommand(ConfirmEmailModel model)
        {
            Model = model;
        }
        protected override IEnumerable<string> OnValidation()
        {
            if (Model.UserId == Guid.Empty)
                yield return $"{nameof(Model.UserId)} field is required";
            if (string.IsNullOrEmpty(Model.Token))
                yield return $"{nameof(Model.Token)} field is required";
        }

        public ConfirmEmailModel Model { get; }
    }
}
