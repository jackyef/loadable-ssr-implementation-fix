import axios from 'axios';

import { BASE_API_URL } from '@tg/ui/config';

/**
 * App axios instance
 */
export const axiosInstance = axios.create({
	baseURL: BASE_API_URL
});
