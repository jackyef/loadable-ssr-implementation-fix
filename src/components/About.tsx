/**
 * About content landing block
 */
import React from 'react';

import { BtnNav } from '@scc/scc-ui-kit';

import { routes, staticImagesPath } from '../config';

import { styles } from '../styles/components/About';

/**
 * About component
 */
const About: React.SFC<{}> = () => {
	return (
		<section className={ styles.self }>
			<h1>{ 'About' }</h1>
			<p>{ 'We are small team try to improve advertising and communication through people in Telegram App.' }</p>
			<BtnNav title="Contact Us" url={ routes.faq }
				icon={`${ staticImagesPath }/icon_read_more.svg`} iconPos="right"
			/>
		</section>
	);
};

export default About;
