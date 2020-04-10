/**
 * @module PricingCard
 */
import _ from 'lodash';
import React from 'react';

import { Button, Icon, Heading, Paragraph, Flex, Text } from '@tg/elm';
import { IconBeta } from '@tg/resources';

import {
	StyledContainer,
	StyledHeader,
	StyledFeaturesList,
	StyledFeature,
	StyledBetaContainer,
	StyledBetaIcon
} from './_styled';

export type Props = {

	children?: any;

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
		iconScale?: number;
		title?: string;
	}>;

	/**
	 * Action button title
	 */
	submitTitle?: string;

	/**
	 * Variant
	 */
	variant?: 'light' | 'dark';

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
	variant: 'light',
	sale: false,
	onSubmit: _.noop
};

/**
 * Component
 */
export const PricingCard: React.FC<Props> = ({
	children,
	title,
	desc,
	price,
	period,
	features,
	submitTitle,
	onSubmit,
	className,
	variant,
	sale
}) => (
	<StyledContainer variant={ variant } className={ className }>

		{/* Header */}
		<StyledHeader variant={ variant }>
			<Heading h={ 3 } mt={ 5 }
				title={ title }
				color={ variant === 'dark' ? 'white_100' : 'black_80' }
			/>
			<Paragraph size={ 18 }
				color={ variant === 'dark' ? 'blue_20_opaque' : 'blue_30' }
			>
				{ desc }
			</Paragraph>

			{/* Special offer */}
			{
				!sale ? null : (
					<StyledBetaContainer>
						<StyledBetaIcon>
							<IconBeta />
						</StyledBetaIcon>
						<Text centered size={ 13 } mt={ 2 } color="blue_100">
							{ 'Limited offer' }
						</Text>
					</StyledBetaContainer>
				)
			}
		</StyledHeader>

		{/* Content - custom children or predefined structure */}
		{
			children || (
				<Flex as="section" dir="column" align="center">

					{/* Price */}
					<Flex as="span" align="flex-end" mt={ 6 }>
						<Heading h={ 1 } color="blue_150">
							{ parseFloat(price as string) || price === 0 ? `$${ price }` : price }
						</Heading>
						<Paragraph color="blue_30" pb={ 2 } pl={ 2 }>
							{ period !== '' && `/ ${ period }` }
						</Paragraph>
					</Flex>

					{/* Features */}
					<StyledFeaturesList>
						{
							_.map(features, ({ icon, iconScale, title }) => (
								<StyledFeature key={ title }>
									<Icon mr={ 3 } width={ '12px' }
										color="blue_30"
										icon={ icon }
										scale={ iconScale }
									/>
									<Paragraph size={ 14 } color="blue_30">
										{ title }
									</Paragraph>
								</StyledFeature>
							))
						}
					</StyledFeaturesList>
				</Flex>
			)
		}

		{/* Footer */}
		<Flex as="footer" justify="center" width="100%" mt={ 7 }>
			<Button variant={ variant === 'dark' ? 'secondary' : 'primary' }
				size="big"
				width="100%"
				detail="rounded"
				title={ submitTitle }
				onClick={ () => onSubmit() }
			/>
		</Flex>

	</StyledContainer>
);

PricingCard.defaultProps = defaultProps;
