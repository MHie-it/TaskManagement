using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagement.DataAccess.Models
{
    public partial class Role
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoleId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public ICollection<User>? Users { get; set; } = new List<User>();
    }
}
