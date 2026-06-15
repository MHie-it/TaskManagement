using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagement.DataAccess.Models
{
    public partial class Task : Audit
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int? UserId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateOnly StarTime { get; set; }

        public DateOnly? FinishTime { get; set; }

        public DateOnly DueDate { get; set; }

        public string? Note { get; set; }

        public string? Priority { get; set; }

        public string? Status { get; set; }

        public User? User { get; set; }
    }
}
