/**
 * Authentication Form store (Auth route)
 */
import { StoreForm, StoreFormAPI } from '@scc/ui-kit';

import { api } from '@tg/ui/config';

const apiStore = new StoreFormAPI(api.auth.proxy);
const store = new StoreForm('auth', null, apiStore);

export default store;
