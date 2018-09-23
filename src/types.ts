export type Feature = {
	icon?: JSX.Element | string;
	title: string;
	desc: string;
};

export type Offer = {
	icon?: string | JSX.Element;
	title?: string;
	desc?: string;
	limit?: string;
	price?: {
		value: number;
		per: string;
		currency: string;
	};
};
