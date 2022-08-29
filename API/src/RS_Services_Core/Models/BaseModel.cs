namespace RS_Services_Core.Models
{
	public class BaseModel
	{
        public DateTime CreatedWhen { get; set; }
        public Guid? CreatedById { get; set; }
        public User CreatedBy { get; set; }
        public DateTime? LastEditedWhen { get; set; } = DateTime.UtcNow;
        public Guid? LastEditedById { get; set; }
        public User LastEditedBy { get; set; }
        public bool Deleted { get; set; }
    }
}
