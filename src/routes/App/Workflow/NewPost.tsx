/**
 * Create new post route component
 */
import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * New post route
 */
const NewPost: React.SFC<{}> = () => {
	return (
	<>
		<Helmet>
			<title>{ 'Create new post' }</title>
		</Helmet>

		{/* Content */}
		<div>
			{ 'Create new post route' }
		</div>
	</>
	);
};

export default NewPost;
