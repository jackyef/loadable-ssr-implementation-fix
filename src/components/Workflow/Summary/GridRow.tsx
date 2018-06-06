/**
 * Summary grid row component
 */
import _ from 'lodash';
import moment from 'moment';
import React from 'react';

import { GridRow, GridRowProps, FieldInput as Input } from '@scc/scc-ui-kit/addons';

type RowComponentProps = GridRowProps;

/**
 * Row component
 */
const RowComponent: React.SFC<RowComponentProps> = props => {
	return (
		<GridRow { ...props } edit={ false } >
			<Input name="post_id" />
			<Input name="date_create" getRepr={ value => moment(value).format('DD.MM.YYYY - HH:mm') } />
			<Input name="media_type" getRepr={ value => _.get(value, 'name') } />
			<Input name="views" />
		</GridRow>
	);
};

export default RowComponent;
