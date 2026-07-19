import api from './api.js'

export const TaskService = {
    getAllTask: async () => {
        const response = await api.get('/Task/GetAllTasks');
        return response.data;
    },

    addTask: async (task) => {
        const response = await api.post('/Task/AddTask', task);
        return response.data;
    },

    updateTask: async (taskId, task) => {
        const response = await api.put('/Task/UpdateTask', task, {
            params: { Id : taskId }
        });
        return response.data;
    }

}