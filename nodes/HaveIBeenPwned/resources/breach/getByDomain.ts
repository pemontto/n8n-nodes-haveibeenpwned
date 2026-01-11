import type { INodeProperties } from 'n8n-workflow';

export const getByDomainFields: INodeProperties[] = [
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g., example.com',
		description: 'The domain to search for breached email addresses. Must be a domain you have verified ownership of in your HIBP account.',
		displayOptions: {
			show: {
				resource: ['breach'],
				operation: ['getByDomain'],
			},
		},
	},
];
