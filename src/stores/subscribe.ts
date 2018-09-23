/**
 * Contains a basic store for the
 * subscribe form
 */
import { StoreForm, StoreFormAPI } from '@scc/ui-kit';

import { axiosInstance } from '../config';

const apiStore = new StoreFormAPI(axiosInstance);
const store = new StoreForm('subscribe', null, apiStore);

export default store;
