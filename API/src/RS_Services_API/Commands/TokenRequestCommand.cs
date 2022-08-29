using RS_Services_Core.Commands;
using RS_Services_API.Commands.Models;

namespace RS_Services_API.Commands
{
    public class TokenRequestCommand : CommandBase
    {
        public TokenRequestCommand(TokenRequestModel model)
        {
            Model = model;
        }

        protected override IEnumerable<string> OnValidation()
        {
            if (string.IsNullOrEmpty(Model.AccessToken))
                yield return $"{nameof(Model.AccessToken)} field is required";
            if (string.IsNullOrEmpty(Model.RefreshToken))
                yield return $"{nameof(Model.RefreshToken)} field is required";

        }

        public TokenRequestModel Model { get; set; }
    }
}
