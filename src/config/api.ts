import axios from 'axios';

// Bot name
export const botName = 'TgCreditsBot';

/**
 * App axios instance
 */
export const axiosInstance = axios.create({
	baseURL: '/api'
});
