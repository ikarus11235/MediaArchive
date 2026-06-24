namespace Common.Database.Model
{
    public class Tag
    {
        public int Id { get; set; }

        public int EpisodeId { get; set; }

        public int PictureId { get; set; }

        public string Title { get; set; }

        public ICollection<Episode> Episodes { get; set; } = new List<Episode>();
        public ICollection<Picture> Pictures { get; set; } = new List<Picture>();
    }
}
