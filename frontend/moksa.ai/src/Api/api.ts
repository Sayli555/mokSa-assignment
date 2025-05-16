// frontend/src/api.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const fetchLive = () => axios.get(`${BASE_URL}/live`);
export const fetchHistory = () => axios.get(`${BASE_URL}/history`);
