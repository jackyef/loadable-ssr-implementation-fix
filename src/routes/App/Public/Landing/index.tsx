/**
 * Landing page (home) route
 */
import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useLocalStore } from 'mobx-react';

import { canUseDOM } from '@tg/utils';
import { Button, scroll } from '@tg/elm';

import { history } from 'app/routes';
import { formStore as signUpFormStore } from 'app/routes/App/Auth/pages/Signup';
import { commonNavBtnProps } from 'app/routes/App/nav';
import { Header, NavItem } from 'app/components';
import { routes } from 'app/config';

import { Promo } from './Promo';
import { Blogs } from './Blogs';
import { Feed } from './Feed';
import { Editor } from './Editor';
import { EditorMore } from './EditorMore';
import { Stats } from './Stats';
import { Pricing } from './Pricing';
import { FAQ } from './FAQ';
import { GetStarted } from './GetStarted';

import {
	StyledLogo,
	StyledNav,
	StyledNavSign,
	StyledDemo
} from './_styled';

type Props = {
	scroller?: any;
};

/**
 * On click redirect to sigh up form
 * and persist entered email in context store
 * @param {string} email Email to set to sign up form
 */
export const toSignUp = (email?: string): void => {
	signUpFormStore.setData({ email: email });
	history.push(routes.auth.signup);
};

/**
 * Landing route
 */
const Landing: React.FC<Props> = ({ scroller }) => {

	// Refs to scroll to
	const refOrganize = useRef(null);
	const refEditor = useRef(null);
	const refStats = useRef(null);
	const refPricing = useRef(null);

	// use useLocalStore
	const localStore = useLocalStore(() => ({
		authenticated: canUseDOM() && localStorage.getItem('id_token')
	}));

	// Render
	return (
		<>
			<Helmet>
				<title>{ 'Just create and we take care of the rest' }</title>
			</Helmet>

			{/* Header */}
			<Header sticky>

				{/* Logo */}
				<StyledLogo onClick={ () => scroll(scroller) } />

				{/* Page navigation */}
				<StyledNav>
					<NavItem>
						<Button { ...commonNavBtnProps('Organise') }
							onClick={ () => scroll(scroller, refOrganize, -50) }
						/>
					</NavItem>
					<NavItem>
						<Button { ...commonNavBtnProps('Create') }
							onClick={ () => scroll(scroller, refEditor, -70) }
						/>
					</NavItem>
					<NavItem>
						<Button { ...commonNavBtnProps('Analise') }
							onClick={ () => scroll(scroller, refStats, -100) }
						/>
					</NavItem>
					<NavItem>
						<Button { ...commonNavBtnProps('Pricing') }
							onClick={ () => scroll(scroller, refPricing) }
						/>
					</NavItem>
				</StyledNav>

				{/* Sign in/up (logout) */}
				{
					localStore.authenticated
						? (
							<StyledNavSign>
								<NavItem>
									<Button title="Poster"
										variant="primary"
										size="mid"
										detail="rounded"
										onClick={ () => canUseDOM() && window.location.assign(routes.poster) }
									/>
								</NavItem>
							</StyledNavSign>
						)
						: (
							<StyledNavSign>
								<NavItem>
									<Button nav { ...commonNavBtnProps('Sign in', true) }
										onClick={ () => routes.auth.signin }
									/>
								</NavItem>
								<NavItem>
									<Button nav title="Get Started"
										variant="primary"
										size="mid"
										detail="rounded"
										onClick={ () => routes.auth.signup }
									/>
								</NavItem>
							</StyledNavSign>
						)
				}
			</Header>

			{/* Content cards */}
			<main>

				{/* Top */}
				<Promo />
				<StyledDemo />
				<Blogs />

				{/* Center */}
				<Feed ref={ refOrganize } />
				<Editor ref={ refEditor } />
				<EditorMore />

				{/* Bottom */}
				<Stats ref={ refStats } />
				<Pricing ref={ refPricing } />
				<FAQ />
				<GetStarted />

			</main>
		</>
	);
};

export default Landing;
