using RS_Services_Core.Commands;
using RS_Services_API.Commands.Models;
using System.ComponentModel.DataAnnotations;

namespace RS_Services_API.Commands
{
    public class SignUpCommand : CommandBase
    {
        public SignUpCommand(SignUpModel model)
        {
            Model = model;
        }
        protected override IEnumerable<string> OnValidation()
        {
            if (string.IsNullOrEmpty(Model.FirstName))
                yield return $"{nameof(Model.FirstName)} field is required";
            if (string.IsNullOrEmpty(Model.LastName))
                yield return $"{nameof(Model.LastName)} field is required";
            if (string.IsNullOrEmpty(Model.Email))
                yield return $"{nameof(Model.Email)} field is required";
            if (!new EmailAddressAttribute().IsValid(Model.Email))
                yield return $"{nameof(Model.Email)} is invalid";
            if (string.IsNullOrEmpty(Model.Password))
                yield return $"{nameof(Model.Password)} field is required";
        }

        public SignUpModel Model { get; }
    }
}