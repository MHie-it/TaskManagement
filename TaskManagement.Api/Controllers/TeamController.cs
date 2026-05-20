using Microsoft.AspNetCore.Mvc;
using TaskManagement.Business.Interfaces;

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

        // get all teams
        [HttpGet("GetAllTeams")]
        public async Task<IActionResult> GetAllTeams()
        {
            return Ok(await _teamService.GetAllTeams());
        }
    }
}
