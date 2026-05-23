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
            return Ok(await _userService.GetAllUsersAsync());
        }

        [HttpGet("GetUserById/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            return Ok(await _userService.GetUserByIdAsync(id));
        }

        [HttpPost("RegisterUser")]
        public async Task<IActionResult> RegisterUser(AddUserDto request)
        {
            return Ok(await _userService.RegisterUserAsync(request));
        }

        [HttpGet("GetAllUserByTeam")]
        public async Task<IActionResult> GetAllUserByTeam(int teamid)
        {
            return Ok(await _userService.GetAllUserByTeamAsync(teamid));
        }

        [HttpPut("UpdateUser/{id}")]
        public async Task<IActionResult> UpdateUser(int id, UpdateUserDto request)
        {
            return Ok(await _userService.UpdateUserAsync(id,request));
        }

        [HttpPut("DeleteUser")]
        public async Task<IActionResult> DeleteUser(int userId) {
            return Ok(
                await _userService.DeleteUserAsync(userId));
        }
    }
}
