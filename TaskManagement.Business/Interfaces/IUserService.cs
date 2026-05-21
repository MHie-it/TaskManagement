using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Business.Dtos;

namespace TaskManagement.Business.Interfaces
{
    public interface IUserService
    {
        public Task<string?> RegisterUser(AddUserDto request);

        public Task<List<UserDto>> GetAllUsers();

        public Task<UserDto> GetUserById(int id);

        public Task<List<UserDto>> GetAllUserByTeam(int teamid);

        public Task<bool> UpdateUser(int id, UpdateUserDto request);
    }
}
