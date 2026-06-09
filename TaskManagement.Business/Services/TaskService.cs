using AutoMapper;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.Repositories;

namespace TaskManagement.Business.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;
        public TaskService(ITaskRepository taskRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }
    }
}
