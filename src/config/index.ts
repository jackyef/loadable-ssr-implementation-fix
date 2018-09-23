import { ContextType } from '@tg/ui/config';

import { notifyStore } from '../stores';
import { axiosInstance } from './api';

export { axiosInstance, botName } from './api';
export { appContainerHTMLTag } from './base';
export { routes, indexRoute } from './routes';

export { headerNav, footerNav } from './nav';
export {
	dataIconedFeatures,
	dataManagingFeatures,
	dataPostsFeatures,
	dataTeamFeatures,
	dataPricing,
	dataPricingFeatures,
	dataBetaPriceCard
} from './data';

export const context: ContextType = {
	notify: notifyStore,
	axiosInstance
};
