import api from './api.js'

export const UserService = {
    getAllUser: async () => {
        const response = await api.get('/User/GetAllUsers')
        return response.data
    },

    getUserById: async (userId) => {
        const response = await api.get(`/User/GetUserById/${userId}`)
        return response.data
    },

    addUser: async (user) => {
        const response = await api.post('/User/RegisterUser', user)
        return response.data
    },

    getAllUserByTeam: async (teamId) => {
        const response = await api.get('/User/GetAllUserByTeam', {
            params: { teamid: teamId },
        })
        return response.data
    },

    updateUser: async (userId, user) => {
        const response = await api.put(`/User/UpdateUser/${userId}`, user)
        return response.data
    },

    deleteUser: async (userId) => {
        const response = await api.put('/User/DeleteUser', null, {
            params: { userId },
        })
        return response.data
    },
}