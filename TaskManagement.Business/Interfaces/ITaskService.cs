using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Business.Dtos;

namespace TaskManagement.Business.Interfaces
{
    public interface ITaskService
    {
        Task<string?> AddTaskAsync(TaskDto request);

        Task<List<ListTaskDto>> GetAllTasksAsync(string? Status);

        Task<bool?> UpdateTaskAsync(int id, TaskDto request);
    }
}
