using AutoMapper;
using Microsoft.Extensions.Logging;
using TaskManagement.Business.Dtos;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.Repositories;

namespace TaskManagement.Business.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<TaskService> _logger;

        public TaskService(ITaskRepository taskRepository, IUserRepository userRepository, IMapper mapper, ILogger<TaskService> logger)
        {
            _taskRepository = taskRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<string?> AddTaskAsync(TaskDto request)
        {
            try
            {
                if (request == null)
                {
                    throw new ArgumentNullException(nameof(request));
                }

                if (string.IsNullOrEmpty(request.Title)
                    || request.UserId <= 0
                    || string.IsNullOrEmpty(request.Status)
                    || request.StarTime == default
                    || request.FinishTime == default
                    || string.IsNullOrEmpty(request.Priority))
                {
                    throw new ArgumentException("Invalid Task can not be null or empty.");
                }

                var checkUser = await _userRepository.GetUserByIdAsync(request.UserId);
                if (checkUser == null)
                {
                    throw new KeyNotFoundException($"User with ID {request.UserId} not found.");
                }

                var taskEntity = _mapper.Map<DataAccess.Models.Task>(request);
                if (taskEntity != null)
                {
                    taskEntity.CreateAudit("System");
                    await _taskRepository.AddTaskAsync(taskEntity);
                    _logger.LogInformation("Task created successfully with title: {Title}", taskEntity.Title);
                }

                return request.Title;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding the task.");
                throw;
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
                _logger.LogInformation("Retrieved {Count} tasks.", data.Count);

                return data ?? new List<ListTaskDto>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving tasks.");
                throw;
            }
        }

        public async Task<bool?> UpdateTaskAsync(int id, TaskDto request)
        {
            try
            {
                var task = await _taskRepository.GetTaskByIdAsync(id);
                if (task == null)
                {
                    throw new KeyNotFoundException("Task not found.");
                }

                var checkUser = await _userRepository.GetUserByIdAsync(request.UserId);
                if (checkUser == null)
                {
                    throw new KeyNotFoundException($"User with ID {request.UserId} not found.");
                }

                task.Title = request.Title ?? task.Title;
                task.Description = request.Description ?? task.Description;
                task.UserId = request.UserId > 0 ? request.UserId : task.UserId;
                task.StarTime = request.StarTime != default ? request.StarTime : task.StarTime;
                task.FinishTime = request.FinishTime ?? task.FinishTime;
                task.DueDate = request.DueDate != default ? request.DueDate : task.DueDate;
                task.Priority = request.Priority ?? task.Priority;
                task.Status = request.Status ?? task.Status;
                task.Note = request.Note ?? task.Note;
                task.UpdateAudit("System");

                var update = await _taskRepository.UpdateTaskAsync(task);
                _logger.LogInformation("Task updated successfully with title: {Title}", task.Title);

                return update;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updateting task.");
                throw;
            }
        }

    }
}
