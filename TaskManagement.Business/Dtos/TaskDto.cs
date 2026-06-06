using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Business.Dtos
{
    public class TaskDto
    {
        public int UserId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateOnly StarTime { get; set; }

        public DateOnly? FinishTime { get; set; }

        public DateOnly DueDate { get; set; }

        public string? Note { get; set; }

        public string? Priority { get; set; }

        public string? Status { get; set; }

    }

    public class ListTaskDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateOnly StarTime { get; set; }
        public DateOnly DueDate { get; set; }
        public string? Priority { get; set; }
        public string? Status { get; set; }
    }
}
