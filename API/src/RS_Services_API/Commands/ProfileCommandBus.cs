using Autofac;
using RS_Services_Core.Commands;
using RS_Services_API.Data;

namespace RS_Services_API.Commands
{
    public class ProfileCommandBus : CommandBus<ProfileDbContext>
    {
        public ProfileCommandBus(ILifetimeScope scope) : base(scope)
        {
        }
    }
}
