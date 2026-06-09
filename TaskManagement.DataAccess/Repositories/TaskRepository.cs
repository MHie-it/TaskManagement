using Microsoft.EntityFrameworkCore;
using TaskManagement.DataAccess.DBContext;
using Task = TaskManagement.DataAccess.Models.Task;


namespace TaskManagement.DataAccess.Repositories
{
    public interface ITaskRepository
    {
        Task<List<Task>> GetAllTasksAsync();

        Task<List<Task>> GetListTaskByStatusAsync(string? status);

        Task<List<Task>> GetListByNameAsync(string title);

        Task<Task?> AddTaskAsync(Task task);

        Task<bool> UpdateTaskAsync(Task task);

        Task<Task?> GetTaskByIdAsync(int id);
    }

    public class TaskRepository : ITaskRepository
    {
        private readonly TaskManagementDBContext _dbContext;

        public TaskRepository(TaskManagementDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Task>> GetAllTasksAsync()
        {
            return await _dbContext.Tasks.AsNoTracking().ToListAsync();
        }

        public async Task<List<Task>> GetListTaskByStatusAsync(string? status)
        {
            return await _dbContext.Tasks.AsNoTracking().Where(t => t.Status == status).ToListAsync();
        }

        public async Task<Task?> GetTaskByIdAsync(int id)
        {
            return await _dbContext.Tasks.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<List<Task>> GetListByNameAsync(string title)
        {
            return await _dbContext.Tasks.AsNoTracking().Where(t => t.Title.Contains(title)).ToListAsync();
        }

        public async Task<Task?> AddTaskAsync(Task task)
        {
            await _dbContext.Tasks.AddAsync(task);
            await _dbContext.SaveChangesAsync();
            return task;
        }

        public async Task<bool> UpdateTaskAsync(Task task)
        {
            _dbContext.Tasks.Update(task);
            var result = await _dbContext.SaveChangesAsync();
            return result > 0;
        }
    }
}
