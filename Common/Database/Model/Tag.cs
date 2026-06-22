namespace Common.Database.Model
{
    public class Tag
    {
        public int Id { get; set; }

        public int EpisodeId { get; set; }

        public int PictureId { get; set; }

        public string Title { get; set; }
    }
}
