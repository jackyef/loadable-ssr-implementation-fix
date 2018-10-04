import axios from 'axios';

import { baseAPIUrl } from '@tg/ui/config';

/**
 * App axios instance
 */
export const axiosInstance = axios.create({
	baseURL: baseAPIUrl
});
