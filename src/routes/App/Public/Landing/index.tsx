/**
 * Landing page (home) route
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import {
	Promo,
	FeaturesIconed,
	ContentSectionPublic,
	FeaturesNumbered,
	Pricing,
	BetaPriceCard,
	ReleaseRoadmap,
	Subscribe,
	Slideshow
} from '@tg/ui';

import { resources } from '@tg/ui/res';

import {
	dataIconedFeatures,
	dataManagingFeatures,
	dataPostsFeatures,
	dataTeamFeatures,
	dataPricing,
	dataPricingFeatures,
	dataBetaPriceCard
} from '../../../../config';

import { subscribeStore } from '../../../../stores';

const styles: Styles = require('./Landing.module.less');

type Styles = {
	self?: string;
	promo?: string;
	promo_features?: string;
	manage_features?: string;
	posts_features?: string;
	team_features?: string;
	pricing?: string;
	slideshow?: string;
	demo?: string;
	roadmap?: string;
	subscribe?: string;
	footer_bg?: string;
};

/**
 * Landing route
 */
const Landing: React.FC<{}> = () => {
	return (
		<>
			<Helmet>
				<title>{ 'Just create and we take care of the rest' }</title>
			</Helmet>

			{/* Content cards */}
			<main>

				{/* Promo */}
				<ContentSectionPublic name="promo" styles={ styles.promo }>
					<img src={ resources.bg_pattern_dots } />
					<Promo subscribeFormStore={ subscribeStore } />
				</ContentSectionPublic>

				{/* Horizontal iconed features */}
				<ContentSectionPublic name="features" styles={ styles.promo_features } >
					<img src={ resources.bg_pattern_dots } />
					<FeaturesIconed features={ dataIconedFeatures } />
				</ContentSectionPublic>

				{/* Slideshow of product screens */}
				<ContentSectionPublic name="slideshow" styles={ styles.slideshow } fullWidth rulers="no">
					<Slideshow images={[resources.sc_slide_01, resources.sc_slide_02, resources.sc_slide_03]} />
				</ContentSectionPublic>

				{/* Vertical list of management features */}
				<ContentSectionPublic name="features_management" rulers="narrow" styles={ styles.manage_features }>
					<img src={ resources.bg_pattern_dots } />
					<FeaturesNumbered features={ dataManagingFeatures }
						title="Managing and scheduling posts"
						desc={ 'Saves time and helps \nauthors to manage channels' }
					/>

					{/* Demo feed */}
					{/* TODO: Swap to a real demo */}
					<div>
						<img src={ resources.il_manage_features } />
					</div>
				</ContentSectionPublic>

				{/* Creating posts */}
				<ContentSectionPublic name="features_posts" styles={ styles.posts_features }>
					<img src={ resources.bg_pattern_dots } />

					{/* TODO: Swap to a real demo */}
					<div className={ styles.demo }>
						<img src={ resources.sc_demo_manage } />
					</div>

					{/* Features */}
					<FeaturesNumbered features={ dataPostsFeatures }
						title="Creating posts"
						desc="Saves time and helps authors to manage channels"
					/>
				</ContentSectionPublic>

				{/* Team work */}
				<ContentSectionPublic name="features_team" styles={ styles.team_features }>
					<img src={ resources.bg_pattern_dots } />

					<FeaturesNumbered features={ dataTeamFeatures }
						title="Work together"
						desc="Collaborate with other channel administrators to create and manage an awesome content"
					/>

					{/* TODO: Swap to a real demo */}
					<div className={ styles.demo }>
						<img src={ resources.sc_demo_team } />
					</div>
				</ContentSectionPublic>

				{/* Pricing */}
				<ContentSectionPublic name="pricing" styles={ styles.pricing }>
					<Pricing offers={ dataPricing } features={ dataPricingFeatures }>
						<BetaPriceCard { ...dataBetaPriceCard } />
					</Pricing>
				</ContentSectionPublic>

				{/* Roadmap */}
				<ContentSectionPublic name="roadmap" styles={ styles.roadmap }>
					<img src={ resources.bg_pattern_dots } />
					<ReleaseRoadmap />
				</ContentSectionPublic>

				{/* Subscription combined with footer */}
				<ContentSectionPublic name="subscription" styles={ styles.subscribe }>
					<Subscribe formStore={ subscribeStore } />
				</ContentSectionPublic>
			</main>
		</>
	);
};

export default Landing;
