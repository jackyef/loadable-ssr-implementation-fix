/**
 * Block that describes channel's statistics
 * feature with short description and demo
 * @module Stats
 */
import _ from 'lodash';
import React, { Ref } from 'react';
import moment from 'moment';
import {
	ResponsiveContainer,
	ComposedChart,
	Line,
	Area,
	XAxis,
	YAxis,
	Tooltip
} from 'recharts';

import { Headline } from '@tg/ui';

import { ContentBlock } from '../../../../../components';

// Styles
import importedStyles from './Stats.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	info?: string;

	// Graph
	graph_container?: string;
	dot?: string;
	dot_active?: string;
	tooltip?: string;
	tick?: string;
	delta?: string;
	delta_positive?: string;
	delta_negative?: string;
};

const data = [
	{ x: moment().subtract(6, 'days').format('YYYY-MM-DD'), y: 3800 },
	{ x: moment().subtract(5, 'days').format('YYYY-MM-DD'), y: 4200 },
	{ x: moment().subtract(4, 'days').format('YYYY-MM-DD'), y: 4000 },
	{ x: moment().subtract(3, 'days').format('YYYY-MM-DD'), y: 4300 },
	{ x: moment().subtract(2, 'days').format('YYYY-MM-DD'), y: 4400 },
	{ x: moment().subtract(1, 'days').format('YYYY-MM-DD'), y: 4800 },
	{ x: moment().format('YYYY-MM-DD'), y: 5000 }
];

/**
 * Format date to readable form
 */
const formatDate = (v: string) => moment(v, 'YYYY-MM-DD').format('MMM DD');

/**
 * Dot component props
 */
type Props = {
	ref?: Ref<any>;
};

/**
 * Graph colors to be set in JSX
 * neither in CSS file
 */
const colors = {
	line: '#0E35C4',
	dotBg: '#fff'
};

type PropsDot = {
	active?: boolean;
	cx?: number;
	cy?: number;
};

/**
 * Dot on a Line graph
 */
const Dot: React.FC<PropsDot> = ({ active, cx, cy }) => (
	<circle cx={cx} cy={cy} r={active ? 7 : 5}
		stroke={colors.line} strokeWidth={2}
		fill={active ? colors.line : colors.dotBg}
	/>
);

type TickProps = {
	x?: number;
	y?: number;
	payload?: any;
	formatter?: (v: any) => string;
	axis?: 'x' | 'y';
};

/**
 * Custom axis tick (value on axis)
 */
const AxisTick: React.FC<TickProps> = ({ x, y, payload, formatter, axis }) => {
	return (
		<g className={styles.tick} transform={`translate(${x},${y})`}>
			<text x={axis === 'y' ? 25 : 0} y={0} dy={axis === 'x' ? 16 : 5} textAnchor="middle">
				{formatter(payload.value)}
			</text>
		</g>
	);
};

AxisTick.defaultProps = {
	axis: 'x',
	formatter: v => v
};

/**
 * Get previous value (moment date)
 */
const getPrevDay = _.memoize((current: string) => {
	const prevDay = moment(current, 'YYYY-MM-DD').subtract(1, 'day').format('YYYY-MM-DD');
	return _.filter(data, v => v.x === prevDay)[0];
});

/**
 * Tooltip
 */
const TooltipCustom: React.FC<any> = (e: any) => {
	if (e.active) {

		// Values
		const xValue = _.get(e.payload, '1.payload.x');
		const yValue = _.get(e.payload, '1.payload.y');

		// Prev day
		const prevPair = getPrevDay(xValue);
		const delta = prevPair && (yValue - prevPair.y);

		// Render
		return (
			<div className={ styles.tooltip }>
				<ul>
					<li><span>{ yValue }</span>{' members'}</li>
					{
						!delta ? null : (
							<li className={
								`${ styles.delta }
								${ delta > 0 ? styles.delta_positive : delta < 0 ? styles.delta_negative : '' }`}
							>
								<span>{`${ delta > 0 ? '+' : '' }${ delta }`}</span>{' from the previous day'}
							</li>
						)
					}
				</ul>
			</div>
		);
	}

	return null;
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

			{/* Small */}
		</div>

		{/* Graph demo */}
		<ResponsiveContainer className={ styles.graph_container } height={400}>
			<ComposedChart data={ data } margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>

				{/* Area gradient color */}
				<defs>
					<linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor={ colors.line } stopOpacity={0.1}/>
						<stop offset="95%" stopColor={ colors.line } stopOpacity={0}/>
					</linearGradient>
				</defs>

				{/* Axis */}
				<XAxis dataKey="x" scale="point" domain={['auto', 'auto']} tick={<AxisTick formatter={formatDate}/>}
					axisLine={{ opacity: 0.2 }} tickLine={{ opacity: 0.2 }}
				/>

				<YAxis orientation="right" domain={['auto', 'auto']} tick={<AxisTick axis="y" />}
					axisLine={{ opacity: 0.2 }} tickLine={{ opacity: 0.2 }}
				/>

				{/*Area gradient (under the line so goes first) */}
				<Area dataKey="y" type="monotone" stroke={null}
					fillOpacity={1} fill="url(#areaGradient)"
					dot={false} activeDot={false}
				/>

				{/* Tooltip */}
				<Tooltip cursor={{ opacity: 0.4, strokeWidth: 1, strokeDasharray: '5, 5' }}
					content={ TooltipCustom }
				/>

				{/* Line */}
				<Line dataKey="y" type="monotone" stroke={colors.line} strokeWidth={2}
					dot={ <Dot /> } activeDot={ <Dot active /> }
				/>

			</ComposedChart>
		</ResponsiveContainer>
	</ContentBlock>
));
