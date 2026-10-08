using AutoMapper;
using TaskManagement.Business.Dtos;
using TaskManagement.DataAccess.Models;
using Task = TaskManagement.DataAccess.Models.Task;

namespace TaskManagement.Business.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<TeamDto, Team>();
            CreateMap<Team, TeamDto>();

            CreateMap<UserDto, User>();
            CreateMap<User, UserDto>();
            CreateMap<AddUserDto, User>()
                .ForMember(dest => dest.Gende, opt => opt.MapFrom(src => src.Gende ?? src.Gender));
            CreateMap<AddUserToTeamDto, User>();
            CreateMap< User, AddUserToTeamDto>();

            CreateMap<TaskDto, Task>(); 
            CreateMap<Task, TaskDto>();
            CreateMap<Task, ListTaskDto>();
        }
    }
}
