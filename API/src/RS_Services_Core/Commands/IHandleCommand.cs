namespace RS_Services_Core.Commands
{
	public interface IHandleCommand { }

  public interface IHandleCommand<in TCommand> : IHandleCommand
      where TCommand : ICommand
  {
    Task<CommandHandlerResult> HandleAsync(TCommand command);
  }
}
