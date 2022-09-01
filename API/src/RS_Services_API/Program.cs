using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using RS_Services_Core.Configuration;
using RS_Services_Core.Services;
using RS_Services_API.Modules;
using RS_Services_API.Queries;
using System.Text.Json.Serialization;
using System.Security.Authentication;
using Microsoft.AspNetCore.Server.Kestrel.Core;

namespace RS_Services_API
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Host.AppConfiguration();
            builder.WebHost.UseKestrel(options =>
            {
                options.ConfigureHttpsDefaults(config =>
                {
                    config.SslProtocols = SslProtocols.Tls12;
                });
            });


            builder.Services.AddDependencyServices(builder.Configuration);

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

        public static IHostBuilder AppConfiguration(this IHostBuilder host) =>
           host.ConfigureAppConfiguration((hostBuilder, config) =>
           {
               config.SetBasePath(hostBuilder.HostingEnvironment.ContentRootPath);
               config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
               config.AddJsonFile($"appsettings.{hostBuilder.HostingEnvironment.EnvironmentName}.json", optional: true);
           }).ConfigureLogging((hostBuilder, logging) =>
            {
                logging.AddConsole();
                logging.AddConfiguration(hostBuilder.Configuration.GetSection("Logging"));
            })
           .UseServiceProviderFactory(new AutofacServiceProviderFactory())
                .ConfigureContainer<ContainerBuilder>(container =>
                {
                    container.RegisterModule(new AutofacBusinessModule());
                }).UseConsoleLifetime();
    }
}