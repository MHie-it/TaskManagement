using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.DataAccess.Models;

namespace TaskManagement.Business.Dtos
{
    public class UserDto
    {
        public string FullName { get; set; }

        public string Email { get; set; }
    }

    public class AddUserDto
    {
        public int UserId { get; set; }

        public int RoleId { get; set; }

        public int TeamId { get; set; }

        public string UserName { get; set; }

        public string HashPass { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }


        public bool isDeleted { get; set; }

        public Role Role { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }
    }
}
