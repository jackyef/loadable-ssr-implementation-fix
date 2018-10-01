/**
 * Landing page (home) route
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import {
	Promo,
	FeaturesIconed,
	ContentSection,
	FeaturesNumbered,
	Pricing,
	BetaPriceCard,
	ReleaseRoadmap,
	Subscribe,
	Footer,
	Slideshow
} from '../../../../components';

import {
	dataIconedFeatures,
	dataManagingFeatures,
	dataPostsFeatures,
	dataTeamFeatures,
	dataPricing,
	dataPricingFeatures,
	dataBetaPriceCard,
	footerNav
} from '../../../../config';

import images from '../../../../../resources';

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
const Index: React.SFC<{}> = () => {
	return (
		<>
			<Helmet>
				<title>{ 'Just create and we take care of the rest' }</title>
			</Helmet>

			{/* Content cards */}
			<main>

				{/* Promo */}
				<ContentSection styles={ styles.promo }>
					<img src={ images.bg_pattern_dots } />
					<Promo />
				</ContentSection>

				{/* Horizontal iconed features */}
				<ContentSection styles={ styles.promo_features } >
					<img src={ images.bg_pattern_dots } />
					<FeaturesIconed features={ dataIconedFeatures } />
				</ContentSection>

				{/* Slideshow of product screens */}
				<ContentSection styles={ styles.slideshow } rulers="no">
					<Slideshow images={[images.slide_01, images.slide_02, images.slide_03]} />
				</ContentSection>

				{/* Vertical list of management features */}
				<ContentSection rulers="narrow" styles={ styles.manage_features }>
					<img src={ images.bg_pattern_dots } />
					<FeaturesNumbered features={ dataManagingFeatures }
						title="Managing and scheduling posts"
						desc={ 'Saves time and helps \nauthors to manage channels' }
					/>

					{/* Demo feed */}
					{/* TODO: Swap to a real demo */}
					<div>
						<img src={ images.manage_features_illustration } />
					</div>
				</ContentSection>

				{/* Creating posts */}
				<ContentSection styles={ styles.posts_features }>
					<img src={ images.bg_pattern_dots } />

					{/* TODO: Swap to a real demo */}
					<div className={ styles.demo }>
						<img src={ images.demo_manage } />
					</div>

					{/* Features */}
					<FeaturesNumbered features={ dataPostsFeatures }
						title="Creating posts"
						desc="Saves time and helps authors to manage channels"
					/>
				</ContentSection>

				{/* Team work */}
				<ContentSection styles={ styles.team_features }>
					<img src={ images.bg_pattern_dots } />

					<FeaturesNumbered features={ dataTeamFeatures }
						title="Work together"
						desc="Collaborate with other channel administrators to create and manage an awesome content"
					/>

					{/* TODO: Swap to a real demo */}
					<div className={ styles.demo }>
						<img src={ images.demo_team } />
					</div>
				</ContentSection>

				{/* Pricing */}
				<ContentSection styles={ styles.pricing }>
					<Pricing offers={ dataPricing } features={ dataPricingFeatures }>
						<BetaPriceCard { ...dataBetaPriceCard } />
					</Pricing>
				</ContentSection>

				{/* Roadmap */}
				<ContentSection styles={ styles.roadmap }>
					<img src={ images.bg_pattern_dots } />
					<ReleaseRoadmap />
				</ContentSection>

				{/* Subscription combined with footer */}
				<ContentSection styles={ styles.subscribe }>
					<Subscribe />
					<Footer nav={ footerNav } />
				</ContentSection>
			</main>

			{/* Footer bg */}
			<div className={ styles.footer_bg } />
		</>
	);
};

export default Index;
