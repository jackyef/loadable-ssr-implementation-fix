type Masked = {
	resolve: (value: string) => string;
	validate: (value: string) => boolean;
};

declare module 'imask' {
	export function createMask(opts: { mask: string }): Masked;
}
