import type { INodeProperties } from 'n8n-workflow';

export const domainOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['domain'],
		},
	},
	options: [
		{
			name: 'Get Subscribed',
			value: 'getSubscribed',
			action: 'Get subscribed domains',
			description: 'Get all domains that have been verified and added to your account',
			routing: {
				request: {
					method: 'GET',
					url: '/subscribeddomains',
				},
			},
		},
	],
	default: 'getSubscribed',
};

export const domainFields: INodeProperties[] = [];
// No additional fields needed - this endpoint takes no parameters
