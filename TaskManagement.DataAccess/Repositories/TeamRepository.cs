using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.DataAccess.DBContext;
using TaskManagement.DataAccess.Models;

namespace TaskManagement.DataAccess.Repositories
{
    public interface ITeamRepository
    {
        Task<Team?> SaveChangesAsync(Team team);

        Task<List<Team>> GetTeamsAsync();

        Task<List<Team>> GetTeamByNameAsync(string name);
    }

    public class TeamRepository : ITeamRepository
    {
        private readonly TaskManagementDBContext _dbContext;

        public TeamRepository(TaskManagementDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Team?> SaveChangesAsync(Team team)
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
    }
}
