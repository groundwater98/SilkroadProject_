import axios, { CreateAxiosDefaults } from 'axios';
import { API_URL } from 'config';

export const fetchClient = (config?: CreateAxiosDefaults) =>
  axios.create({
    baseURL: API_URL,
    ...config,
  });
