export type EmailError = Error & {
	response?: {
		body?: string;
		data?: string;
		statusCode?: number;
	};
};
