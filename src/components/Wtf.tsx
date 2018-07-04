/**
 * Landing content component (WTF)
 */
import React from 'react';

import { BtnNav } from '@scc/scc-ui-kit';

import { staticImagesPath } from '../config';

import modules from '@tg/ui/lessmodules';
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
				<BtnNav title="Visit FAQ" styles={{ theme: modules.btn.more }}
					icon={`${ staticImagesPath }/icon_read_more.svg`} iconPos="right"
				/>
			</div>

		</section>
	);
};

export default Wtf;
