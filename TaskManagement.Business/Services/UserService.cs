using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Business.Dtos;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.DBContext;
using TaskManagement.DataAccess.Models;

namespace TaskManagement.Business.Services
{
    public class UserService : IUserService
    {
        private readonly TaskManagementDBContext _context;
        private readonly IMapper _mapper;

        public UserService(TaskManagementDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<UserDto>> GetAllUserByTeam(int teamid)
        {
            try
            {
                var listUser = await _context.Users.AsNoTracking().Where(t => t.TeamId == teamid).ToListAsync();
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

        public async Task<List<UserDto>> GetAllUsers()
        {
            try
            {
                var listUser = await _context.Users.AsNoTracking().ToListAsync();
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

        public async Task<UserDto> GetUserById(int id)
        {
            try
            {
                var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.UserId == id);
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

        public async Task<string?> RegisterUser(AddUserDto request)
        {
            try
            {
                if (request == null || string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.FullName) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.HashPass))
                {
                    Console.WriteLine("Invalid user data provided.");
                    return null;
                }

                var checkUser = _context.Users.FirstOrDefault(u => u.UserName == request.UserName);
                if (checkUser != null)
                {
                    Console.WriteLine("User already exists!");
                    return null;
                }

                var checkEmail = _context.Users.FirstOrDefault(u => u.Email == request.Email);
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

                    await _context.AddAsync<User>(regisUser);
                    await _context.SaveChangesAsync();
                }
                return regisUser.UserName;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<bool> UpdateUser(int id, UpdateUserDto request)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);

                var checkUserName = await _context.Users.FirstOrDefaultAsync(u => u.UserName == request.UserName && u.UserId != id);
                if (checkUserName != null)
                {
                    Console.WriteLine("Username already exists!");
                    return false;
                }

                var checkEmail = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email && u.UserId != id);
                if (checkEmail != null)
                {
                    Console.WriteLine("Email already exists!");
                    return false;
                }

                var checkPhone = await _context.Users.FirstOrDefaultAsync(u => u.Phone == request.Phone && u.UserId != id);
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
                    await _context.SaveChangesAsync();
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




