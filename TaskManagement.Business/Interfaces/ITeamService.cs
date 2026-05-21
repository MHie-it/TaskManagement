using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Business.Dtos;
using TaskManagement.DataAccess.Models;

namespace TaskManagement.Business.Interfaces
{
    public interface ITeamService
    {
        public Task<List<TeamDto>> GetAllTeams();

        public Task<List<TeamDto>> GetTeamByName(string name);

        public Task<bool> AddTeam(TeamDto request);

        
    }
}
