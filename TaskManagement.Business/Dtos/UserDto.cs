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
        public string UserName { get; set; }

        public string HashPass { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Gender { get; set; }
    }

    public class UpdateUserDto
    {
        public int? TeamId { get; set; }

        public string? UserName { get; set; }

        public string? HashPass { get; set; }

        public string? FullName { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public DateOnly? Bod { get; set; }

        public string? Address { get; set; }

        public bool? isDeleted { get; set; }

        public string? Gende { get; set; }
    }

    public class AddUserToTeamDto
    {
        //public int UserId { get; set; }
        public int TeamId { get; set; }
    }
}