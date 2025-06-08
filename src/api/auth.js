import axios from 'axios';
import { getToken, saveId, saveSicilNo, saveToken } from '../utils/storage';

const BASE_URL = 'http://localhost:8080';

export async function login(sicilNo, password) {
    const response = await axios.post(`${BASE_URL}/api/auth/signin`, {
        sicilNo,
        password,
    });
    
    saveId(response.data.id);
    saveSicilNo(response.data.sicilNo);
    saveToken(response.data.tokenType, response.data.accessToken);
    
    console.log('Login response:', response);

    return response.data;
}

export async function getCurrentPersonnel() {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/api/personel/me`, {
        headers: { Authorization: token },
    });
    return response.data;
}

export async function getCities() {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/api/cities`, {
        headers: { Authorization: token },
    });
    return response.data;
}

export async function getRelocations(personnelId) {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/api/personel/${personnelId}/relocations`, {
        headers: { Authorization: token },
    });
    return response.data;
}

export async function createRelocation(data) {
    const token = getToken();
    const response = await axios.post(`${BASE_URL}/api/personel/relocation`, data, {
        headers: { Authorization: token },
    });
    return response.data;
}
