/**
 * Landing content component (WTF)
 */
import React from 'react';

import { BtnNav } from '@scc/scc-ui-kit';

import { styles } from '../../styles/components/Blocks/Wtf';

/**
 * Landing content component
 */
const Wtf: React.SFC<{}> = () => {
	return (
		<section className={ styles.self }>

			{/* Title */}
			<div className={ styles.title }>
				<div><img src="/static/public/images/icon_face_wtf.svg"/></div>
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
				<BtnNav title="Visit FAQ" icon="/static/public/images/icon_read_more.svg" iconPos="right" />
			</div>

		</section>
	);
};

export default Wtf;