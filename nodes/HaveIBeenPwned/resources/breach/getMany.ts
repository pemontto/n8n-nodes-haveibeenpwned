import type { INodeProperties } from 'n8n-workflow';

export const getManyFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['breach'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Domain',
				name: 'domain',
				type: 'string',
				default: '',
				placeholder: 'e.g., adobe.com',
				description: 'Filter breaches by domain',
				routing: {
					send: {
						type: 'query',
						property: 'domain',
						value: '={{ $value || undefined }}',
					},
				},
			},
		],
	},
];
