using Microsoft.AspNetCore.Mvc;
using TaskManagement.Business.Interfaces;

namespace TaskManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : Controller
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService) {
            _taskService = taskService;
        }


    }
}
