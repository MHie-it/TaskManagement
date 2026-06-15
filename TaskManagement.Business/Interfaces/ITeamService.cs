using TaskManagement.Business.Dtos;

namespace TaskManagement.Business.Interfaces
{
    public interface ITeamService
    {
        public Task<List<TeamDto>> GetAllTeamsAsync();

        public Task<List<TeamDto>> GetTeamByNameAsync(string name);

        public Task<bool?> AddTeamAsync(TeamDto request);

        public Task<bool?> AddMemberAsync(int UserId, AddUserToTeamDto request);
    }
}
