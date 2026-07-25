using Common.Database.Model;

namespace MediaController.DTOs
{
    public class SeasonDto
    {
        public int Id { get; set; }
        public int HeaderId { get; set; }
        public int Number { get; set; }
        public string Title { get; set; }
        public List<EpisodeDto> Episodes { get; set; } = [];
    }
}
