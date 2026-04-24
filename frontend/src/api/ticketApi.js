import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tickets';

export const ticketApi = {
    createTicket: async (data) => {
        const response = await axios.post(API_URL, data);
        return response.data;
    },
    
    getTicket: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    listTickets: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    assignTicket: async (id, technician) => {
        const response = await axios.post(`${API_URL}/${id}/assign`, { technician });
        return response.data;
    },

    startDiagnosis: async (id) => {
        const response = await axios.post(`${API_URL}/${id}/start-diagnosis`);
        return response.data;
    },

    escalateTicket: async (id, reason) => {
        const response = await axios.post(`${API_URL}/${id}/escalate`, { reason });
        return response.data;
    },

    resolveTicket: async (id, solution) => {
        const response = await axios.post(`${API_URL}/${id}/resolve`, { solution });
        return response.data;
    },

    closeTicket: async (id) => {
        const response = await axios.post(`${API_URL}/${id}/close`);
        return response.data;
    },

    reopenTicket: async (id, reason) => {
        const response = await axios.post(`${API_URL}/${id}/reopen`, { reason });
        return response.data;
    },

    cancelTicket: async (id, reason) => {
        const response = await axios.post(`${API_URL}/${id}/cancel`, { reason });
        return response.data;
    }
};
