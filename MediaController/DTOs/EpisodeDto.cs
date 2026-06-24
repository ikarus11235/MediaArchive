namespace MediaController.DTOs
{
    public class EpisodeDto
    {
        public int Id { get; set; }
        public int SeasonId { get; set; }
        public string Title { get; set; } = string.Empty;
    }
}
