/**
 * Landing page (home) route
 */
import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useLocalStore } from 'mobx-react';

import { canUseDOM } from '@tg/utils';
import { Button, Logo } from '@tg/elm';
import { scroll } from '@tg/layout';

import { history } from 'app/routes';
import { formStore as signUpFormStore } from 'app/routes/App/Auth/Signup';
import { commonNavBtnProps } from 'app/routes/App/nav';
import { Header, Nav, NavItem, ContentBlock } from 'app/components';
import { routes } from 'app/config';

import { Promo } from './Promo';
import { Demo } from './Demo';
import { Blogs } from './Blogs';
import { Feed } from './Feed';
import { Editor } from './Editor';
import { EditorMore } from './EditorMore';
import { Stats } from './Stats';
import { Pricing } from './Pricing';
import { FAQ } from './FAQ';
import { GetStarted } from './GetStarted';

import importedStyles from './Landing.module.less';
const styles: Styles = importedStyles;

type Styles = {
	demo?: string;
	nav?: string;
	logo?: string;
	sign_in?: string;
	shadow?: string;
	shadow_cover?: string;
	shadow_common?: string;
};

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
 * Make header sticky
 */
const STICKY = true; // false

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
			<Header sticky={ STICKY }>

				{/* Logo */}
				<Logo className={ styles.logo } onClick={ () => scroll(scroller) } />

				{/* Page navigation */}
				<Nav className={ styles.nav }>
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
				</Nav>

				{/* Sign in/up (logout) */}
				{
					localStore.authenticated
						? (
							<Nav className={ styles.sign_in }>
								<NavItem>
									<Button title="Poster"
										variant="primary"
										size="mid"
										detail="rounded"
										onClick={ () => canUseDOM() && window.location.assign(routes.poster) }
									/>
								</NavItem>
							</Nav>
						)
						: (
							<Nav className={ styles.sign_in }>
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
							</Nav>
						)
				}
			</Header>

			{/* Hack to hide header shadow when page has not been scrolled down yet */}
			{
				!STICKY ? null : (<>
					<ContentBlock className={ `${ styles.shadow_common } ${ styles.shadow }` }>{}</ContentBlock>
					<ContentBlock className={ `${ styles.shadow_common } ${ styles.shadow_cover }` }>{}</ContentBlock>
				</>)
			}

			{/* Content cards */}
			<main>

				{/* Top */}
				<Promo />
				<Demo className={ styles.demo } />
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
