/**
 * Summary grid header
 */
import React from 'react';

/**
 * Header component
 */
const HeaderComponent: React.SFC<{}> = () => (
	<tr>
		<th>{ 'Channel ID' }</th>
		<th>{ 'Published' }</th>
		<th>{ 'Type' }</th>
		<th>{ 'Views' }</th>
	</tr>
);

export default HeaderComponent;
