using Common.Database.Model;

namespace Common.Database.Seed
{
    public static class SeedingSeasons
    {
        public static Season[] SeedSeason()
        {
            var seasons = new Season[]
            {
                new Season()
                {
                    Id = 1,
                    HeaderId = 1,
                    Title = "Season I"
                },
                new Season()
                {
                    Id = 2,
                    HeaderId = 1,
                    Title = "Season II"
                },
            };

            return seasons;
        }
    }
}
