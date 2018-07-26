/**
 * Landing page info section for Poster product
 */
import React from 'react';

import { Btn } from '@tg/ui';

import { routes, staticImagesPath } from '../config';

import { styles } from '../styles/components/Poster';

/**
 * Poster short information content block
 */
const Poster: React.SFC<{}> = () => {
	return(
		<section className={ styles.self }>

			{/* Scroll */}
			<div className={ styles.scroll }>
				<img src={`${ staticImagesPath }/icon_read_more.svg`} />
			</div>

			{/* Header */}
			<header className={ styles.header }>
				<div>
					<div><img src={`${ staticImagesPath }/icon_poster.svg`} /></div>
					<h1>{ 'Poster' }</h1>
				</div>
			</header>

			{/* Intro */}
			<div className={ styles.intro }>
				<p>{ 'Spend less time writing and posting to Telegram and more \ntime growing your channel.' }</p>
				<Btn nav type="more" url={ routes.poster } title="About Poster"
					icon={`${ staticImagesPath }/icon_read_more.svg`} iconPos="right"
				/>
			</div>

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

			{/* Demo */}
			<div className={ styles.demo } />

			{/* Footer */}
			<footer className={ styles.footer } >
				<p>{ 'Poster Telegram App provides the tools to help every channel unleash their full potential.' }</p>
				<Btn nav type="general" url={ routes.auth.signup } title="Get Started"
					icon={`${ staticImagesPath }/icon_read_more.svg`} iconPos="right"
				/>
			</footer>

		</section>
	);
};

export default Poster;
