using AutoMapper;
using TaskManagement.Business.Dtos;
using TaskManagement.Business.Interfaces;
using TaskManagement.Business.Helpers;
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
                    AuditHelper.SetCreateAudit(regisUser, "System");
                    regisUser.isDeleted = false;

                    await _userRepository.AddUserAsync(regisUser);
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
                if (checkUserName != null && checkUserName.UserId != id)
                {
                    Console.WriteLine("Username already exists!");
                    return false;
                }

                var checkEmail = await _userRepository.GetMailAsync(request.Email);
                if (checkEmail != null && checkEmail.UserId != id)
                {
                    Console.WriteLine("Email already exists!");
                    return false;
                }

                var checkPhone = await _userRepository.GetPhoneAsync(request.Phone);
                if (checkPhone != null && checkPhone.UserId != id)
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
                    AuditHelper.SetUpdateAudit(user, user.UserName);

                    await _userRepository.UpdateUserAsync(user);
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

        public async Task<bool> DeleteUserAsync(int userId)
        {

            try
            {
                var user = await _userRepository.GetUserIdAsync(userId);
                if (user == null)
                {
                    Console.WriteLine("User notfound");
                    return false;
                }

                var checkTask = await _userRepository.CheckUnTaskFinishesAsync(userId);
                if (checkTask == true)
                {
                    Console.WriteLine(" User has unfinished tasks");
                    return false;
                }

                if (user != null)
                {
                    user.isDeleted = true;
                    AuditHelper.SetUpdateAudit(user, user.UserName);

                    await _userRepository.UpdateUserAsync(user);
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




