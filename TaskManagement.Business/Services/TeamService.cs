using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Channels;
using System.Threading.Tasks;
using TaskManagement.Business.Dtos;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.DBContext;
using TaskManagement.DataAccess.Models;

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

        public async Task<bool> AddTeam(TeamDto request)
        {
            try
            {
                if (request == null || string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Description))
                    return false;
                var team = _mapper.Map<Team>(request);
                if (team != null)
                {
                    team.CreatedAt = DateTime.UtcNow;
                    team.UpdatedAt = DateTime.UtcNow;
                    team.CreatedBy = "System";
                    team.UpdatedBy = "System";
                    await _context.AddAsync<Team>(team);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
            return false;
        }

        public async Task<List<TeamDto>> GetAllTeams()
        {
            var listTeams = await _context.Teams.AsNoTracking().ToListAsync();
            var data = _mapper.Map<List<TeamDto>>(listTeams);
            if (data != null && data.Any())
                return data;
            return data ?? new List<TeamDto>();
        }

        public async Task<List<TeamDto>> GetTeamByName(string name)
        {
            try
            {
                if (name != null)
                {
                    name = name.ToLower().Trim();
                    name.Split(' ');
                }

                var teams = await _context.Teams.AsNoTracking().Where(t => t.Name.Contains(name)).ToListAsync();

                if (teams == null)
                {
                    return null;
                }
                var data = _mapper.Map<List<TeamDto>>(teams);

                return data ?? new List<TeamDto>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}
