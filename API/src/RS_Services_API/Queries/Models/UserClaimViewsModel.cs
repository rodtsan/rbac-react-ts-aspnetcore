namespace RS_Services_Core.Models
{
    public class UserClaimsViewModel : IUserClaims
    {
        public Guid Id { get; set; } = Guid.Empty;
        public string Name { get; set; }
        public string GivenName { get; set; }
        public string FamilyName { get; set; }
        public string Picture { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
    }
}
