namespace Common.Database.Model
{
    public class Picture
    {
        public int Id { get; set; }

        public int EpisodeId { get; set; }

        public Episode Episode { get; set; }

        public string ImagePath { get; set; }

        public ICollection<Tag> Tags { get; set; } = new List<Tag>();
    }
}
