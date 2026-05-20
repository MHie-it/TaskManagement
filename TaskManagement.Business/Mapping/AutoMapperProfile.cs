using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
        }
    }
}
