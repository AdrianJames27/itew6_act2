import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    async list() {
        return api.get('movies/');
    },
    async retrieve(id) {
        return api.get(`movies/${id}/`);
    },
    async create(data) {
        return api.post('movies/', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    async update(id, data) {
        return api.put(`movies/${id}/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    async delete(id) {
        return api.delete(`movies/${id}/`);
    }
}