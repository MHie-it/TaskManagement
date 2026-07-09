using TaskManagement.Business.Dtos;
using TaskManagement.DataAccess.Models;

namespace TaskManagement.Business.Interfaces
{
    public interface ITeamService
    {
        public Task<List<TeamDto>> GetAllTeamsAsync();

        public Task<List<TeamDto>> GetTeamByNameAsync(string name);

        public Task<bool?> AddTeamAsync(TeamDto request);

        public Task<bool?> AddMemberAsync(int UserId, AddUserToTeamDto request);

        public Task<bool?> UpdateTeamAsync(int TeamId, TeamDto request);
    }
}
