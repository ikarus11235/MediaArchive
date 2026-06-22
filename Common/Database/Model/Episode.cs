namespace Common.Database.Model
{
    public class Episode
    {
        public int Id { get; set; }

        public int SeasonId { get; set; }

        public Season Season { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string VideoPath { get; set; }

        public string EpisodeSign { get; set; }

        public ICollection<Picture> Pictures { get; } = new List<Picture>();
    }
}
