using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.DataAccess.Models
{
    public partial class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        public int RoleId { get; set; }

        public int TeamId { get; set; }


        public string UserName { get; set; }

        public string HashPass { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string? Phone { get; set; }

        public DateOnly? Bod { get; set; }

        public string? Address { get; set; }

        public bool isDeleted { get; set; }

        public string? Gende { get; set; }

        public Role Role { get; set; }

        public Team Team { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public ICollection<Task> Tasks { get; set; } = new List<Task>();
    }
}

