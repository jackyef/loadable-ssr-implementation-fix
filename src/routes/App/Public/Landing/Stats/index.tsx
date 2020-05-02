/**
 * Block that describes channel's statistics
 * feature with short description and demo
 * @module Stats
 */
import React from 'react';

import { Heading, Text, Paragraph, Box, ContentBlock } from '@tg/elm';

// const dateFormat = 'YYYY-MM-DD';

// const _data = {
// 	week: [
// 		{ x: moment().subtract(6, 'days').format(dateFormat), y: 3800 },
// 		{ x: moment().subtract(5, 'days').format(dateFormat), y: 4200 },
// 		{ x: moment().subtract(4, 'days').format(dateFormat), y: 4000 },
// 		{ x: moment().subtract(3, 'days').format(dateFormat), y: 4300 },
// 		{ x: moment().subtract(2, 'days').format(dateFormat), y: 4400 },
// 		{ x: moment().subtract(1, 'days').format(dateFormat), y: 4800 },
// 		{ x: moment().format(dateFormat), y: 5000 }
// 	],

// 	month: [
// 		{ x: '2019-07-01', y: 2000 },
// 		{ x: '2019-07-08', y: 2300 },
// 		{ x: '2019-07-15', y: 2800 },
// 		{ x: '2019-07-22', y: 2850 },
// 		{ x: '2019-07-30', y: 3600 }
// 	],

// 	year: [
// 		{ x: '2018-12-01', y: 100 },
// 		{ x: '2019-01-01', y: 200 },
// 		{ x: '2019-02-01', y: 300 },
// 		{ x: '2019-03-01', y: 500 },
// 		{ x: '2019-04-01', y: 400 },
// 		{ x: '2019-05-01', y: 600 },
// 		{ x: '2019-06-01', y: 900 },
// 		{ x: '2019-07-01', y: 2000 },
// 		{ x: '2019-08-01', y: 4800 }
// 	]
// };

type Props = { children: any };

/**
 * Component
 */
export const Stats: React.FC<Props> = React.forwardRef((props, ref) => {
	return (
		<ContentBlock ref={ ref } bg="white_100">
			<Box>
				<Text size={ 12 } color="blue_100">{ 'Analise' }</Text>
				<Heading h={ 2 } mb={ 5 } title="Analise what people like and how fast your channel grows" />
				<Paragraph size={ 18 } color="black_80">{
					'Unleash your creativity, plan projects from all angles, ' +
					'and create centralized hubs of information to keep everyone in the loop. '
				}</Paragraph>
			</Box>
		</ContentBlock>
	);
});
