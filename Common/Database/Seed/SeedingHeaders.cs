using Common.Database.Model;

namespace Common.Database.Seed
{
    public static class SeedingHeaders
    {
        public static Header[] SeedHeaders()
        {
            var headers = new Header[] { 
                new()
                {
                    Id = 1,
                    Title = "Show Title",
                    Logo = null,
                    ThumbNailPath = "default/images/closeup-open-textbook.jpg"
                }
            };

            return headers;
        }
    }
}
