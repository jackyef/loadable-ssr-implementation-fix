/**
 * @module PricingCard
 */
import _ from 'lodash';
import React from 'react';

import { Icon, Wrapper } from '@scc/elm';

import { Btn, Headline } from '@tg/elm';

// Styles
import importedStyles from './PricingCard.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	header?: string;
	content?: string;
	footer?: string;
};

export type Props = {

	children?: any;

	/**
	 * Wrapper tag for card block
	 */
	wrapper?: string;

	/**
	 * Icon
	 */
	icon?: React.ReactElement | string;

	/**
	 * Title
	 */
	title?: string;

	/**
	 * Description
	 */
	desc?: string;

	/**
	 * Price $
	 */
	price?: number | string;

	/**
	 * Period (month)
	 */
	period?: string;

	/**
	 * Features list
	 */
	features?: Array<{
		icon?: React.ReactElement | string;
		title?: string;
	}>;

	/**
	 * Action button title
	 */
	submitTitle?: string;

	/**
	 * On submit action
	 */
	onSubmit?: (data?: any) => void;

	/**
	 * Custom user styles
	 */
	className?: string;
};

const defaultProps: Partial<Props> = {
	period: 'month',
	className: '',
	wrapper: 'li',
	onSubmit: _.noop
};

/**
 * Component
 */
export const PricingCard: React.FC<Props> = ({
	children, wrapper, icon, title, desc, price, period, features, submitTitle, onSubmit, className
}) => (
	<Wrapper wrapper={ wrapper } styles={ `${ styles.self } ${ className }` }>

		{/* Header */}
		<header className={ styles.header }>
			<Icon icon={ icon } />
			<Headline h={ 3 } variation="public" title={ title } />
			<p>{ desc }</p>
		</header>

		{/* Content - custom children or predefined structure */}
		{
			children || (
				<section className={ styles.content }>

					{/* Price */}
					<span>
						{parseFloat(price as string) || price === 0 ? `$${ price }` : price}
						<span>{period !== '' && `/ ${ period }`}</span>
					</span>

					{/* Features */}
					<ul >
						{
							_.map(features, ({ icon, title }) => (
								<li key={ title }>
									<Icon icon={ icon } />
									<span>{ title }</span>
								</li>
							))
						}
					</ul>
				</section>
			)
		}

		{/* Footer */}
		<footer className={ styles.footer }>
			<Btn style={ { main: 'general', size: 'big', detail: 'rounded' } }
				title={ submitTitle }
				onClick={ () => onSubmit() }
			/>
		</footer>

	</Wrapper>
);

PricingCard.defaultProps = defaultProps;
