/**
 * Landing market content component
 */
import React from 'react';

import { Btn } from '@scc/scc-ui-kit';

import { styles } from '../styles/components/Market';

/**
 * Landing content component
 */
const Market: React.SFC<{}> = () => {
	return (
		<section className={ styles.self }>

			{/* Left */}
			<div className={ styles.left }>

				{/* Title */}
				<div className={ styles.title }>
					<div><img src="/static/public/images/icon_market.svg" /></div>
					<h1>{ 'Market' }</h1>
					<span>{ 'Soon' }</span>
				</div>

				{/* Text */}
				<div className={ styles.text }>
					<p>{ 'Simpe Service for advertising  in Telegram channels. Buy and sell posts in marketplace.' }</p>
					<span>{ 'Don\'t miss the start. We inform you, when you can test our new product.' }</span>
				</div>

				{/* Form to subscribe to release */}
				<form method="GET" className={ styles.form }>
					<input type="email" placeholder="Enter your email" />
					<Btn submit title="Subscribe" />
				</form>
			</div>

			{/* Preview */}
			<div className={ styles.preview } />

			{/* Features */}
			<ul className={ styles.features }>
				<li>
					<h2>{ '01' }</h2>
					<p>{ 'Intuitive and easy to use, you can start scheduling Instagram posts in minutes' }</p>
				</li>
				<li>
					<h2>{ '02' }</h2>
					<p>{ 'Preview your feed before you post to create a beautiful Instagram aesthetic' }</p>
				</li>
				<li>
					<h2>{ '03' }</h2>
					<p>{ 'No notifications required! Auto Publish is available for Instagram business profiles' }</p>
				</li>
			</ul>

		</section>
	);
};

export default Market;
