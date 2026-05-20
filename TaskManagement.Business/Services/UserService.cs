using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Business.Dtos;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.DBContext;

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

        public Task<string?> RegisterUser(AddUserDto request)
        {
            throw new NotImplementedException();
        }
    }
}
