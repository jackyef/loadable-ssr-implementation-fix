/**
 * Block that describes channel's statistics
 * feature with short description and demo
 * @module Stats
 */
import React, { Ref } from 'react';
import { ResponsiveLine, LineSerieData } from '@nivo/line';

import { Headline } from '@tg/ui';

import { ContentBlock } from '../../../../../components';

// Styles
import importedStyles from './Stats.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	info?: string;
};

/**
 * Test data to show on a graph
 */
const graphData: LineSerieData[] = [{
	id: 'members',
	color: 'hsl(230, 70%, 50%)',
	data: [
		{ x: '17 Jan', y: 3400 },
		{ x: '18 Jan', y: 3800 },
		{ x: '19 Jan', y: 4200 },
		{ x: '20 Jan', y: 4000 },
		{ x: '21 Jan', y: 4100 },
		{ x: '22 Jan', y: 4400 },
		{ x: '23 Jan', y: 4800 }
	]
}];

type Props = {
	ref?: Ref<any>;
};

/**
 * Component
 */
export const Stats: React.FC<Props> = React.forwardRef((props, ref) => (
	<ContentBlock ref={ref} className={styles.self}>

		{/* Short description */}
		<div className={styles.info}>
			<Headline h={2} variation="public" title="Analise what people like and how fast your channel grows" />
			<p>{
				'Unleash your creativity, plan projects from all angles, ' +
				'and create centralized hubs of information to keep everyone in the loop. '
			}</p>
		</div>

		{/* Graph demo */}
		<ResponsiveLine data={ graphData }
			margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
			xScale={{ type: 'point' }}
			yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient: 'bottom',
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'transportation',
				legendOffset: 36,
				legendPosition: 'middle'
			}}
			axisLeft={{
				orient: 'left',
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'count',
				legendOffset: -40,
				legendPosition: 'middle'
			}}
			colors={{ scheme: 'nivo' }}
			pointSize={10}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabel="y"
			pointLabelYOffset={-12}
			useMesh={true}
			legends={[
				{
					anchor: 'bottom-right',
					direction: 'column',
					justify: false,
					translateX: 100,
					translateY: 0,
					itemsSpacing: 0,
					itemDirection: 'left-to-right',
					itemWidth: 80,
					itemHeight: 20,
					itemOpacity: 0.75,
					symbolSize: 12,
					symbolShape: 'circle',
					symbolBorderColor: 'rgba(0, 0, 0, .5)',
					effects: [
						{
							on: 'hover',
							style: {
								itemBackground: 'rgba(0, 0, 0, .03)',
								itemOpacity: 1
							}
						}
					]
				}
			]}
		/>

	</ContentBlock>
));
