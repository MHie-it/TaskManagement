export const MOCK_TEAMS = [
  {
    TeamId: 1,
    Name: 'Frontend Team',
    Description: 'Responsible for developing user interfaces using React and Tailwind CSS.',
  },
  {
    TeamId: 2,
    Name: 'Backend Team',
    Description: 'Develops RESTful APIs, business logic, and database integration using ASP.NET Core.',
  },
  {
    TeamId: 3,
    Name: 'QA Team',
    Description: 'Ensures software quality through manual and automated testing.',
  },
  {
    TeamId: 4,
    Name: 'DevOps Team',
    Description: 'Manages CI/CD pipelines, deployment, monitoring, and cloud infrastructure.',
  },
  {
    TeamId: 5,
    Name: 'UI/UX Team',
    Description: 'Designs intuitive user experiences and modern user interfaces.',
  },
]

export const MOCK_USERS = [
  {
    UserId: 1,
    RoleId: 1,
    TeamId: 1,
    UserName: 'johndoe',
    FullName: 'John Doe',
    Email: 'john.doe@example.com',
  },
  {
    UserId: 2,
    RoleId: 2,
    TeamId: 1,
    UserName: 'janesmith',
    FullName: 'Jane Smith',
    Email: 'jane.smith@example.com',
  },
  {
    UserId: 3,
    RoleId: 2,
    TeamId: 2,
    UserName: 'michaellee',
    FullName: 'Michael Lee',
    Email: 'michael.lee@example.com',
  },
  {
    UserId: 4,
    RoleId: 2,
    TeamId: 2,
    UserName: 'emilytran',
    FullName: 'Emily Tran',
    Email: 'emily.tran@example.com',
  },
  {
    UserId: 5,
    RoleId: 2,
    TeamId: 3,
    UserName: 'davidpham',
    FullName: 'David Pham',
    Email: 'david.pham@example.com',
  },
  {
    UserId: 6,
    RoleId: 2,
    TeamId: 3,
    UserName: 'sophianguyen',
    FullName: 'Sophia Nguyen',
    Email: 'sophia.nguyen@example.com',
  },
  {
    UserId: 7,
    RoleId: 2,
    TeamId: 4,
    UserName: 'williamho',
    FullName: 'William Ho',
    Email: 'william.ho@example.com',
  },
  {
    UserId: 8,
    RoleId: 2,
    TeamId: 4,
    UserName: 'oliviale',
    FullName: 'Olivia Le',
    Email: 'olivia.le@example.com',
  },
  {
    UserId: 9,
    RoleId: 2,
    TeamId: 5,
    UserName: 'danielvu',
    FullName: 'Daniel Vu',
    Email: 'daniel.vu@example.com',
  },
  {
    UserId: 10,
    RoleId: 2,
    TeamId: 5,
    UserName: 'gracepham',
    FullName: 'Grace Pham',
    Email: 'grace.pham@example.com',
  },
]

export function buildTeamsWithMembers(teams, users) {
  return teams.map((team) => ({
    teamId: team.TeamId,
    name: team.Name,
    description: team.Description,
    memberCount: users.filter((user) => user.TeamId === team.TeamId).length,
  }))
}

export function getUsersByTeamId(users, teamId) {
  return users.filter((user) => user.TeamId === teamId)
}

export function buildTeamStats(teams, users) {
  const teamsWithMembers = buildTeamsWithMembers(teams, users)
  const memberCounts = teamsWithMembers.map((team) => team.memberCount)

  return {
    totalTeams: teams.length,
    totalMembers: users.length,
    avgMembers: teams.length ? Math.round(users.length / teams.length) : 0,
    largestTeam: memberCounts.length ? Math.max(...memberCounts) : 0,
  }
}
