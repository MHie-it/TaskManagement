using AutoMapper;
using TaskManagement.Business.Dtos;
using TaskManagement.DataAccess.Models;

namespace TaskManagement.Business.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<TeamDto, Team>();
            CreateMap<Team, TeamDto>();

            CreateMap<UserDto ,User>();
            CreateMap<User, UserDto>();
            CreateMap<AddUserDto, User>();
        }
    }
}
