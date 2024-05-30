import axios from 'axios';

const API_BASE_URL = 'https://servers.sanboxes.soulharsh007.dev';
const API_TOKEN = '9cea5f50-7058-49d2-85fd-14373aaa4c80';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
    }
});

export const fetchProjects = async () => {
    try {
        const response = await api.get('/api/projects');
        console.log(response, "response")
        return response.data;

    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};

export default api;
