import React from 'react';
import { Helmet } from 'react-helmet';

const Test2: React.FC = () => {
	return (
		<>
			<Helmet>
				<title>{ 'Test 2' }</title>
			</Helmet>

			<div>{ 'Test 2' }</div>
		</>
	);
};

export default Test2;
