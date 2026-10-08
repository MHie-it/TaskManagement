import api from './api.js'

export const TaskService = {
    getAllTask: async (status) => {
        const response = await api.get('/Task/GetAllTasks', {
            params: status ? { Status: status } : {}
        });
        return response.data;
    },

    addTask: async (task) => {
        const response = await api.post('/Task/AddTask', task);
        return response.data;
    },

    updateTask: async (taskId, task) => {
        const response = await api.put(`/Task/UpdateTask/${taskId}`, task);
        return response.data;
    }

}