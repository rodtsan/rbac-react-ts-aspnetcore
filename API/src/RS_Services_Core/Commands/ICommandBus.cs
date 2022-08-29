namespace RS_Services_Core.Commands
{
	public interface ICommandBus
  {
    Task<CommandResult> SendAsync<TCommand>(TCommand command) where TCommand : ICommand;
    Task<CommandResult> ExecuteAsync<TCommand>(TCommand command) where TCommand : ICommand;
    Task<int> ApplyChangesAsync();
    CommandResult GetDelayedCommandResult();
  }
}
