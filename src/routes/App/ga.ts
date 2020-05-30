import _ from 'lodash';
import ReactGA from 'react-ga';
import { History, Location } from 'history';

// https://www.freecodecamp.org/news/performance-and-user-tracking-in-react-with-google-analytics/
// Pages views
export const trackPageView = (history?: History, location?: Location): void => {

	// Generic URLs
	const _location = location || (history && history.location);
	// TODO: Remove from here to tg-app-drafts and adjust
	if (_.includes(_location.pathname, '/draft/')) {
		const base = _.split(_location.pathname, '/')[1];
		const sub = _.split(_location.pathname, '/')[3];
		const urlToTrack = `${ base }/${ sub }`;
		ReactGA.pageview(urlToTrack);
	}

	// Simple URLs
	else {
		ReactGA.set({ page: _location.pathname });
		ReactGA.pageview(_location.pathname);
	}
};

// Init GA
export const initGA = (history: History): void => {
	ReactGA.initialize('UA-154953218-1', {
		// Uncomment if you need to debug
		// NB: Do not swt it to "true" implicitly in order
		// not to deploy it by accident
		// debug: process.env.NODE_ENV === 'development'
	});
	trackPageView(history);
	history.listen(location => trackPageView(null, location));
};
