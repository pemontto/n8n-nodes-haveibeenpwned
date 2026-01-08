import type { INodeProperties } from 'n8n-workflow';

export const getByEmailFields: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		default: '',
		description: 'Email address to check for breaches',
		displayOptions: {
			show: {
				resource: ['breach'],
				operation: ['getByEmail'],
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['breach'],
				operation: ['getByEmail'],
			},
		},
		options: [
			{
				displayName: 'Include Unverified',
				name: 'includeUnverified',
				type: 'boolean',
				default: false,
				description:
					'Whether to include unverified breaches (breaches where legitimacy has not been confirmed)',
				routing: {
					send: {
						type: 'query',
						property: 'includeUnverified',
						value: '={{ $value ? "true" : undefined }}',
					},
				},
			},
			{
				displayName: 'Truncate Response',
				name: 'truncateResponse',
				type: 'boolean',
				default: false,
				description: 'Whether to return only breach names (faster response)',
			},
		],
	},
];
