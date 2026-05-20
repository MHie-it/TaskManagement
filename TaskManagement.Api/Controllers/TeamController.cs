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
            return Ok(await _teamService.GetAllTeams());
        }

        [HttpGet("GetTeamByName")]
        public async Task<IActionResult> GetTeamByName(String request)
        {
            return Ok(await _teamService.GetTeamByName(request));
        }

        [HttpPost("AddTeam")]
        public async Task<IActionResult> AddTeam(TeamDto request)
        {
            return Ok(await _teamService.AddTeam(request));
        }

    }
}
