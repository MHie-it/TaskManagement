using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Business.Dtos;

namespace TaskManagement.Business.Interfaces
{
    public interface ITeamService
    {
        public Task<List<TeamDto>> GetAllTeams();

        public Task<TeamDto> GetTeamById(int id);
    }
}
