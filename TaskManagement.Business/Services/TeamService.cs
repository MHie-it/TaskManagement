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
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public TeamService(ITeamRepository teamRepository, IUserRepository userRepository, IMapper mapper)
        {
            _teamRepository = teamRepository;
            _userRepository = userRepository;
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

        public async Task<bool?> AddMemberAsync(int UserId,AddUserToTeamDto request)
        {
            try
            {
                var team = await _teamRepository.GetTeamByIdAsync(request.TeamId);
                if (team == null)
                {
                    Console.WriteLine("Team not found !!");
                    return false;
                }

                var user = await _userRepository.GetUserByIdAsync(UserId);
                if (user == null)
                {
                    Console.WriteLine("User not found !!");
                    return false;
                }

                var checkUserInTeam = await _teamRepository.GetMemberToTeamAsync(request.TeamId, UserId);
                if (checkUserInTeam == true)
                {
                    Console.WriteLine("User is already a member of the team !!");
                    return false;
                }

                if (user != null)
                {
                    user.TeamId = request.TeamId;
                    user.UpdatedAt = DateTime.UtcNow;
                    user.UpdatedBy = user.UserName;
                    await _userRepository.UpdateUserV2Async(user);
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
