/**
 * Block that describes channel's statistics
 * feature with short description and demo
 * @module Stats
 */
import _ from 'lodash';
import React, { Ref, useState } from 'react';
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

import { Headline } from '@tg/elm';
import { Btn } from '@tg/app';
import { IconCal } from '@tg/resources';

import { ContentBlock, BlockTextHint } from '../../../../../components';

// Styles
import importedStyles from './Stats.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	info?: string;
	small_stat?: string;
	graph?: string;
	scale_container?: string;

	// Graph
	dot?: string;
	dot_active?: string;
	tooltip?: string;
	tick?: string;
	delta?: string;
	delta_positive?: string;
	delta_negative?: string;
};

const dateFormat = 'YYYY-MM-DD';

const _data = {
	week: [
		{ x: moment().subtract(6, 'days').format(dateFormat), y: 3800 },
		{ x: moment().subtract(5, 'days').format(dateFormat), y: 4200 },
		{ x: moment().subtract(4, 'days').format(dateFormat), y: 4000 },
		{ x: moment().subtract(3, 'days').format(dateFormat), y: 4300 },
		{ x: moment().subtract(2, 'days').format(dateFormat), y: 4400 },
		{ x: moment().subtract(1, 'days').format(dateFormat), y: 4800 },
		{ x: moment().format(dateFormat), y: 5000 }
	],

	month: [
		{ x: '2019-07-01', y: 2000 },
		{ x: '2019-07-08', y: 2300 },
		{ x: '2019-07-15', y: 2800 },
		{ x: '2019-07-22', y: 2850 },
		{ x: '2019-07-30', y: 3600 }
	],

	year: [
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

/**
 * Format date to readable form
 * @param v Date string to format
 * @returns {string} Reformated date string
 */
const formatDate = (v: string): string => {
	return moment(v, dateFormat).format('MMM DD');
};

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
	<circle cx={ cx } cy={ cy } r={ active ? 7 : 5 }
		stroke={ colors.line } strokeWidth={ 2 }
		fill={ active ? colors.line : colors.dotBg }
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
		<g className={ styles.tick } transform={ `translate(${ x },${ y })` }>
			<text x={ axis === 'y' ? 25 : 0 } y={ 0 } dy={ axis === 'x' ? 16 : 5 } textAnchor="middle">
				{ formatter(payload.value) }
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
const getPrev = _.memoize((current: string, scale: 'week' | 'month' | 'year') => {

	// Prev value container
	let prev: string = null;

	// Choose scale
	switch (scale) {
		case 'week':
			prev = moment(current, dateFormat).subtract(1, 'day').format(dateFormat);
			return _.find(_data.week, v => v.x === prev);

		case 'month':
			prev = moment(current, dateFormat).subtract(1, 'week').format(dateFormat);
			return _.find(_data.month, v => v.x === prev);

		case 'year':
			prev = moment(current, dateFormat).subtract(1, 'month').format(dateFormat);
			return _.find(_data.year, v => v.x === prev);

		default:
			return { x: '', y: 0 };
	}
});

const scaleFrom: any = {
	week: 'day',
	month: 'week',
	year: 'month'
};

/**
 * Tooltip
 * @param e Mouse event
 * @param scale Axis scale: year, month, week
 */
const TooltipCustom: React.FC<any> = (e: any, scale: any) => {
	if (e.active) {

		// Values
		const xValue = _.get(e.payload, '1.payload.x');
		const yValue = _.get(e.payload, '1.payload.y');

		// Prev day
		const prevPair = getPrev(xValue, scale);
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
								${ delta > 0 ? styles.delta_positive : delta < 0 ? styles.delta_negative : '' }` }
							>
								<span>
									{ `${ delta > 0 ? '+' : '' }${ delta }`}
								</span>{` from the previous ${ scaleFrom[scale] }`}
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
export const Stats: React.FC<Props> = React.forwardRef((props, ref) => {

	// Scale state
	const [scale, setScale] = useState<'week' | 'month' | 'year'>('week');
	const [data, setData] = useState<Array<{x: string; y: any}>>(_data.week);

	// Render
	return (
		<ContentBlock ref={ ref } className={ styles.self }>

			{/* Short description */}
			<div className={ styles.info }>
				<BlockTextHint text="Analise" />
				<Headline h={ 2 } variation="public" title="Analise what people like and how fast your channel grows" />
				<p>{
					'Unleash your creativity, plan projects from all angles, ' +
					'and create centralized hubs of information to keep everyone in the loop. '
				}</p>

				{/* Small stat */}
				<div className={ `${ styles.delta } ${ styles.delta_positive } ${ styles.small_stat }` }>
					<span>{ '+74' }</span>
				</div>
			</div>

			{/* Graph demo */}
			<div className={ styles.graph }>

				{/* Scale */}
				<div className={ styles.scale_container }>

					{/* Predefined scales (week, month, year) */}
					<ul>
						<li>
							<Btn title="Week" style={ { main: 'inline', size: 'small', color: 'dim' } }
								active={ scale === 'week' }
								onClick={ () => {
									setScale('week');
									setData(_data.week);
								} }
							/>
						</li>
						<li>
							<Btn title="Month" style={ { main: 'inline', size: 'small', color: 'dim' } }
								active={ scale === 'month' }
								onClick={ () => {
									setScale('month');
									setData(_data.month);
								} }
							/>
						</li>
						<li>
							<Btn title="Year" style={ { main: 'inline', size: 'small', color: 'dim' } }
								active={ scale === 'year' }
								onClick={ () => {
									setScale('year');
									setData(_data.year);
								} }
							/>
						</li>
					</ul>

					{/* Date range (calendar trigger) */}
					<Btn style={ { main: 'general', size: 'small', color: 'white' } }
						icon={ <IconCal /> }
						title={ `${ formatDate(data[0].x) } - ${ formatDate(data[data.length - 1].x) }` }
					/>
				</div>

				{/* Chart */}
				<ResponsiveContainer height={ 400 } width="100%">
					<ComposedChart data={ data } margin={ { top: 10, right: 10, bottom: 10, left: 10 } }>

						{/* Area gradient color */}
						<defs>
							<linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={ colors.line } stopOpacity={ 0.1 }/>
								<stop offset="95%" stopColor={ colors.line } stopOpacity={ 0 }/>
							</linearGradient>
						</defs>

						{/* Axis */}
						<XAxis dataKey="x" scale="point" domain={ ['auto', 'auto'] }
							tick={ <AxisTick formatter={ v => formatDate(v) }/> }
							axisLine={ { opacity: 0.2 } } tickLine={ { opacity: 0.2 } }
						/>

						<YAxis orientation="right" domain={ ['auto', 'auto'] } tick={ <AxisTick axis="y" /> }
							axisLine={ { opacity: 0.2 } } tickLine={ { opacity: 0.2 } }
						/>

						{/* Area gradient (under the line so goes first) */}
						<Area dataKey="y" type="monotone" stroke={ null }
							fillOpacity={ 1 } fill="url(#areaGradient)"
							dot={ false } activeDot={ false }
						/>

						{/* Tooltip */}
						<Tooltip cursor={ { opacity: 0.4, strokeWidth: 1, strokeDasharray: '5, 5' }  }
							content={ (e: any) => TooltipCustom(e, scale) }
						/>

						{/* Line */}
						<Line dataKey="y" type="monotone" stroke={ colors.line } strokeWidth={ 2 }
							dot={ <Dot /> } activeDot={ <Dot active /> }
						/>

					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</ContentBlock>
	);
});
