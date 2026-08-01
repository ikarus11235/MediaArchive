using Common.Database;
using Common.Database.Model;
using Common.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MediaController.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwtService;
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public AuthController(JwtService jwtService, IDbContextFactory<ApplicationDbContext> dbContextFactory) 
        {
            _jwtService = jwtService;
            _dbContextFactory = dbContextFactory;
        }

        [HttpPost("login")]
        public ActionResult Login(User user)
        {
            if (user.Email == "admin@test.com" && user.Password == "123456")
            {
                var token = _jwtService.GenerateToken(user.Email);
                return Ok(new { Token = token });
            }

            return Unauthorized(new { Message = "Invalid credentials" });
        }
    }
}
