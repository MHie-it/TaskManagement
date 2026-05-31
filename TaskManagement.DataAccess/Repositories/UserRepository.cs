using Microsoft.EntityFrameworkCore;
using TaskManagement.DataAccess.DBContext;
using TaskManagement.DataAccess.Models;

namespace TaskManagement.DataAccess.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllUsersAsync();

        Task<User?> GetUserByIdAsync(int id);

        Task<List<User>> GetAllUserByTeamAsync(int teamId);

        Task<bool> AddUserAsync(User regisUser);

        Task<User?> GetMailAsync(string email);

        Task<User?> GetUserAsync(string user);

        Task<User?> GetUserIdAsync(int id);

        Task<User?> GetPhoneAsync(string phone);

        Task<bool> CheckUnTaskFinishesAsync(int userId);

        Task<bool> UpdateUserAsync(User user);
    }

    public class UserRepository : IUserRepository
    {
        private readonly TaskManagementDBContext _dbContext;

        public UserRepository(TaskManagementDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _dbContext.Users.AsNoTracking().ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(u => u.UserId == id && !u.isDeleted);
        }

        public async Task<List<User>> GetAllUserByTeamAsync(int teamId)
        {
            return await _dbContext.Users.AsNoTracking().Where(t => t.TeamId == teamId).ToListAsync();
        }

        public async Task<bool> AddUserAsync(User regisUser)
        {
            await _dbContext.AddAsync(regisUser);
            var result =await _dbContext.SaveChangesAsync();
            return result > 0;
        }

        public async Task<User?> GetUserAsync(string user)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == user);
        }

        public async Task<User?> GetUserIdAsync(int id)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.UserId == id);
        }

        public async Task<User?> GetMailAsync(string email)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetPhoneAsync(string phone)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.Phone == phone);
        }

        public async Task<bool> CheckUnTaskFinishesAsync(int userId)
        {
            var UnFinishTasks = await _dbContext.Tasks.AsNoTracking().AnyAsync(t => t.UserId == userId && t.Status != "Finished");
            return UnFinishTasks;
        }

        public async Task<bool> UpdateUserAsync(User user)
        {
            _dbContext.Users.Update(user);
            var result = await _dbContext.SaveChangesAsync();
            return result > 0;
        }
    }
}
