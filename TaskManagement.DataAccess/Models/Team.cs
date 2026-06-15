using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagement.DataAccess.Models
{
    public partial class Team : Audit
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TeamId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public ICollection<User>? Users { get; set; } = new List<User>();
    }
}
