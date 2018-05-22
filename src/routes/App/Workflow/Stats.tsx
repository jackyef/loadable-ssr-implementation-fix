/**
 * Main statistics route component
 */
import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Statistics route
 */
const Stats: React.SFC<{}> = () => {
	return (
	<>
		<Helmet>
			<title>{ 'Statistics' }</title>
		</Helmet>

		{/* Content */}
		<div>
			{ 'Statistics route' }
		</div>
	</>
	);
};

export default Stats;
