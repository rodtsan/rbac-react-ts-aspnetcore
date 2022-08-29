using RS_Services_Core.Commands;
using RS_Services_API.Commands.Models;
using System.ComponentModel.DataAnnotations;

namespace RS_Services_API.Commands
{
	public class ForgotPasswordCommand : CommandBase
	{
		public ForgotPasswordCommand(ForgotPasswordModel model)
		{
			Model = model;
		}
		protected override IEnumerable<string> OnValidation()
		{
			if (string.IsNullOrEmpty(Model.Email))
				yield return $"{nameof(Model.Email)} field is required";
			if (!new EmailAddressAttribute().IsValid(Model.Email))
				yield return $"{nameof(Model.Email)} is invalid";
		}

		public ForgotPasswordModel Model { get; }
	}
}
