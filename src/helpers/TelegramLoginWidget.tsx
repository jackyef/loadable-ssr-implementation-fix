import _ from 'lodash';
import React from 'react';

type Props = {
	botName: string;
	dataSize?: 'small' | 'medium' | 'large';
	requestAccess?: 'read' | 'write';
	usePic?: boolean;
	dataOnauth?: (user: any) => any;
	authUrl?: string;
	className?: string;
};

export default class extends React.Component<Props> {

	static defaultProps: Partial<Props> = {
		botName: null,
		dataSize: null,
		requestAccess: 'write',
		dataOnauth: _.noop,
		usePic: false
	};

	protected instance: any;

	constructor(props: Props) {
		super(props);

		// Self ref
		this.instance = React.createRef();
	}

	componentDidMount() {
		const { botName, dataSize, requestAccess, usePic, dataOnauth, authUrl } = this.props;

		(window as any).TelegramLoginWidget = {
			dataOnauth: (user: any) => dataOnauth(user)
		};

		const script = document.createElement('script');
		script.src = 'https://telegram.org/js/telegram-widget.js?4';
		script.setAttribute('data-auth-url', authUrl || null);
		script.setAttribute('data-telegram-login', botName || null);
		script.setAttribute('data-size', dataSize || 'large');
		script.setAttribute('data-request-access', requestAccess || 'write');
		script.setAttribute('data-userpic', !usePic as any);
		script.setAttribute('data-onauth', dataOnauth === _.noop ? null : 'TelegramLoginWidget.dataOnauth(user)');
		script.async = true;
		this.instance.current.appendChild(script);
	}

	render() {
		return (
			<div className={ this.props.className } ref={ this.instance }>
				{ this.props.children }
			</div>
		);
	}
}
