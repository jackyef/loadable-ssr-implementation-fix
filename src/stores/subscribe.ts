/**
 * Contains a basic store for the
 * subscribe form
 */
import axios from 'axios';

import { StoreForm, StoreFormAPI } from '@scc/form';

const apiStore = new StoreFormAPI(axios.create());
const store = new StoreForm('subscribe', null, apiStore);

export default store;
