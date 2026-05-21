using AutoMapper;
using TaskManagement.Business.Dtos;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.Models;
using TaskManagement.DataAccess.Repositories;

namespace TaskManagement.Business.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IMapper mapper, IUserRepository userRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<List<UserDto>> GetAllUserByTeamAsync(int teamId)
        {
            try
            {
                var listUser = await _userRepository.GetAllUserByTeamAsync(teamId);
                var data = _mapper.Map<List<UserDto>>(listUser);

                if (data != null && data.Any())
                {
                    return data;
                }

                return data ?? new List<UserDto>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<List<UserDto>> GetAllUsersAsync()
        {
            try
            {
                var listUser = await _userRepository.GetAllUsersAsync();
                var data = _mapper.Map<List<UserDto>>(listUser);

                if (data != null && data.Any())
                {
                    return data;
                }

                return data ?? new List<UserDto>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(id);
                if (user == null)
                {
                    Console.WriteLine("User not found!!");
                    return null;
                }

                var data = _mapper.Map<UserDto>(user);

                return data;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<string?> RegisterUserAsync(AddUserDto request)
        {
            try
            {
                if (request == null || string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.FullName) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.HashPass))
                {
                    Console.WriteLine("Invalid user data provided.");
                    return null;
                }

                var checkUser = await _userRepository.GetUserAsync(request.UserName);
                if (checkUser != null)
                {
                    Console.WriteLine("User already exists!");
                    return null;
                }

                var checkEmail = await _userRepository.GetMailAsync(request.Email);
                if (checkEmail != null)
                {
                    Console.WriteLine("Email already exists!");
                    return null;
                }

                var defaultRole = 2;

                var regisUser = _mapper.Map<User>(request);
                if (regisUser != null)
                {
                    regisUser.RoleId = defaultRole;
                    regisUser.CreatedAt = DateTime.UtcNow;
                    regisUser.UpdatedAt = DateTime.UtcNow;
                    regisUser.CreatedBy = "System";
                    regisUser.UpdatedBy = "System";
                    regisUser.isDeleted = false;

                    await _userRepository.SaveChangesAsync(regisUser);
                }
                return regisUser.UserName;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<bool> UpdateUserAsync(int id, UpdateUserDto request)
        {
            try
            {
                var user = await _userRepository.GetUserIdAsync(id);

                var checkUserName = await _userRepository.GetUserAsync(request.UserName);
                if (checkUserName != null)
                {
                    Console.WriteLine("Username already exists!");
                    return false;
                }

                var checkEmail = await _userRepository.GetMailAsync(request.Email);
                if (checkEmail != null)
                {
                    Console.WriteLine("Email already exists!");
                    return false;
                }

                var checkPhone = await _userRepository.GetPhoneAsync(request.Phone);
                if (checkPhone != null)
                {
                    Console.WriteLine(" Your phone arealdy exists!");
                    return false;
                }

                if (user != null)
                {
                    user.TeamId = request.TeamId ?? user.TeamId;
                    user.UserName = request.UserName ?? user.UserName;
                    user.HashPass = request.HashPass ?? user.HashPass;
                    user.FullName = request.FullName ?? user.FullName;
                    user.Email = request.Email ?? user.Email;
                    user.Phone = request.Phone ?? user.Phone;
                    user.Bod = request.Bod ?? user.Bod;
                    user.Address = request.Address ?? user.Address;
                    user.isDeleted = request.isDeleted ?? user.isDeleted;
                    user.Gende = request.Gende ?? user.Gende;
                    user.CreatedAt = user.CreatedAt;
                    user.UpdatedAt = DateTime.UtcNow;
                    user.CreatedBy = user.CreatedBy;
                    user.UpdatedBy = request.UserName;

                    await _userRepository.SaveChangesAsync(user);
                }
                else
                {
                    Console.WriteLine("User not found!!");
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}




