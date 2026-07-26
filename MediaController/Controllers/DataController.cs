using Common.Database;
using Common.Database.Model;
using MediaController.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MediaController.Controllers
{
    [ApiController]
    [Route("api")]
    public class DataController : ControllerBase
    {
        public readonly string _imageFolderPath = "personal/images";
        public readonly string _videoFolderPath = "personal/videos";
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public DataController(IDbContextFactory<ApplicationDbContext> dbContextFactory)
        {
            this._dbContextFactory = dbContextFactory;
        }

        #region Fake Messages

        [HttpGet("fakeHeaders")]
        public ActionResult<IEnumerable<HeaderDto>> GetFakeHeaders()
        {
            var headers = new List<HeaderDto>();
            headers.Add(new HeaderDto { Id = 1, Title = "FakeTitle" });
            headers.Add(new HeaderDto { Id = 2, Title = "My Mock Show" });
            headers.Add(new HeaderDto { Id = 3, Title = "For Nothing" });

            return Ok(headers);
        }

        [HttpGet("fakeSeasons/{headerId}")]
        public ActionResult<IEnumerable<SeasonDto>> GetFakeSeasons(int headerId)
        {
            var seasons = new List<SeasonDto>();
            seasons.Add(new SeasonDto { Id = 1, HeaderId = 1, Number = 1 });
            seasons.Add(new SeasonDto { Id = 2, HeaderId = 1, Number = 2 });
            seasons.Add(new SeasonDto { Id = 3, HeaderId = 1, Number = 3 });
            seasons.Add(new SeasonDto { Id = 4, HeaderId = 2, Number = 1 });
            seasons.Add(new SeasonDto { Id = 5, HeaderId = 2, Number = 2 });
            seasons.Add(new SeasonDto { Id = 6, HeaderId = 3, Number = 1 });

            var result = new List<SeasonDto>();
            foreach (var season in seasons)
            {
                if (season.HeaderId == headerId)
                {
                    result.Add(season);
                }
            }

            return Ok(result);
        }

        [HttpGet("fakeEpisodes/{seasonId}")]
        public ActionResult<IEnumerable<EpisodeDto>> GetFakeEpisodes(int seasonId)
        {
            var episodes = new List<EpisodeDto>();
            episodes.Add(new EpisodeDto { Id = 1, EpisodeId = 1, Title = "Episode 01" });
            episodes.Add(new EpisodeDto { Id = 2, EpisodeId = 1, Title = "Episode 02" });
            episodes.Add(new EpisodeDto { Id = 3, EpisodeId = 1, Title = "Episode 03" });
            episodes.Add(new EpisodeDto { Id = 4, EpisodeId = 1, Title = "Episode 04" });
            episodes.Add(new EpisodeDto { Id = 5, EpisodeId = 1, Title = "Episode 05" });
            episodes.Add(new EpisodeDto { Id = 6, EpisodeId = 2, Title = "Episode 01" });
            episodes.Add(new EpisodeDto { Id = 7, EpisodeId = 2, Title = "Episode 02" });
            episodes.Add(new EpisodeDto { Id = 8, EpisodeId = 2, Title = "Episode 03" });
            episodes.Add(new EpisodeDto { Id = 9, EpisodeId = 3, Title = "Episode 01" });
            episodes.Add(new EpisodeDto { Id = 10, EpisodeId = 3, Title = "Episode 02" });

            var result = new List<EpisodeDto>();
            foreach (var episode in episodes)
            {
                if (episode.EpisodeId == seasonId)
                {
                    result.Add(episode);
                }
            }

            return Ok(episodes);
        }

        #endregion

        #region Headers
        [HttpGet("headers")]
        public ActionResult<IEnumerable<HeaderDto>> GetHeaders()
        {
            var dbContext = _dbContextFactory.CreateDbContext();
            var headers = dbContext.Set<Header>().ToList();
            if (!headers.Any())
            {
                return NotFound();
            }
            var headerDtos = new List<HeaderDto>();
            foreach (var header in headers)
            {
                headerDtos.Add(new HeaderDto
                {
                    Id = header.Id,
                    Title = header.Title,
                    ThumbNailPath = header.ThumbNailPath,
                    //Logo = null
                });
            }

            return Ok(headerDtos);
        }

        [HttpPost("headers")]
        public async Task<ActionResult<HeaderDto>> CreateHeader([FromBody] HeaderDto headerDto)
        {
            var dbContext = _dbContextFactory.CreateDbContext();
            var header = new Header()
            {
                Title = headerDto.Title,
                ThumbNailPath = $"{_imageFolderPath}/{headerDto.ThumbNailPath}",
            };

            dbContext.Add(header);
            await dbContext.SaveChangesAsync();

            return Ok(header);
        }

        [HttpGet("header/episodes/{seasonId}")]
        public ActionResult<HeaderDto> GetHeaderIdBySeason(int seasonId)
        {
            var dbContext = _dbContextFactory.CreateDbContext();
            var season = dbContext.Set<Season>().AsNoTracking().Where(q => q.Id == seasonId).FirstOrDefault();
            if (season == null)
            {
                return NotFound();
            }
            var headerDto = new HeaderDto
            {
                Id = season.HeaderId,
                Title = season.Title,
                ThumbNailPath = "",
                Logo = ""
            };
            return Ok(headerDto);
        }
        #endregion

        #region Season
        [HttpGet("seasons/{headerId}")]
        public ActionResult<IEnumerable<SeasonDto>> GetSeasons(int headerId)
        {
            var dbContext = _dbContextFactory.CreateDbContext();
            var seasons = dbContext.Set<Season>().AsNoTracking().Include(s => s.Episodes).Where(q => q.HeaderId == headerId).ToList();
            if (!seasons.Any())
            {
                return NotFound();
            }
            var seasonDtos = new List<SeasonDto>();
            foreach (var season in seasons)
            {
                seasonDtos.Add(new SeasonDto
                {
                    Id = season.Id,
                    Title = season.Title,
                    Number = season.Id,
                    HeaderId = season.HeaderId,
                    Episodes = season.Episodes.Select(e => new EpisodeDto
                    {
                        Id = e.Id,
                        SeasonId = e.SeasonId,
                        Title = e.Title,
                        Description = e.Description,
                        EpisodeSign = e.EpisodeSign,
                        VideoPath = e.VideoPath
                    }).ToList()
                });
            }

            return Ok(seasonDtos);
        }

        [HttpPost("seasons")]
        public async Task<ActionResult<SeasonDto>> CreateSeason([FromBody] SeasonDto seasonDto)
        {
            await using var dbContext = _dbContextFactory.CreateDbContext();
            var header = dbContext.Set<Header>().AsNoTracking().Where(q => q.Id == seasonDto.HeaderId).ToList();
            if (!header.Any())
            {
                return NotFound();
            }

            Season season = new()
            {
                Title = seasonDto.Title,
                HeaderId = seasonDto.HeaderId,
                Episodes = seasonDto.Episodes.Select(e => new Episode
                {
                    Title = e.Title,
                    Description = e.Description,
                    EpisodeSign = e.EpisodeSign,
                    VideoPath = $"{_videoFolderPath}/{e.VideoPath}",
                }).ToList()
            };
            dbContext.Add(season);
            await dbContext.SaveChangesAsync();
            return Ok();
        }
        #endregion

        #region Episodes
        [HttpGet("episodes/{seasonId}")]
        public ActionResult<IEnumerable<EpisodeDto>> GetEpisodes(int seasonId)
        {
            var dbContext = _dbContextFactory.CreateDbContext();
            var episodes = dbContext.Set<Episode>().AsNoTracking().Where(q => q.SeasonId == seasonId).ToList();
            if (!episodes.Any())
            {
                return NotFound();
            }
            var episodeDtos = new List<Episode>();
            foreach (var episode in episodes)
            {
                episodeDtos.Add(new Episode
                {
                    Id = episode.Id,
                    Title = episode.Title,
                    SeasonId = episode.SeasonId,
                    Description = episode.Description,
                    EpisodeSign = episode.EpisodeSign,
                    VideoPath = episode.VideoPath,
                });
            }

            return Ok(episodeDtos);
        }

        

        [HttpPost("episodes")]
        public ActionResult<IEnumerable<EpisodeDto>> PostEpisodes(EpisodeDto[] episodeDtos)
        {
            var dbContext = _dbContextFactory.CreateDbContext();
            var episodes = dbContext.Set<Episode>().AsNoTracking().Where(q => q.SeasonId == episodeDtos[0].SeasonId).ToList();
            if (!episodes.Any())
            {
                return NotFound();
            }
            foreach (var episode in episodeDtos)
            {
                dbContext.Add(new Episode
                {
                    //Id = episode.Id,
                    Title = episode.Title,
                    SeasonId = episode.SeasonId,
                    Description = episode.Description,
                    EpisodeSign = episode.EpisodeSign,
                    VideoPath = episode.VideoPath,
                });
            }
            dbContext.SaveChanges();
            return Ok(episodes);
        }

        [HttpGet("singleEpisodes/{episodeId}")]
        public ActionResult<IEnumerable<EpisodeDto>> GetEpisodeById(int episodeId)
        {
            var dbContext = _dbContextFactory.CreateDbContext();
            var episode = dbContext.Set<Episode>().AsNoTracking().SingleOrDefault(q => q.Id == episodeId);
            if (episode == null)
            {
                return NotFound();
            }

            return Ok(episode);
        }

        [HttpPost("singleEpisode/{episodeId}")]
        public ActionResult<IEnumerable<EpisodeDto>> PostEpisode(EpisodeDto episodeDtos)
        {
            var dbContext = _dbContextFactory.CreateDbContext();
            var season = dbContext.Set<Season>().AsNoTracking().Where(q => q.Id == episodeDtos.SeasonId).ToList();
            if (!season.Any())
            {
                return NotFound();
            }
            
            dbContext.Add(new Episode
            {
                Id = episodeDtos.Id,
                Title = episodeDtos.Title,
                SeasonId = episodeDtos.SeasonId,
                Description = episodeDtos.Description,
                EpisodeSign = episodeDtos.EpisodeSign,
                VideoPath = episodeDtos.VideoPath,
            });
            dbContext.SaveChanges();
            return Ok(season);
        }
        #endregion

        #region Pictures
        [HttpGet("pictures/{episodeId}")]
        public ActionResult<IEnumerable<PictureDto>> GetPictureBySeasonId(int episodeId) 
        {
            var dbContext = _dbContextFactory.CreateDbContext();
            var pictures = dbContext.Set<Picture>().AsNoTracking().Where(q => q.EpisodeId == episodeId).ToList();
            if (pictures == null)
            {
                return NotFound();
            }

            var pictureDtos = new List<PictureDto>();
            foreach (var picture in pictures)
            {
                pictureDtos.Add(new PictureDto
                {
                    Id = picture.Id,
                    Episode = picture.EpisodeId,
                    ImagePath = picture.ImagePath
                });
            }

            return Ok(pictures);
        }

        [HttpPost("pictures")]
        public ActionResult<IEnumerable<PictureDto>> PostEpisodes([FromBody] PictureDto[] pictureDtos)
        {
            var dbContext = _dbContextFactory.CreateDbContext();
            var episode = dbContext.Set<Episode>().AsNoTracking().Where(q => q.Id == pictureDtos[0].Episode).ToList();
            if (!episode.Any())
            {
                return NotFound();
            }
            foreach (var picture in pictureDtos)
            {
                dbContext.Add(new Picture
                {
                    //Id = picture.Id,
                    EpisodeId = picture.Episode,
                    ImagePath = $"{_imageFolderPath}/{picture.ImagePath}",
                });
            }
            dbContext.SaveChanges();
            return Ok(episode);
        }

        [HttpGet("pictures")]
        public ActionResult<IEnumerable<PictureDto>> GetPictures()
        {
            return Ok(new[]
            {
            new PictureDto
            {
                Id = 1,
                Episode = 1,
                ImagePath = "https://example.com/pilot.jpg"
            }
        });
        }

        [HttpGet("tags")]
        public ActionResult<IEnumerable<TagDto>> GetTags()
        {
            return Ok(new[]
            {
            new TagDto
            {
                Id = 1,
                Name = "Action"
            }
        });
        }
        #endregion
    }
}
