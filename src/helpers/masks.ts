// Phone number patterns by country code
// TODO: Fill the list
const codes: any = {
	7: '(000) 000-00-00'
};

// Phone mask based on country code
export const phone = (code?: any) => ({
	mask: codes[code] || /^\d+$/
});

// Code mask
export const integersOnly = {
	mask: /^\d+$/
};
