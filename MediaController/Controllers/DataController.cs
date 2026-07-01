using Common.Database;
using MediaController.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MediaController.Controllers
{
    [ApiController]
    [Route("api")]
    public class DataController : ControllerBase
    {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public DataController(IDbContextFactory<ApplicationDbContext> dbContextFactory)
        {
            this._dbContextFactory = dbContextFactory;
        }

        [HttpGet("headers")]
        public ActionResult<IEnumerable<HeaderDto>> GetHeaders()
        {
            return Ok(new[]
            {
            new HeaderDto
            {
                Id = 1,
                Title = "Breaking Bad"
            }
        });
        }

        [HttpGet("seasons")]
        public ActionResult<IEnumerable<SeasonDto>> GetSeasons()
        {
            return Ok(new[]
            {
            new SeasonDto
            {
                Id = 1,
                HeaderId = 1,
                Number = 1
            }
        });
        }

        [HttpGet("episodes")]
        public ActionResult<IEnumerable<EpisodeDto>> GetEpisodes()
        {
            return Ok(new[]
            {
            new EpisodeDto
            {
                Id = 1,
                SeasonId = 1,
                Title = "Pilot"
            }
        });
        }

        [HttpGet("pictures")]
        public ActionResult<IEnumerable<PictureDto>> GetPictures()
        {
            return Ok(new[]
            {
            new PictureDto
            {
                Id = 1,
                EpisodeId = 1,
                Url = "https://example.com/pilot.jpg"
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
    }
}
