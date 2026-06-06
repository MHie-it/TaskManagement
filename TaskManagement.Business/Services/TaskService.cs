using AutoMapper;
using TaskManagement.Business.Dtos;
using TaskManagement.Business.Helpers;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.Repositories;

namespace TaskManagement.Business.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public TaskService(ITaskRepository taskRepository, IUserRepository userRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<string?> AddTaskAsync(TaskDto request)
        {
            try
            {
                if (request == null || string.IsNullOrEmpty(request.Title)
                    || request.UserId <= 0
                    || string.IsNullOrEmpty(request.Status)
                    || request.StarTime == default
                    || request.FinishTime == default
                    || string.IsNullOrEmpty(request.Priority))
                {
                    Console.WriteLine("Invalid task data.");
                    return null;
                }

                var checkUser = await _userRepository.GetUserByIdAsync(request.UserId);
                if (checkUser == null)
                {
                    Console.WriteLine("User not found.");
                    return null;
                }

                var taskEntity = _mapper.Map<DataAccess.Models.Task>(request);
                if (taskEntity != null)
                {
                    AuditHelper.SetCreateAudit(taskEntity, checkUser.FullName);
                    await _taskRepository.AddTaskAsync(taskEntity);
                }
                return request.Title;


            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<List<ListTaskDto>> GetAllTasksAsync(string? Status)
        {
            try
            {
                var listTasks = new List<DataAccess.Models.Task>();

                if (Status != null)
                {
                    listTasks = await _taskRepository.GetListTaskByStatusAsync(Status);
                }
                else
                {
                    listTasks = await _taskRepository.GetAllTasksAsync();
                }

                var data = _mapper.Map<List<ListTaskDto>>(listTasks);
                return data ?? new List<ListTaskDto>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<bool?> UpdateTaskAsync(int id, TaskDto request)
        {
            try {
                var task = await _taskRepository.GetTaskByIdAsync(id);
                if (task == null) {
                    Console.WriteLine("Task not found.");
                    return false;
                }

                var checkUser = await _userRepository.GetUserByIdAsync(request.UserId);
                if (checkUser == null)
                {
                    Console.WriteLine("User not found.");
                    return false;
                }

                if (task != null) {
                    task.Title = request.Title ?? task.Title;
                    task.Description = request.Description ?? task.Description;
                    task.UserId = request.UserId > 0 ? request.UserId : task.UserId;
                    task.StarTime = request.StarTime != default ? request.StarTime : task.StarTime;
                    task.FinishTime = request.FinishTime ?? task.FinishTime;
                    task.DueDate = request.DueDate != default ? request.DueDate : task.DueDate;
                    task.Priority = request.Priority ?? task.Priority;
                    task.Status = request.Status ?? task.Status;
                    task.Note = request.Note ?? task.Note;
                    AuditHelper.SetUpdateAudit(task, "System");
                    await _taskRepository.UpdateTaskAsync(task);
                }
                Console.WriteLine("Task updated successfully.");
                return true;

            } catch (Exception ex) {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

    }
}
