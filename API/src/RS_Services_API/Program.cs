using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using RS_Services_Core.Configuration;
using RS_Services_Core.Services;
using RS_Services_API.Modules;
using RS_Services_API.Queries;
using System.Text.Json.Serialization;

namespace RS_Services_API
{
	public static class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			builder.Host.AppConfiguration();

			var services = builder.Services;
			var configuration = builder.Configuration;

			services.SetDbContext(configuration);
			services.SetAuthentication(configuration);

			services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.JwtSection));
			services.Configure<EmailSettingsOptions>(configuration.GetSection(EmailSettingsOptions.EmailSettingsSection));

			services.AddTransient<IUserQueries, UserQueries>();
			services.AddTransient<IRoleQueries, RoleQueries>();
			services.AddScoped<IEmailService, EmailService>();
			services.AddScoped<ITokenProvider, TokenProvider>();

			services.AddControllers().AddJsonOptions(options =>
				options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
			services.AddVersionedApiExplorer(options =>
			{
				options.GroupNameFormat = "'v'VVV";
				options.SubstituteApiVersionInUrl = true;
			});
			services.AddApiVersioning(setup =>
			{
				setup.DefaultApiVersion = new ApiVersion(1, 0);
				setup.AssumeDefaultVersionWhenUnspecified = true;
				setup.ReportApiVersions = true;
			});

			services.AddSwaggerGen(options =>
			{
				options.SwaggerDoc("v1", new OpenApiInfo { Title = "Authorization", Version = "v1" });
				options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
				{
					In = ParameterLocation.Header,
					Description = "JWT Token Authentication",
					Name = "Authorization",
					Type = SecuritySchemeType.Http,
					BearerFormat = "JWT",
					Scheme = "Bearer"
				});
				options.AddSecurityRequirement(new OpenApiSecurityRequirement
				{
					{
						new OpenApiSecurityScheme
						{
							Reference=new OpenApiReference
							{
								Type= ReferenceType.SecurityScheme,
								Id="Bearer"
							}
						},
						Array.Empty<string>()
					}
				});
			});

			services.AddCors(options =>
			{
				options.AddDefaultPolicy(policy =>
				{
					policy.SetIsOriginAllowed(host => true)
					.AllowAnyHeader()
					.AllowAnyMethod()
					.AllowCredentials();
				});
			});

			var app = builder.Build();
			app.UseCors();

			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI(options =>
				{
					options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
				});
			}
			app.UseStaticFiles();
			app.UseApiVersioning();
			app.UseAuthentication();
			app.UseAuthorization();
			app.MapControllers();
			app.Run();
		}

		public static void AppConfiguration(this ConfigureHostBuilder host)
		{
			host.ConfigureAppConfiguration((hostingContext, config) =>
			{
				config.SetBasePath(hostingContext.HostingEnvironment.ContentRootPath);
				config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
				config.AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", optional: true);
			}).ConfigureLogging((hostingContext, logging) =>
			{
				logging.AddConsole();
				logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
			})
			.UseServiceProviderFactory(new AutofacServiceProviderFactory())
				.ConfigureContainer<ContainerBuilder>(container =>
				{
					container.RegisterModule(new AutofacBusinessModule());
				}).UseConsoleLifetime();
		}

	}
}