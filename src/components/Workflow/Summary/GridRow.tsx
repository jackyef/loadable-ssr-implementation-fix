/**
 * Summary grid row component
 */
import _ from 'lodash';
import moment from 'moment';
import React from 'react';

import { Row, RowProps, Input } from '@scc/scc-ui-kit';

type RowComponentProps = RowProps;

/**
 * Row component
 */
const RowComponent: React.SFC<RowComponentProps> = props => {
	return (
		<Row { ...props } edit={ false } >
			<Input name="post_id" />
			<Input name="date_create" getRepr={ value => moment(value).format('DD.MM.YYYY - HH:mm') } />
			<Input name="media_type" getRepr={ value => _.get(value, 'name') } />
			<Input name="views" />
		</Row>
	);
};

export default RowComponent;
