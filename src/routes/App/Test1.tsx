import React from 'react';
import { Helmet } from 'react-helmet';

const Test1: React.FC = () => {
	return (
		<>
			<Helmet>
				<title>{ 'Test 1' }</title>
			</Helmet>

			<div>{ 'Test 1' }</div>
		</>
	);
};

export default Test1;
