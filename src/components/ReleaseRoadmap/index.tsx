/**
 * Beta to Release roadmap illustration
 * @module ReleaseRoadmap
 */
import _ from 'lodash';
import React from 'react';

import { Icon, Wrapper } from '@scc/ui-kit';
import { Headline } from '@tg/ui';

import images from '../../../resources';

const styles: Styles = require('./ReleaseRoadmap.module.less');

type Styles = {
	top?: string;
	roadmap?: string;
	timeline?: string;
	steps?: string;
	step?: string;
	step__normal?: string;
	step__reverse?: string;
};

type Props = {};

const defaultProps: Partial<Props> = {};

/**
 * Helper component to render step
 */
const Step: React.SFC<{ wrapper?: string; period: string; name: string; features: string[]; reverse?: boolean; }> = ({
	wrapper, period, name, features, reverse
}) => (
	<Wrapper wrapper={ wrapper || 'li' }
		styles={`${ styles.step } ${ reverse ? styles.step__reverse : styles.step__normal }`}
	>
		<span>{ period }</span>
		<span>{ name }</span>
		<ul>
			{ _.map(features, (feature, index) => <li key={ index }>{ feature }</li>) }
		</ul>
	</Wrapper>
);

/**
 * Component
 */
const ReleaseRoadmap: React.SFC<Props> = ({}) => {
	return (
		<>

			{/* Top */}
			<div className={ styles.top }>
				<Headline h={2} color="on-primary" title={ '2018 Roadmap \nand bonuses' } />
				<p>{`We continue to develop our tools and products.\nSubscribe and gives us feedback about what you think and feel`}</p>
			</div>

			{/* Roadmap */}
			<div className={ styles.roadmap }>

				{/* Timeline */}
				<div className={ styles.timeline }>
					<span/>
					<em>{ 'We are here' }</em>
					<span/>
					<span/>
					<Icon icon={ images.icon_plane } />
				</div>

				{/* Steps */}
				<ul className={ styles.steps }>

					{/* Subscription */}
					<Step wrapper="li" period="SEP - OCT" name="Subscription"
						features={[
							'First public launch',
							'Extra bonuses provided'
						]}
					/>

					{/* Beta */}
					<li>
						<Step reverse wrapper="div" period="OCT - NOV" name="Beta period"
							features={[
								'Welcome to the product',
								'Extra bonuses provided'
							]}
						/>

						<div>
							<Icon icon={ images.icon_star }/>
							<span>{ 30 }</span>
							<span>{ 'days\nfree trial' }</span>
						</div>
					</li>

					{/* Release */}
					<Step wrapper="li" period="DECEMBER" name="Public Release"
						features={[
							'All data from beta period will be saved',
							'All bonuses still working'
						]}
					/>
				</ul>

			</div>

		</>
	);
};

ReleaseRoadmap.defaultProps = defaultProps;

export default ReleaseRoadmap;
