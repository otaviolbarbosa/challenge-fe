import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const axiosInstance = () => {
    return axios.create({
        baseURL: REACT_APP_API_URL
    });
}

export const api = axiosInstance();