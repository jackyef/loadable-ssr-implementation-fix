/**
 * Authentication Form store (Auth route)
 */
import { StoreForm, StoreFormAPI } from '@scc/form';

import { service as authService } from '@tg/api-proxy-auth';

const apiStore = new StoreFormAPI(authService.axiosInstance);
const store = new StoreForm('auth', null, apiStore);

export default store;
