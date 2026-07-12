using Common.Database.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Database.Seed
{
    public static class SeedingPictures
    {
        public static Picture[] SeedPictures()
        {
            var pictures = new Picture[]
            {
                new()
                {
                    Id = 1,
                    EpisodeId = 1,
                    ImagePath = "default/images/closeup-open-textbook.jpg"
                },
                new()
                {
                    Id = 2,
                    EpisodeId = 1,
                    ImagePath = "default/images/closeup-open-textbook.jpg"
                },
                new()
                {
                    Id = 3,
                    EpisodeId = 1,
                    ImagePath = "default/images/closeup-open-textbook.jpg"
                },
                new()
                {
                    Id = 4,
                    EpisodeId = 2,
                    ImagePath = "default/images/closeup-open-textbook.jpg"
                },
                new()
                {
                    Id = 5,
                    EpisodeId = 2,
                    ImagePath = "default/images/closeup-open-textbook.jpg"
                },
                new()
                {
                    Id = 6,
                    EpisodeId = 3,
                    ImagePath = "default/images/closeup-open-textbook.jpg"
                },
                new()
                {
                    Id = 7,
                    EpisodeId = 3,
                    ImagePath = "default/images/closeup-open-textbook.jpg"
                },
                new()
                {
                    Id = 8,
                    EpisodeId = 3,
                    ImagePath = "default/images/closeup-open-textbook.jpg"
                },
            };

            return pictures;
        }
    }
}
