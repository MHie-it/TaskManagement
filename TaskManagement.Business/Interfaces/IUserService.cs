using TaskManagement.Business.Dtos;

namespace TaskManagement.Business.Interfaces
{
    public interface IUserService
    {
        public Task<string?> RegisterUserAsync(AddUserDto request);

        public Task<List<UserDto>> GetAllUsersAsync();

        public Task<UserDto> GetUserByIdAsync(int id);

        public Task<List<UserDto>> GetAllUserByTeamAsync(int teamid);

        public Task<bool> UpdateUserAsync(int id, UpdateUserDto request);

        public Task<bool> DeleteUserAsync(int userId);
    }
}
