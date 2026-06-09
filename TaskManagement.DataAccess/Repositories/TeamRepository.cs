using Microsoft.EntityFrameworkCore;
using TaskManagement.DataAccess.DBContext;
using TaskManagement.DataAccess.Models;

namespace TaskManagement.DataAccess.Repositories
{
    public interface ITeamRepository
    {
        Task<Team?> AddTeamAsync(Team team);

        Task<List<Team>> GetTeamsAsync();

        Task<List<Team>> GetTeamByNameAsync(string name);

        Task<Team?> GetTeamByIdAsync(int id);

        Task<bool> GetMemberToTeamAsync(int teamId, int userId);
    }

    public class TeamRepository : ITeamRepository
    {
        private readonly TaskManagementDBContext _dbContext;

        public TeamRepository(TaskManagementDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Team?> AddTeamAsync(Team team)
        {
            await _dbContext.AddAsync<Team>(team);
            await _dbContext.SaveChangesAsync();
            return team;
        }

        public async Task<List<Team>> GetTeamsAsync()
        {
            return await _dbContext.Teams.AsNoTracking().ToListAsync();
        }

        public async Task<List<Team>> GetTeamByNameAsync(string name)
        {
            return await _dbContext.Teams.AsNoTracking().Where(t => t.Name.Contains(name)).ToListAsync();
        }

        public async Task<Team?> GetTeamByIdAsync(int id)
        {
            return await _dbContext.Teams.AsNoTracking().FirstOrDefaultAsync(t => t.TeamId == id);
        }

        public async Task<bool> GetMemberToTeamAsync(int teamId, int userId) {
            return await _dbContext.Teams.AsNoTracking().AnyAsync(t => t.TeamId == teamId && t.Users.Any(u => u.UserId == userId));
        }
    }
}
