/**
 * Authentication Form store (Auth route)
 */
import { axiosInstance } from '../config';
import { FormStore, FormStoreAPI } from '@scc/scc-ui-kit';

const apiStore = new FormStoreAPI(axiosInstance);
const store = new FormStore('auth', null, apiStore);

export default store;
