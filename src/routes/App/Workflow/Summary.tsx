/**
 * Client account summary
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import SummaryGrid, { store } from '../../../components/Workflow/Summary/Grid';

/**
 * Summary route component
 */
const Summary: React.SFC<{}> = () => {
	return (
		<>
			<Helmet>
				<title>{ 'Channel summary' }</title>
			</Helmet>

			{/* Content */}
			<section>
				<SummaryGrid store={ store } />
			</section>
		</>
	);
};

export default Summary;
