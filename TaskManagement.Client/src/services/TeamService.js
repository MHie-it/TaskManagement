import api from './api.js'
export const TeamService = {
    getAllTeam: async () => {
        const response = await api.get('/Team/GetAllTeams');
        return response.data;
    },

    getTeamByName: async (name) => {
        const response = await api.get('/Team/GetTeamByName',
            {
                params: {
                    request: name
                }
            })
        return response.data;
    },

    addTeam: async (team) => {
        const response = await api.post("/Team/AddTeam", team);
        return response.data;
    },

    updateTeam: async (teamId, team) => {
        const response = await api.put(
            `/Team/UpdateTeam`,
            team,
            {
                params: {
                    TeamId: teamId
                }
            }
        );
        return response.data;
    }

};