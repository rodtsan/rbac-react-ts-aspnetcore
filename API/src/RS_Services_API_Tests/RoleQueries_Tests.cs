using Microsoft.EntityFrameworkCore;
using Moq;
using RS_Services_API.Data;
using RS_Services_API.Queries;
using RS_Services_API.Queries.Models;

namespace RS_Services_API_Tests
{
	public class RoleQueries_Tests
	{
		private readonly IRoleQueries _queries;
		public RoleQueries_Tests()
		{
			var builder = new DbContextOptionsBuilder<ProfileDbContext>()
				.UseSqlServer("Data Source=(LocalDb)\\MSSQLLocalDB;Initial Catalog=AspNetIdentity-Localdb;Trusted_Connection=True;MultipleActiveResultSets=true;");
			var context = new ProfileDbContext(builder.Options);

			_queries = new Mock<RoleQueries>(context).Object;
		}

		[Test]
		public async Task GetRole_Test()
		{

			var actual = await _queries.GetRole(Guid.Parse("70D29C7A-EBDA-4E54-9701-E591256652CF"));

			Assert.That(actual.Name, Is.Not.Null);
			Assert.That(actual.Name, Is.EqualTo("editor"));
		}

		[Test]
		public async Task GetRole_Null_Test()
		{

			var actual = await _queries.GetRole(Guid.NewGuid());

			Assert.That(actual, Is.Null);
		}

		[Test]
		public async Task GetRolesPerPage_Test()
		{
			var actual = await _queries.GetRolesPerPage(new PageModel
			{
				Page = 1,
				PageSize = 10,
			});

			Assert.That(actual.RecordCount, Is.GreaterThan(2));
		}

		[Test]
		public async Task GetUsersPerPage_Search_Test()
		{
			var actual = await _queries.GetRolesPerPage(new PageModel
			{
				Page = 1,
				PageSize = 10,
				Keywords = "Managers"
			});

			Assert.That(actual.RecordCount, Is.GreaterThan(0));
		}
	}
}
