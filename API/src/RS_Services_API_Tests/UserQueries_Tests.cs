using Autofac.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using RS_Services_API.Controllers;
using RS_Services_API.Data;
using RS_Services_API.Queries;
using RS_Services_API.Queries.Models;
using RS_Services_API.Services;
using RS_Services_Core.Commands;
using RS_Services_Core.Controllers;
using RS_Services_Core.Models;

namespace RS_Server_API_Tests
{
	public class UserQueries_Tests
	{
		private readonly IUserQueries _queries;
		public UserQueries_Tests()
		{
			var builder = new DbContextOptionsBuilder<ProfileDbContext>()
				.UseSqlServer("Data Source=(LocalDb)\\MSSQLLocalDB;Initial Catalog=AspNetIdentity-Localdb;Trusted_Connection=True;MultipleActiveResultSets=true;");
			var context = new ProfileDbContext(builder.Options);

			_queries = new Mock<UserQueries>(context).Object;
		}

		[Test]
		public async Task GetUserInfo_Test()
		{
			
			var actual = await _queries.GetUserInfo(Guid.Parse("4C7E197F-84C5-47AC-CF5B-08DA6DB934BA"));

			Assert.That(actual.LastName, Is.Not.Null);
			Assert.That(actual.LastName, Is.EqualTo("Santos"));
		}

		[Test]
		public async Task GetUserInfo_Null_Test()
		{

			var actual = await _queries.GetUserInfo(Guid.NewGuid());

			Assert.That(actual, Is.Null);
		}

		[Test]
		public async Task GetUsersPerPage_Test()
		{
			var actual = await _queries.GetUsersPerPage(new PageModel
			{
				Page = 1,
				PageSize = 10,
			});

			Assert.That(actual.RecordCount, Is.GreaterThan(10));
		}

		[Test]
		public async Task GetUsersPerPage_Search_Test()
		{
			var actual = await _queries.GetUsersPerPage(new PageModel
			{
				Page = 1,
				PageSize = 10,
				Keywords = "Santos"
			});

			Assert.That(actual.RecordCount, Is.GreaterThan(0));
		}
	}
}