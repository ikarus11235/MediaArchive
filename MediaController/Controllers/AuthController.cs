using Common.Database.Model;
using Common.Services;
using Microsoft.AspNetCore.Mvc;

namespace MediaController.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwtService;

        public AuthController(JwtService jwtService) 
        {
            _jwtService = jwtService;
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
