/**
 * Authentication Form store (Auth route)
 */
import { axiosInstance } from '../config';
import { StoreForm, StoreFormAPI } from '@scc/ui-kit';

const apiStore = new StoreFormAPI(axiosInstance);
const store = new StoreForm('auth', null, apiStore);

export default store;
