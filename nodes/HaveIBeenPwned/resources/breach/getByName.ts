import type { INodeProperties } from 'n8n-workflow';

export const getByNameFields: INodeProperties[] = [
	{
		displayName: 'Breach Name',
		name: 'breachName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g., Adobe',
		description: 'Name of the breach to retrieve (e.g., "Adobe", "LinkedIn")',
		displayOptions: {
			show: {
				resource: ['breach'],
				operation: ['getByName'],
			},
		},
	},
];
