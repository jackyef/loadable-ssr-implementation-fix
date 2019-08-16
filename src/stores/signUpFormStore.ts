/**
 * Authentication Form store (Auth route)
 */
import { StoreForm, StoreFormAPI } from '@scc/form';

import { service as authService } from '@tg/api-proxy-auth';

// We init this store on global app level (not in Signup.tsx file as we do for login form in Signin.tsx)
// because we need to set its field value (Email) from outside (from Landing GetStarted component)
const apiStore = new StoreFormAPI(authService.axiosInstance);
const store = new StoreForm('auth', null, apiStore);

export default store;
