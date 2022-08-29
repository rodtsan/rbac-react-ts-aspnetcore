using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RS_Services_Core.Commands;
using RS_Services_Core.Models;
using RS_Services_Core.Services;
using RS_Services_API.Data;
using RS_Services_API.Queries;

namespace RS_Services_API.Commands
{
	public class UpdateProfileCommandHandler : IHandleCommand<UpdateProfileCommand>
	{
		private readonly IProfileDbContext _dbContext;
		public UpdateProfileCommandHandler(IProfileDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<CommandHandlerResult> HandleAsync(UpdateProfileCommand command)
		{
			var model = command.Model;
			
			var profile = await _dbContext.Profiles.FindAsync(model.ProfileId);

			if (profile is null) return CommandHandlerResult.Error("Unable to find the user's profile");

			profile.FirstName = model.FirstName;
			profile.LastName = model.LastName;

			if (!string.IsNullOrEmpty(model.MiddleName)) profile.MiddleName = model.MiddleName;
			if (!string.IsNullOrEmpty(model.CompanyName)) profile.CompanyName = model.CompanyName;
			if (!string.IsNullOrEmpty(model.Website)) profile.Website = model.Website;
			if (!string.IsNullOrEmpty(model.Address1)) profile.Address1 = model.Address1;
			if (!string.IsNullOrEmpty(model.Address2)) profile.Address2 = model.Address2;
			if (!string.IsNullOrEmpty(model.City)) profile.City = model.City;
			if (!string.IsNullOrEmpty(model.StateCode)) profile.StateCode = model.StateCode;
			if (!string.IsNullOrEmpty(model.CountryCode)) profile.CountryCode = model.CountryCode;
			if (!string.IsNullOrEmpty(model.Phone)) profile.Phone = model.Phone;
			if (!string.IsNullOrEmpty(model.PictureUrl)) profile.PictureUrl = model.PictureUrl;
			if (!string.IsNullOrEmpty(model.PostalCode)) profile.PostalCode = model.PostalCode;

			_dbContext.Update(profile);

			return CommandHandlerResult.OkDelayed(this, _ => profile);
		}
	}
}
