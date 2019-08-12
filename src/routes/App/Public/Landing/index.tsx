/**
 * Landing page (home) route
 */
import React, { RefObject, useRef } from 'react';
import { Helmet } from 'react-helmet';

import { Btn, TypeBtnStyle } from '@tg/ui';

import { Header, Nav, Logo, NavItem, ContentBlock } from '../../../../components';

import { Promo } from './Promo';
import { Demo } from './Demo';
import { Blogs } from './Blogs';
import { Feed } from './Feed';
import { Editor } from './Editor';
import { EditorMore } from './EditorMore';
import { Stats } from './Stats';
import { GetStarted } from './GetStarted';

import importedStyles from './Landing.module.less';
const styles: Styles = importedStyles;

type Styles = {
	demo?: string;
	nav?: string;
	sign_in?: string;
	shadow?: string;
	shadow_cover?: string;
	shadow_common?: string;
};

type Props = {
	scroller?: any;
};

/**
 * Generate navigation button props
 */
const commonNavBtnProps = (title: string, nav: boolean = false) => {
	const style: TypeBtnStyle = { main: 'nav' };
	return { style, nav, title };
};

/**
 * Scroll to
 */
const scroll = (scroller: any, ref?: RefObject<any>, offset: number = 0) => {
	scroller.scrollerElement.scrollTo({
		behavior: 'smooth',
		left: 0,
		top: ref ? ref.current.offsetTop + offset : 0
	});
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
	const refEditor = useRef(null);
	const refBlogs = useRef(null);
	const refStats = useRef(null);
	// const refPrice = useRef(null);

	// Render
	return (
		<>
			<Helmet>
				<title>{ 'Just create and we take care of the rest' }</title>
			</Helmet>

			{/* Header */}
			<Header sticky={ STICKY }>

				{/* Logo */}
				<Logo onClick={() => scroll(scroller)} />

				{/* Page navigation */}
				<Nav className={ styles.nav }>
					<NavItem>
						<Btn { ...commonNavBtnProps('Organise') }
							onClick={() => scroll(scroller, refBlogs, -100)}
						/>
					</NavItem>
					<NavItem>
						<Btn { ...commonNavBtnProps('Create') }
							onClick={() => scroll(scroller, refEditor, -70) }
						/>
					</NavItem>
					<NavItem>
						<Btn { ...commonNavBtnProps('Analise') }
							onClick={() => scroll(scroller, refStats, -100)}
						/>
					</NavItem>
					<NavItem>
						<Btn { ...commonNavBtnProps('Pricing') }
							// onClick={() => scroll(scroller, refPrice, -100)}
						/>
					</NavItem>
				</Nav>

				{/* Sign in/up (logout) */}
				<Nav className={ styles.sign_in }>
					<NavItem>
						<Btn { ...commonNavBtnProps('Sign in', true) } />
					</NavItem>
					<NavItem>
						<Btn nav={false} title="Get Started" style={{ main: 'general', size: 'mid' }}
							onClick={() => scroll(scroller)}
						/>
					</NavItem>
				</Nav>
			</Header>

			{/* Hack to hide header shadow when page has not been scrolled down yet */}
			{
				!STICKY ? null : (<>
					<ContentBlock className={`${ styles.shadow_common } ${ styles.shadow }`}>{}</ContentBlock>
					<ContentBlock className={`${ styles.shadow_common } ${ styles.shadow_cover }`}>{}</ContentBlock>
				</>)
			}

			{/* Content cards */}
			<main>

				{/* Top */}
				<Promo />
				<Demo className={ styles.demo } />
				<Blogs ref={ refBlogs } />

				{/* Center */}
				<Feed />
				<Editor ref={ refEditor } />
				<EditorMore />

				{/* Bottom */}
				<Stats ref={ refStats } />
				{/* TODO: Pricing component here */}
				<GetStarted />

			</main>
		</>
	);
};

export default Landing;
