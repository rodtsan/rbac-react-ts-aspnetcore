using Autofac;
using RS_Services_Core.Commands;
using RS_Services_API.Commands;

namespace RS_Services_API.Modules
{
	public class AutofacBusinessModule : Module
	{
		protected override void Load(ContainerBuilder builder)
		{
			// Register CommandBus
			builder.RegisterType<ProfileCommandBus>().As<ICommandBus>();
			// Register CommandHandlers
			builder.RegisterAssemblyTypes(typeof(Program).Assembly)
			  .AsClosedTypesOf(typeof(IHandleCommand<>))
			  .AsImplementedInterfaces()
			  .InstancePerLifetimeScope();
		}
	}
}
