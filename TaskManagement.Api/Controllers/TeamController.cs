using Microsoft.AspNetCore.Mvc;
using TaskManagement.Business.Dtos;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.Migrations;
using TaskManagement.DataAccess.Models;

namespace TaskManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamController : Controller
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
        }

        [HttpGet("GetAllTeams")]
        public async Task<IActionResult> GetAllTeams()
        {
            return Ok(await _teamService.GetAllTeamsAsync());
        }

        [HttpGet("GetTeamByName")]
        public async Task<IActionResult> GetTeamByName(String request)
        {
            return Ok(await _teamService.GetTeamByNameAsync(request));
        }

        [HttpPost("AddTeam")]
        public async Task<IActionResult> AddTeam(TeamDto request)
        {
            return Ok(await _teamService.AddTeamAsync(request));
        }

        [HttpPut("AddMember")]
        public async Task<IActionResult> AddMember(int UserId, [FromBody] AddUserToTeamDto request)
        {
            return Ok(await _teamService.AddMemberAsync(UserId, request));
        }

        [HttpPut("UpdateTeam")]
        public async Task<IActionResult> UpdateTeam(int TeamId, [FromBody] TeamDto request) {
            return Ok(await _teamService.UpdateTeamAsync(TeamId,request));
        }
    }
}
