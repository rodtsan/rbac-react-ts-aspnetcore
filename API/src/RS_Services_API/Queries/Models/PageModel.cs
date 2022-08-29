namespace RS_Services_API.Queries.Models
{
    public class PageModel
    {
        public int Page { get; set; } = 0;
        public int PageSize { get; set; } = 10;
        public string Keywords { get; set; }
        public string OrderBy { get; set; }
        public bool Deleted { get; set; } = false;
    }

    public class PageModel<T> : PageModel where T : class
    {
        public int RecordCount { get; set; }
        public IEnumerable<T> Records { get; set; }
    }
}