/**
 * Privacy Policy page
 */
import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useLocalStore } from 'mobx-react';

import { canUseDOM } from '@scc/utils';
import { Btn, Headline } from '@tg/elm';
import { Scrollbars } from '@tg/layout';

import { commonNavBtnProps, scroll } from '../../../utils';
import { history } from '../../';
import { routes } from '../../../config';
import { Footer, Header, Logo, Nav, NavItem, ContentBlock } from '../../../components';

// Styles
import importedLandingStyles from '../Public/Landing/Landing.module.less';
const stylesLanding: Styles = importedLandingStyles;

import importedStyles from './PP.module.less';
const styles: Styles = importedStyles;

type Styles = {
	content_block?: string;

	// From landing
	nav?: string;
	sign_in?: string;
};

/**
 * Component
 */
const PP: React.FC<{}> = () => {

	// Content block refs
	const refTC = useRef(null);
	const refPP = useRef(null);

	// use useLocalStore
	const localStore = useLocalStore(() => ({
		authenticated: canUseDOM() && localStorage.getItem('id_token')
	}));

	// Render
	return (
		<Scrollbars getScroller position="absolute">
			{
				(scroller: any) => (<>

					<Helmet>
						<title>{ 'Terms of Use & Privacy Policy' }</title>
					</Helmet>

					{/* Header */}
					<Header>

						{/* Logo */}
						<Logo onClick={() => history.push(routes.home)} />

						{/* Page navigation */}
						<Nav className={ stylesLanding.nav }>
							<NavItem>
								<Btn { ...commonNavBtnProps('Terms and Conditions') }
									onClick={() => scroll(scroller, refTC)}
								/>
							</NavItem>
							<NavItem>
								<Btn { ...commonNavBtnProps('PrivacyPolicy') }
									onClick={() => scroll(scroller, refPP)}
								/>
							</NavItem>
						</Nav>

						{/* Sign in/up (logout) */}
						{
							localStore.authenticated
								? (
									<Nav className={ styles.sign_in }>
										<NavItem>
											<Btn title="Poster" style={{ main: 'general', size: 'mid', detail: 'rounded' }}
												onClick={() => canUseDOM() && window.location.assign(routes.poster)}
											/>
										</NavItem>
									</Nav>
								)
								: (
									<Nav className={ stylesLanding.sign_in }>
										<NavItem>
											<Btn { ...commonNavBtnProps('Sign in', true) }
												url={ routes.auth.signin }
											/>
										</NavItem>
										<NavItem>
											<Btn nav title="Get Started" style={{ main: 'general', size: 'mid', detail: 'rounded' }}
												url={ routes.auth.signup }
											/>
										</NavItem>
									</Nav>
								)
						}
					</Header>

					{/* Top title block */}
					<ContentBlock className={ styles.content_block }>
						<Headline h={1} variation="public" title="Terms and Privacy" />
					</ContentBlock>

					{/* Terms and Conditions */}
					<ContentBlock ref={ refTC } className={ styles.content_block }>

						{/* Title */}
						<Headline h={2} variation="public" title="Terms and Conditions" />
						<span>{ 'Last updated: August 8, 2019' }</span>

						{/* Text */}
						<p>{
							'Please read these Terms and Conditions ("Terms" or "Terms and Conditions") ' +
							'carefully before using the website, the Notion desktop application and the ' +
							'Notion mobile application (together, or individually, the "Service") operated ' +
							'by Notion Labs, Inc. ("Notion", "us", "we", or "our"). For purposes of these ' +
							'Terms, “you” and “your” means you as the user of the Service.\n\n' +

							'Your access to and use of the Service is conditioned upon your acceptance of and ' +
							'compliance with these Terms. These Terms apply to all visitors, users and others ' +
							'who wish to access or use the Service.\n\n' +

							'By accessing or using the Service you agree to be bound by these Terms. ' +
							'If you disagree with any part of the terms, then you do not have permission ' +
							'to access the Service. If you are accessing or using the Service on behalf of a ' +
							'business or entity, then your business or entity is legally and financially ' +
							'responsible for your access to and use of the Service as well as for the use of ' +
							'your account by others affiliated with your entity, including any employees, ' +
							'agents or contractors.'
						}</p>

						{/* Sub title */}
						<Headline h={3} variation="public" title="1. Content" />

						{/* Text */}
						<p>{
							'Our Service allows you to post, link, store, share and otherwise make available certain ' +
							'information, text, graphics, videos, or other material ("Content") on the Service. ' +
							'You are responsible for the Content that you post on or through the Service, ' +
							'including its legality, reliability, and appropriateness.\n\n' +

							'By posting Content on or through the Service, You represent and warrant that: (a) the ' +
							'Content is yours and/or you have the right to use it and the right to grant us the ' +
							'rights and license as provided in these Terms, and (b) that the posting of your ' +
							'Content on or through the Service does not violate the privacy rights, publicity ' +
							'rights, copyrights, contract rights or any other rights of any person or entity. ' +
							'We reserve the right to terminate the account of anyone found to be ' +
							'infringing on a copyright.\n\n' +

							'You retain any and all of your rights to any Content you submit, post or display on ' +
							'or through the Service and you are responsible for protecting those rights; except ' +
							'that if you submit or post Enterprise Content (as defined below) to an Enterprise ' +
							'Workspace (as defined below), then the ownership of such Enterprise Content will ' +
							'be as set forth in any agreement between you and the applicable Enterprise ' +
							'(as defined below) that manages such Enterprise Workspace, and in the absence ' +
							'of such agreement, then as between you and such Enterprise, the Enterprise will ' +
							'own all rights to any such Enterprise Content.\n\n' +

							'However, users can still create, join and use their own Personal Workspaces or ' +
							'Team Workspaces separately from use of Enterprise Workspaces. Content uploaded ' +
							'to a Personal Workspace or Team Workspace remains owned by the user and not ' +
							'the Enterprise.\n\n' +

							'We take no responsibility and assume no liability for Content you or any third-party ' +
							'posts on or through the Service. When you post Content into certain Workspaces, you ' +
							'will be able to designate whether such Content is made publicly ' +
							'or privately available.\n\n' +

							'As a condition of your use of the Service, you grant Notion a nonexclusive, ' +
							'perpetual, irrevocable, royalty-free, worldwide, transferable, sub-licenseable ' +
							'license to access, use, host, cache, store, reproduce, transmit, display, publish, ' +
							'distribute, modify and adapt and create derivative works (either alone or as part of ' +
							'a collective work) from your Content. As part of the foregoing license grant you agree ' +
							'that (a) the other users of the Service shall have the right to comment on and/or tag ' +
							'your public Content that you make available to them and/or to use, publish, display, ' +
							'modify or include a copy of your public Content that you make available to them, ' +
							'and (b) we have the right to make any of your public Content available to third ' +
							'parties, so that those third parties can distribute, make derivative works of, ' +
							'comment on and/or analyze your Content on other media and services (either alone ' +
							'or as part of a collective work); except that the foregoing (a) and (b) shall not ' +
							'apply to any of your Content that you post privately for non-public ' +
							'display on the Service.\n\n' +

							'By posting Content that is set for public access to the Service, you grant us the ' +
							'right to display such public Content on and through the Service. Notion has the ' +
							'right but not the obligation to monitor all Content provided by users.\n\n' +

							'In addition, any Content found on or through this Service that is not originally ' +
							'submitted, posted, or displayed by users of the Service is the property of Notion ' +
							'or used with permission. You may not distribute, modify, transmit, reuse, download, ' +
							'repost, copy, or use said Content, whether in whole or in part, for commercial ' +
							'purposes or for personal gain, without express advance written permission from us.\n\n' +

							'You agree that Notion has the right, but not the obligation, to remove any ' +
							'Content from the Service if Notion determines in its sole discretion that such ' +
							'Content has violated these Terms, applicable law, or the privacy rights, publicity ' +
							'rights, intellectual property, contract rights or any other rights of any person or ' +
							'entity, or if Notion determines in its sole discretion that such Content poses a ' +
							'risk of harm to Notion, other users of the Service or third parties.\n\n' +

							'Any content stored on the Service will be stored indefinitely, unless it is ' +
							'explicitly deleted or unless otherwise set forth in a separate agreement with an ' +
							'Enterprise (as defined below). This process is described under "Termination".'
						}</p>

						{/* Sub title */}
						<Headline h={3} variation="public" title="2. Workspaces" />

						{/* Text */}
						<p>{
							'Content submitted, posted or modified by users ' +
							'in the Service is organized into ' +
							'separated sections we refer to as “Workspaces.”\n\n' +

							'There are three general types of Workspaces on the Service:'
						}</p>

						<ul>
							<li>{
								'"Personal Workspaces" that can only be accessed by the user that created the Workspace.'
							}</li>
							<li>{
								'"Team Workspaces" that require a Team Subscription (as defined below) and that ' +
								'can be accessed by multiple users that form the members of the Team. Further ' +
								'details on Team Workspaces are outlined below.'
							}</li>
							<li>{
								'“Enterprise Workspaces” that require an Enterprise Subscription ' +
								'(as defined below) and that are designed for large-scale usage by ' +
								'Enterprises who require tools managing all Content within such Workspaces. ' +
								'Further details on Enterprise Workspaces are outlined below.'
							}</li>
						</ul>

						<p>{
							'In the Service, you can work across multiple Workspaces at once, meaning your single ' +
							'account can access your own Personal Workspace(s), different Team Workspace(s), and ' +
							'your employer’s Enterprise Workspace. Workspaces are completely separate, and you ' +
							'won’t be able to link any Content between them (although you can transfer copies ' +
							'of Content from one Workspace to another). You can also export your Content from ' +
							'your Workspaces for use outside of the Service using our export tool available in ' +
							'our online account management page. Note that exporting or transferring Content ' +
							'from an Enterprise’s Workspace will be managed by the applicable Enterprise ' +
							'administrator, which may or may not allow you to use our export or transfer tools ' +
							'for Content from such Enterprise’s Workspace.'
						}</p>

					</ContentBlock>

					{/* Privacy Policy */}
					<ContentBlock ref={ refPP } className={ styles.content_block }>

						{/* Title */}
						<Headline h={2} variation="public" title="Privacy Policy" />
						<span>{ 'Last updated: August 8, 2019' }</span>

						{/* Text */}
						<p>{
							'Notion Labs, Inc. ("Notion", "us", "we", or "our") operates the website, ' +
							'the Notion desktop application and the Notion mobile application ' +
							'(the "Service").\n\n' +

							'This Privacy Policy informs you of our policies regarding the collection, use and ' +
							'disclosure of information, including Personal Information (defined below) about you, ' +
							'when you use our Service.\n\n' +

							'We will not use or share your Personal Information with anyone except as ' +
							'described in this Privacy Policy.\n\n' +

							'We use your Personal Information for providing and improving the Service. ' +
							'By using the Service, you agree to the collection and use of information in ' +
							'accordance with this policy. Unless otherwise defined in this Privacy Policy, ' +
							'capitalized terms used in this Privacy Policy have the same meanings as in our ' +
							'Terms and Conditions.'
						}</p>

						{/* Sub title */}
						<Headline h={3} variation="public" title="1. Cookies" />

						{/* Text */}
						<p>{
							'Cookies are files with a small amount of data, which may include an anonymous unique ' +
							'identifier. Cookies are sent to your browser from a web site and transferred to your ' +
							'device. We use cookies to collect information in order to improve our ' +
							'services for you.\n\n' +

							'You can instruct your browser to refuse all cookies or to indicate when a cookie ' +
							'is being sent. The Help feature on most browsers provide information on how to ' +
							'accept cookies, disable cookies or to notify you when receiving a new cookie.\n\n' +

							'If you do not accept cookies, you may not be able to use some ' +
							'features of our Service and we recommend that you leave them turned on.'
						}</p>

						{/* Sub title */}
						<Headline h={3} variation="public" title="2. Information Collection" />

						{/* Text */}
						<p>{
							'While using our Service, we may ask you to provide us with certain information ' +
							'that can be used to contact or identify you. This information may include, but is ' +
							'not limited to, your name, email address and profile photo ("Personal Information").\n\n' +

							'When you send us an email message or otherwise contact us, we may receive Personal ' +
							'Information about you including your name, email address, and in the contents of ' +
							'messages or attachments that you may send to us, as well as other information you ' +
							'choose to provide, and that may be associated with your communications.\n\n' +

							'Should you choose to subscribe for Personal, Team, or Enterprise Service plans, ' +
							'you will provide payment information, including, but not limited to, payment card ' +
							'number, expiration date, security code and billing address.\n\n' +

							'Should you opt-in to use the Google Contacts feature within Notion, we will have ' +
							'the ability to view your contacts via the Google People API. The sole use of this ' +
							'data is to populate the auto-completion of your contacts when sending invitation ' +
							'emails. Notion will not use this data for any other purpose.\n\n' +

							'We may also collect information that your browser sends whenever you visit our ' +
							'Service or when you access the Service by or through a mobile device ("Log Data").\n\n' +

							'This Log Data may include information such as your computer\'s Internet Protocol ("IP") ' +
							'address, browser type, browser version, the pages of our Service that you visit, the ' +
							'time and date of your visit, the time spent on those pages and other statistics.\n\n' +

							'When you access the Service by or through a mobile device, this Log Data may include ' +
							'information such as the type of mobile device you use, your mobile device unique ID, ' +
							'the IP address of your mobile device, your mobile operating system, the type of mobile ' +
							'Internet browser you use and other statistics.\n\n' +

							'In addition, we may use third party services including Amazon Web Services, ' +
							'Amplitude, Segment, Intercom, Google Analytics, Crashlytics, and Loggly that ' +
							'collect, monitor and analyze this Log Data to provide analytics and other data to ' +
							'help us increase our Service\'s functionality. These third party service providers ' +
							'have their own privacy policies addressing how they use Log Data. If you wish to opt ' +
							'out of the collection of such Log Data, please send us an email at the contact ' +
							'information below, or install a browser analytics blocker plug-in (e.g., Ghostery).'
						}</p>

					</ContentBlock>

					{/* Footer */}
					<Footer />
				</>)
			}
		</Scrollbars>
	);
};

export default PP;
