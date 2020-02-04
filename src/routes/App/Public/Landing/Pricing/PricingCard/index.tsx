/**
 * @module PricingCard
 */
import _ from 'lodash';
import React from 'react';

import { Wrapper } from '@tg/wrapper';
import { Icon, Headline } from '@tg/elm';
import { Btn } from '@tg/app';
import { IconBeta } from '@tg/resources';

// Styles
import importedStyles from './PricingCard.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	header?: string;
	content?: string;
	footer?: string;
	sale_text?:  string;
	sale_badget?:  string;
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
	 * Sale (add badget or not with additional styling)
	 */
	sale?: boolean;

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
	sale: false,
	onSubmit: _.noop
};

/**
 * Component
 */
export const PricingCard: React.FC<Props> = ({
	children, wrapper, icon, title, desc, price, period, features, submitTitle, onSubmit, className,
	sale
}) => (
	<Wrapper wrapper={ wrapper } styles={ `${ styles.self } ${ className }` }>

		{/* Header */}
		<header className={ styles.header }>
			<Icon icon={ icon } />
			<Headline h={ 3 } variation="public" title={ title } />
			<p>{ desc }</p>

			{/* Special offer */}
			{
				!sale ? null : (
					<div className={ styles.sale_badget }>
						<span><IconBeta /></span>
						<p>{ 'Limited\n price offer' }</p>
					</div>
				)
			}
		</header>

		{/* Content - custom children or predefined structure */}
		{
			children || (
				<section className={ styles.content }>

					{/* Price */}
					<span className={ sale ? styles.sale_text : '' }>
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
