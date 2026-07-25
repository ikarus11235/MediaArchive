namespace MediaController.DTOs
{
    public class EpisodeDto
    {
        public int Id { get; set; }
        public int EpisodeId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string VideoPath { get; set; }
        public string Description { get; set; }
        public int SeasonId { get; set; }
        public string EpisodeSign { get; set; }
    }
}
