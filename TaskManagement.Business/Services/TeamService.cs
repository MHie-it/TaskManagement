using AutoMapper;
using TaskManagement.Business.Dtos;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.Models;
using TaskManagement.DataAccess.Repositories;

namespace TaskManagement.Business.Services
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IMapper _mapper;

        public TeamService(ITeamRepository teamRepository, IMapper mapper)
        {
            _teamRepository = teamRepository;
            _mapper = mapper;
        }

        public async Task<bool> AddTeamAsync(TeamDto request)
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
                    
                    await _teamRepository.SaveChangesAsync(team);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
            return false;
        }

        public async Task<List<TeamDto>> GetAllTeamsAsync()
        {
            var listTeams = await _teamRepository.GetTeamsAsync();
            var data = _mapper.Map<List<TeamDto>>(listTeams);
            if (data != null && data.Any())
                return data;
            return data ?? new List<TeamDto>();
        }

        public async Task<List<TeamDto>> GetTeamByNameAsync(string name)
        {
            try
            {
                if (name != null)
                {
                    name = name.ToLower().Trim();
                    name.Split(' ');
                }

                var teams = await _teamRepository.GetTeamByNameAsync(name); 

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
