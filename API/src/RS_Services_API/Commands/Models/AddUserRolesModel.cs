namespace RS_Services_API.Commands.Models
{
    public class AddUserRolesModel
    {
        public Guid UserId { get; set; }
        public string[] Roles { get; set; }
    }
}