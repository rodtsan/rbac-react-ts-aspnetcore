using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RS_Services_API.Data;
using System.Security.Claims;

namespace RS_Services_API.Services

{
	public class AdministratorRequirement : IAuthorizationRequirement { }
	public class DocumentAuthorizationHandler : AuthorizationHandler<AdministratorRequirement>
	{
		private readonly IProfileDbContext _dbContext;
		public DocumentAuthorizationHandler(IProfileDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, AdministratorRequirement requirement)
		{
			var claims = context.User.Claims.Where(q => q.Type == ClaimTypes.Role).Select(q => q.Value);

			var admin = await _dbContext.Roles
				.AsNoTracking()
				.Select(q => q.Name)
				.FirstOrDefaultAsync();

			if (claims.Any(q => q == admin))
			{
				context.Succeed(requirement);
			}
			
		}
	}
}
