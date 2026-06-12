using AutoMapper;
using TaskManagement.Business.Dtos;
using TaskManagement.Business.Interfaces;
using TaskManagement.Business.Helpers;
using TaskManagement.DataAccess.Models;
using TaskManagement.DataAccess.Repositories;
using Microsoft.Extensions.Logging;

namespace TaskManagement.Business.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserService> _logger;
        private readonly IMapper _mapper;

        public UserService(IMapper mapper, IUserRepository userRepository, ILogger<UserService> logger)
        {
            _mapper = mapper;
            _logger = logger;
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
                    _logger.LogInformation("Retrieved {Count} users for team ID {TeamId}.", data.Count, teamId);
                    return data;
                }

                return data ?? new List<UserDto>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving users by team.");
                throw;
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
                    _logger.LogInformation("Retrieved {Count} users.", data.Count);
                    return data;
                }

                return data ?? new List<UserDto>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving all users.");
                throw;
            }
        }

        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(id);
                if (user == null)
                {
                    _logger.LogWarning("User with ID {UserId} not found.", id);
                    throw new KeyNotFoundException("User not found.");
                }

                var data = _mapper.Map<UserDto>(user);

                _logger.LogInformation("Retrieved user with ID {UserId}.", id);
                return data;

            }
            catch (KeyNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving user by ID {UserId}.", id);
                throw;
            }
        }

        public async Task<string?> RegisterUserAsync(AddUserDto request)
        {
            try
            {
                if (request == null)
                {
                    throw new ArgumentNullException(nameof(request), "Request cannot be null.");
                }

                if (string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.FullName) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.HashPass))
                {
                    throw new ArgumentException("Information can not null or empty");
                }

                var checkUser = await _userRepository.GetUserAsync(request.UserName);
                if (checkUser != null)
                {
                    _logger.LogWarning("Username {UserName} already exists.", request.UserName);
                    throw new InvalidOperationException("Username already exists.");
                }

                var checkEmail = await _userRepository.GetMailAsync(request.Email);
                if (checkEmail != null)
                {
                    _logger.LogWarning("Email {Email} already exists.", request.Email);
                    throw new InvalidOperationException("Email already exists.");
                }

                var defaultRole = 2;

                var regisUser = _mapper.Map<User>(request);
                if (regisUser != null)
                {
                    regisUser.RoleId = defaultRole;
                    AuditHelper.SetCreateAudit(regisUser, "System");
                    regisUser.isDeleted = false;

                    await _userRepository.AddUserAsync(regisUser);
                    _logger.LogInformation("User {UserName} registered successfully.", regisUser.UserName);
                }
                return regisUser.UserName;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while registering user.");
                throw;
            }
        }

        public async Task<bool> UpdateUserAsync(int id, UpdateUserDto request)
        {
            try
            {
                var user = await _userRepository.GetUserIdAsync(id);
                if (user == null)
                {
                    throw new KeyNotFoundException("User not found.");
                }

                var checkUserName = await _userRepository.GetUserAsync(request.UserName);
                if (checkUserName != null && checkUserName.UserId != id)
                {
                    _logger.LogWarning("Username {UserName} already exists.", request.UserName);
                    throw new InvalidOperationException("Username already exists.");
                }

                var checkEmail = await _userRepository.GetMailAsync(request.Email);
                if (checkEmail != null && checkEmail.UserId != id)
                {
                    _logger.LogWarning("Email {Email} already exists.", request.Email);
                    throw new InvalidOperationException("Email already exists.");
                }

                var checkPhone = await _userRepository.GetPhoneAsync(request.Phone);
                if (checkPhone != null && checkPhone.UserId != id)
                {
                    _logger.LogWarning("Phone {Phone} already exists.", request.Phone);
                    throw new InvalidOperationException("Phone already exists.");
                }

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

                var result = await _userRepository.UpdateUserAsync(user);
                _logger.LogInformation("User with ID {UserId} updated successfully.", id);
                return result;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating user with ID {UserId}.", id);
                throw;
            }
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {

            try
            {
                var user = await _userRepository.GetUserIdAsync(userId);
                if (user == null)
                {
                    throw new KeyNotFoundException("User not found.");
                }

                var checkTask = await _userRepository.CheckUnTaskFinishesAsync(userId);
                if (checkTask == true)
                {
                    _logger.LogWarning("User with ID {UserId} has unfinished tasks and cannot be deleted.", userId);
                    throw new InvalidOperationException("Cannot delete user with unfinished tasks.");
                }

                user.isDeleted = true;
                AuditHelper.SetUpdateAudit(user, user.UserName);

                var result = await _userRepository.UpdateUserAsync(user);
                _logger.LogInformation("User with ID {UserId} marked as deleted successfully.", userId);

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting user with ID {UserId}.", userId);
                throw;

            }
        }
    }
}




