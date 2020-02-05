/**
 * List of features where you can select one of them
 * in order to see some additional visual content that
 * describes selected feature
 * @module FeaturesSwitcher
 */
import _ from 'lodash';
import React, { useState, useEffect } from 'react';

import { Icon, Headline } from '@tg/elm';

// Styles
import importedStyles from './FeaturesSwitcher.module.less';
const styles: Styles = importedStyles;

type Styles = {
	feature?: string;
	active?: string;
	desc?: string;
	header?: string;
	h_text?: string;
};

export type Feature = {
	title?: string;
	desc?: string;
	icon?: JSX.Element;
};

type Props = {

	/**
	 * Features
	 */
	features?: Feature[];

	/**
	 * Currently active feature
	 */
	active?: number;

	/**
	 * On switching between items
	 */
	onSwitch?: (index: number) => void;

	/**
	 * Styles
	 */
	className?: string;
};

const defaultProps: Partial<Props> = {
	active: 1,
	className: '',
	onSwitch: _.noop
};

/**
 * Component
 */
export const FeaturesSwitcher: React.FC<Props> = ({ features, onSwitch, className, active: activeProp }) => {

	// Active feature
	const [active, setActive] = useState<number>(activeProp);

	// Reset active feature from changed prop
	useEffect(() => { setActive(activeProp); }, [activeProp]);

	// Render
	return (
		<ul className={ className }>
			{
				_.map(features, ({ title, desc, icon }, index) => {
					const current = index + 1;
					return (
						<li key={ title } onClick={ () => { setActive(current); onSwitch(current); } }
							className={ `
								${ styles.feature }
								${ current === active ? styles.active : '' }
							` }
						>
							<header className={ styles.header }>
								<Icon icon={ icon } />
								<Headline h={ 4 } title={ title } styles={ styles.h_text } />
							</header>
							<p className={ styles.desc }>{ desc }</p>
						</li>
					);
				})
			}
		</ul>
	);
};

FeaturesSwitcher.defaultProps = defaultProps;
