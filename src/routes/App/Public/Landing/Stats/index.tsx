/**
 * Block that describes channel's statistics
 * feature with short description and demo
 *
 * @module Stats
 */
import React, { Ref, useState } from 'react';
import moment from 'moment';
import { useMedia } from 'use-media';

// IconUser
import { IconArrow } from '@prostpost/resources';
import styled, { css } from '@prostpost/styled';
import {
	Heading,
	Text,
	Flex,
	Paragraph,
	Box,
	ContentBlock,
	Bar,
	Graph,
	Button,
	StatNumber,
	Toggle,
	mediaQueries,
	MEDIA
} from '@prostpost/elm';

const dateFormat = 'YYYY-MM-DD';

const data = {
	day: [
		{ x: moment().subtract(6, 'days').format(dateFormat), y: 3800 },
		{ x: moment().subtract(5, 'days').format(dateFormat), y: 4200 },
		{ x: moment().subtract(4, 'days').format(dateFormat), y: 4000 },
		{ x: moment().subtract(3, 'days').format(dateFormat), y: 4300 },
		{ x: moment().subtract(2, 'days').format(dateFormat), y: 4400 },
		{ x: moment().subtract(1, 'days').format(dateFormat), y: 4800 },
		{ x: moment().format(dateFormat), y: 5000 }
	],

	week: [
		{ x: '2019-07-01', y: 2000 },
		{ x: '2019-07-08', y: 2300 },
		{ x: '2019-07-15', y: 2800 },
		{ x: '2019-07-22', y: 2850 },
		{ x: '2019-07-30', y: 3600 }
	],

	month: [
		{ x: '2018-12-01', y: 100 },
		{ x: '2019-01-01', y: 200 },
		{ x: '2019-02-01', y: 300 },
		{ x: '2019-03-01', y: 500 },
		{ x: '2019-04-01', y: 400 },
		{ x: '2019-05-01', y: 600 },
		{ x: '2019-06-01', y: 900 },
		{ x: '2019-07-01', y: 2000 },
		{ x: '2019-08-01', y: 4800 }
	]
};

type Props = {
	children?: React.ReactNode;
	ref?: Ref<HTMLElement>;
};

const StyledTopContainer = styled(Flex)`
	${ mediaQueries[MEDIA.MOBILE]} {
		width: 100%;
	}

	${ mediaQueries[MEDIA.TABLET]} {
		width: 80%;
	}

	${ mediaQueries[MEDIA.DESKTOP]} {
		width: 60%;
	}
`;

const panelStyle = css`
	flex-direction: column;

	> div {
		width: 100%;

		&:first-of-type {
			margin-bottom: 32px;
		}
	}
`;

const StyledPanel = styled(Flex)`
	/* stylelint-disable value-keyword-case */

	${ mediaQueries[MEDIA.TABLET]} {
		${ panelStyle }
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		${ panelStyle }
	}
`;

/**
 * Component
 */
export const Stats: React.FC<Props> = React.forwardRef((props, ref) => {

	const [showBar, setShowBar] = useState<boolean>(true);
	const [scale, setScale] = useState<'day' | 'week' | 'month'>('day');

	const PlotComp = showBar ? Bar : Graph;

	const mobile = useMedia(mediaQueries[MEDIA.MOBILE].substr(7));

	return (
		<ContentBlock ref={ ref } bg="white_100">
			<StyledTopContainer as="section" dir="column">
				<Text size={ 12 } color="blue_100">{ 'Analyse' }</Text>
				<Heading h={ 2 } mb={ 5 } title="Analyse what people like and how fast your channel grows" />
				<Paragraph size={ 18 } color="black_80">{
					'Unleash your creativity, plan projects from all angles, ' +
					'and create centralized hubs of information to keep everyone in the loop. '
				}</Paragraph>
			</StyledTopContainer>
			<Flex dir="column" as="section" mt={ 7 }>

				<StyledPanel align="center" justify="space-between" mb={ 7 }>

					{/* Stats */}
					<Flex width="auto">
						<StatNumber value={ 5000 }
							label="members"
							icon={ { icon: <IconArrow /> } }
						/>
						<StatNumber value={ 1200 }
							label="last week"
							icon={ { icon: <IconArrow /> } }
						/>
					</Flex>

					{/* Toggler */}
					<Flex width="auto" align="center">
						<Box width="150px" mr={ 4 }>
							<Toggle label="Show as bars"
								on={ showBar }
								onToggle={ setShowBar }
							/>
						</Box>

						<Button mr={ 3 } variant="secondary"
							state={ scale === 'day' && 'active' }
							size="small"
							title="Week"
							onClick={ () => setScale('day') }
						/>
						<Button mr={ 3 } variant="secondary"
							state={ scale === 'week' && 'active' }
							size="small"
							title="Month"
							onClick={ () => setScale('week') }
						/>
						<Button mr={ 3 } variant="secondary"
							state={ scale === 'month' && 'active' }
							size="small"
							title="Year"
							onClick={ () => setScale('month') }
						/>
					</Flex>
				</StyledPanel>

				{/* Graph */}
				<PlotComp xAxisFormatter={ v => moment(v, dateFormat).format(`DD ${ scale === 'day' ? 'ddd' : 'MMM' }`) }
					data={ data[scale] }
					dataTitle="Followers"
					color="blue"
					scale={ { period: scale } }
					barSize={ mobile ? 15 : null }
				/>
			</Flex>
		</ContentBlock>
	);
});

Stats.displayName = 'Stats';
