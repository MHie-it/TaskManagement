using Microsoft.EntityFrameworkCore;
using TaskManagement.DataAccess.DBContext;
using TaskManagement.DataAccess.Models;
using Task = TaskManagement.DataAccess.Models.Task;


namespace TaskManagement.DataAccess.Repositories
{
    public interface ITaskRepository
    {
        Task<List<Task>> GetListTask();

        Task<List<Task>> GetListByName(string title);
    }

    public class TaskRepository : ITaskRepository
    {
        private readonly TaskManagementDBContext _dbContext;

        public TaskRepository(TaskManagementDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Task>> GetListTask()
        {
            return await _dbContext.Tasks.AsNoTracking().ToListAsync();
        }

        public async Task<List<Task>> GetListByName(string title)
        {
            return await _dbContext.Tasks.AsNoTracking().Where(t => t.Title.Contains(title)).ToListAsync();
        }

    }
}
