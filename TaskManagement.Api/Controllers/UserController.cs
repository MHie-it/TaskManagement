using Microsoft.AspNetCore.Mvc;
using TaskManagement.Business.Dtos;
using TaskManagement.Business.Interfaces;

namespace TaskManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _userService.GetAllUsers());
        }

        [HttpGet("GetUserById/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            return Ok(await _userService.GetUserById(id));
        }

        [HttpPost("RegisterUser")]
        public async Task<IActionResult> RegisterUser(AddUserDto request)
        {
            return Ok(await _userService.RegisterUser(request));
        }
    }
}
