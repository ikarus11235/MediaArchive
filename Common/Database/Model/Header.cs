namespace Common.Database.Model
{
    public class Header
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string? ThumbNailPath { get; set; }

        public byte[]? Logo { get; set; }

        public ICollection<Season>? Seasons { get; set; }
    }
}
