import type { INodeProperties } from 'n8n-workflow';

export const subscriptionOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['subscription'],
		},
	},
	options: [
		{
			name: 'Get Status',
			value: 'getStatus',
			action: 'Get subscription status',
			description: 'Get current subscription details and API rate limits',
			routing: {
				request: {
					method: 'GET',
					url: '/subscription/status',
				},
			},
		},
	],
	default: 'getStatus',
};

export const subscriptionFields: INodeProperties[] = [];
// No additional fields needed - this endpoint takes no parameters
