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
    public class TeamService : ITeamService
    {
        private readonly TaskManagementDBContext _context;
        private readonly IMapper _mapper;

        public TeamService(TaskManagementDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<TeamDto>> GetAllTeams()
        {
            var listTeams = await _context.Teams.AsNoTracking().ToListAsync();
            var data =  _mapper.Map<List<TeamDto>>(listTeams);
            if (data != null && data.Any())
                return data;
            return data ?? new List<TeamDto>();
        }

        public Task<TeamDto> GetTeamById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
