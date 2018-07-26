/**
 * Landing content component (WTF)
 */
import React from 'react';

import { Btn } from '@tg/ui';

import { staticImagesPath } from '../config';

import { styles } from '../styles/components/Wtf';

/**
 * Landing content component
 */
const Wtf: React.SFC<{}> = () => {
	return (
		<section className={ styles.self }>

			{/* Title */}
			<div className={ styles.title }>
				<div><img src={`${ staticImagesPath }/icon_face_wtf.svg`}/></div>
				<h1>{ 'WTF is this?' }</h1>
			</div>

			{/* Sub title (text) and button next */}
			<div className={ styles.text }>
				<p>
					{
						'Still Confused? We collect a lot answers and cases in FAQ, ' +
						'that can help explain why you need this service.'
					}
				</p>
				<Btn nav type="more" title="Visit FAQ"
					icon={`${ staticImagesPath }/icon_read_more.svg`} iconPos="right"
				/>
			</div>

		</section>
	);
};

export default Wtf;
