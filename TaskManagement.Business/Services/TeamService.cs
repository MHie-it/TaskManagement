using AutoMapper;
using Microsoft.Extensions.Logging;
using TaskManagement.Business.Dtos;
using TaskManagement.Business.Helpers;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.Models;
using TaskManagement.DataAccess.Repositories;

namespace TaskManagement.Business.Services
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<TeamService> _logger;

        public TeamService(ITeamRepository teamRepository, IUserRepository userRepository, IMapper mapper, ILogger<TeamService> logger)
        {
            _teamRepository = teamRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<bool?> AddTeamAsync(TeamDto request)
        {
            try
            {
                if (request == null || string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Description))
                {
                    _logger.LogWarning("Invalid team data provided.");
                    throw new ArgumentNullException(nameof(request));
                }

                var team = _mapper.Map<Team>(request);

                team.CreateAudit("System");
                var addTeam = await _teamRepository.AddTeamAsync(team);
                _logger.LogInformation("Team '{TeamName}' added successfully.", team.Name);

                return addTeam;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding team.");
                throw;
            }
        }

        public async Task<List<TeamDto>> GetAllTeamsAsync()
        {
            var listTeams = await _teamRepository.GetTeamsAsync();
            var data = _mapper.Map<List<TeamDto>>(listTeams);
            if (data != null && data.Any())
            {
                _logger.LogInformation("Retrieved {TeamCount} teams successfully.", data.Count);
                return data;
            }
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
                    throw new KeyNotFoundException("Team not found.");
                }
                var data = _mapper.Map<List<TeamDto>>(teams);

                return data ?? new List<TeamDto>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving team by name.");
                throw;
            }
        }

        public async Task<bool?> AddMemberAsync(int UserId, AddUserToTeamDto request)
        {
            try
            {
                var team = await _teamRepository.GetTeamByIdAsync(request.TeamId);
                if (team == null)
                {
                    _logger.LogWarning("Team not found.");
                    throw new KeyNotFoundException("Team not found.");
                }

                var user = await _userRepository.GetUserByIdAsync(UserId);
                if (user == null)
                {
                    _logger.LogWarning("User not found.");
                    throw new KeyNotFoundException("User not found.");
                }

                var checkUserInTeam = await _teamRepository.GetMemberToTeamAsync(request.TeamId, UserId);
                if (checkUserInTeam == true)
                {
                    _logger.LogWarning("User is already a member of the team.");
                    throw new InvalidOperationException("User is already a member of the team.");
                }

                user.TeamId = request.TeamId;
                AuditHelper.SetUpdateAudit(user, user.UserName);
                var result = await _userRepository.UpdateUserAsync(user);

                _logger.LogInformation("User '{UserName}' added to team '{TeamName}' successfully.", user.UserName, team.Name);
                return result;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding member to team.");
                throw;
            }
        }
    }
}
