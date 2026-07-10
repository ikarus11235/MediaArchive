using Common.Database.Model;

namespace Common.Database.Seed
{
    public class SeedingEpisodes
    {
        public static Episode[] SeedEpisodes()
        {
            var episodes = new Episode[]
            {
                new Episode() 
                {
                    Id = 1,
                    SeasonId = 1,
                    Title = "MyEpisode",
                    Description = "The Description",
                    EpisodeSign = "S1E1",
                    VideoPath = "default/videos/LifeOfBrian.mp4"
                },
                new Episode()
                {
                    Id = 2,
                    SeasonId = 1,
                    Title = "MyEpisode2",
                    Description = "The Description",
                    EpisodeSign = "S1E2",
                    VideoPath = "default/videos/LifeOfBrian.mp4"
                },
                new Episode()
                {
                    Id = 3,
                    SeasonId = 2,
                    Title = "New Episode",
                    Description = "The other description",
                    EpisodeSign = "S2E1",
                    VideoPath = "default/videos/LifeOfBrian.mp4"
                },
            };

            return episodes;
        }
    }
}
