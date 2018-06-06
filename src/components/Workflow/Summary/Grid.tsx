/**
 * Workflow summary Grid component
 */
import _ from 'lodash';
import React from 'react';

import { Grid, StoreGrid, IStoreGrid, StoreGridAPI } from '@scc/scc-ui-kit';

import { axiosInstance, api } from '../../../config';

import Row from './GridRow';
import Header from './GridHeader';

// API store
const apiStore = new StoreGridAPI(axiosInstance);
apiStore.fetchURL = api.data.posts;

// Grid store
export const store = new StoreGrid('summary', null, apiStore);
store.chooser = data => _.get(data, 'result', null);

type Props = {

	/**
	 * Grid store instance
	 */
	store?: IStoreGrid;
};

/**
 * Grid component
 */
const GridComponent: React.SFC<Props> = ({ store }) => {
	return (
		<Grid inject={ store } inlineEdit={ false }
			rowKey={ data => _.get(data, 'post_id') }
			componentRow={ rowProps => <Row { ...rowProps } /> }
			componentHeader={ () => <Header /> }
		/>
	);
};

export default GridComponent;
