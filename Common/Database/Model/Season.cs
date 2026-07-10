namespace Common.Database.Model
{
    public class Season
    {
        public int Id { get; set; }

        public int HeaderId { get; set; }

        public Header Header { get; set; }

        public string Title { get; set; }

        public ICollection<Episode> Episodes { get; set; }
    }
}
