import { AxiosRequestConfig, AxiosInstance } from 'axios';

export type Cfg = {
	store: LocalForage;
};

export type Req = {
	method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
	url: string;
};

export type CacheConfig = {
	maxAge?: number;
	store: LocalForage;
	debug?: boolean;
	limit?: number;
	invalidate: (cfg: Cfg, req: Req) => Promise<void>;
	exclude?: {
		query?: boolean;
		paths?: string[];
	};
};

export type AxiosRequestConfigWithCache = AxiosRequestConfig & { cache?: CacheConfig; };

declare module 'axios-cache-adapter' {
	export function setup(config: AxiosRequestConfigWithCache): AxiosInstance;
}
