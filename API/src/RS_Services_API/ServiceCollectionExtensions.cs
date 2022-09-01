using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RS_Services_Core.Configuration;
using RS_Services_Core.Models;
using RS_Services_API.Data;
using System.Security.Claims;
using System.Text;
using RS_Services_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using Autofac.Extensions.DependencyInjection;
using Autofac;
using RS_Services_API.Modules;
using RS_Services_API.Queries;
using RS_Services_Core.Services;
using System.Text.Json.Serialization;

namespace RS_Services_API
{
    public static class ServiceCollectionExtensions
    {
        public static void AddDependencyServices(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtOptions = configuration.GetSection(JwtOptions.ConfigSection);
            services.Configure<JwtOptions>(jwtOptions);
            var esOptions = configuration.GetSection(EmailSettingsOptions.ConfigSection);
            services.Configure<EmailSettingsOptions>(esOptions);
            services.AddDbContextDependencyGroup(configuration);
            services.AddIdentityDependencyGroup();
            services.AddAuthenticationDependencyGroup(jwtOptions.Get<JwtOptions>());
            // Transient, Scope, and SingleTon
            services.AddOtherDependencyGroup();
            services.AddApiVersioningDependencyGroup();
            services.AddSwaggerGenDependencyGroup();
            services.AddCorsDependencyGroup();
        }

		#region "Dependencies"

		private static IServiceCollection AddOtherDependencyGroup(this IServiceCollection services)
        {
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<ITokenProvider, TokenProvider>();
            services.AddTransient<IUserQueries, UserQueries>();
            services.AddTransient<IRoleQueries, RoleQueries>();
            services.AddHttpContextAccessor();
            return services;
        }
        private static IServiceCollection AddDbContextDependencyGroup(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<IProfileDbContext, ProfileDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });
            return services;
        }

        private static IServiceCollection AddIdentityDependencyGroup(this IServiceCollection services)
        {
            services.AddIdentity<User, Role>(options =>
            {
                options.User.RequireUniqueEmail = true;
                options.SignIn.RequireConfirmedEmail = true;
                options.Lockout.AllowedForNewUsers = true;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(2);
                options.Lockout.MaxFailedAccessAttempts = 3;
            }).AddEntityFrameworkStores<ProfileDbContext>()
            .AddDefaultTokenProviders()
            .AddUserManager<UserManager>();

            services.Configure<DataProtectionTokenProviderOptions>(options =>
                options.TokenLifespan = TimeSpan.FromHours(12));

            return services;
        }

        private static IServiceCollection AddAuthenticationDependencyGroup(this IServiceCollection services, JwtOptions jwtOptions)
        {
            var signingKey = Encoding.UTF8.GetBytes(jwtOptions.SigningKey);
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters =
                new TokenValidationParameters
                {
                    ValidateActor = true,
                    ValidateAudience = true,
                    ValidateIssuer = true,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidIssuer = jwtOptions.Issuer,
                    ValidAudience = jwtOptions.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(signingKey),
                    ClockSkew = TimeSpan.Zero
                };
                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            context.Response.Headers.Add("Token-Expired", "true");
                        }
                        return Task.CompletedTask;
                    }
                };
            });


            services.AddAuthorization(options =>
            {
                options.AddPolicy(JwtBearerDefaults.AuthenticationScheme, policy =>
                {
                    policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
                    policy.RequireClaim(ClaimTypes.NameIdentifier);
                    policy.RequireClaim(ClaimTypes.Role);
                });
            });

            return services;
        }

        private static IServiceCollection AddApiVersioningDependencyGroup(this IServiceCollection services)
        {
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
            return services;
        }

        private static IServiceCollection AddCorsDependencyGroup(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.SetIsOriginAllowed(host => true)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .WithHeaders();
                });
            });
            return services;
        }

        private static IServiceCollection AddSwaggerGenDependencyGroup(this IServiceCollection services)
        {
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
            return services;
        }

		#endregion
	}
}
