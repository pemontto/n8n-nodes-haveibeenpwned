import type { INodeProperties } from 'n8n-workflow';
import { hashPasswordPreSend, parsePasswordResponse } from '../../GenericFunctions';

export const pwnedPasswordsOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['pwnedPasswords'],
		},
	},
	options: [
		{
			name: 'Check Password',
			value: 'checkPassword',
			action: 'Check if password is pwned',
			description:
				'Check if a password has been exposed in data breaches using k-anonymity (password is never sent to the API)',
			routing: {
				request: {
					method: 'GET',
					url: '', // Will be set by preSend hook
					skipSslCertificateValidation: false,
					// Pwned Passwords API doesn't require authentication
					// It's a separate service from the main HIBP API
				},
				send: {
					preSend: [hashPasswordPreSend],
				},
				output: {
					postReceive: [parsePasswordResponse],
				},
			},
		},
	],
	default: 'checkPassword',
};

export const pwnedPasswordsFields: INodeProperties[] = [
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: {
			password: true,
		},
		required: true,
		default: '',
		description:
			'Password to check. The password is hashed locally using SHA-1, and only the first 5 characters of the hash are sent to the API (k-anonymity). The full password never leaves your system.',
		displayOptions: {
			show: {
				resource: ['pwnedPasswords'],
				operation: ['checkPassword'],
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
				resource: ['pwnedPasswords'],
				operation: ['checkPassword'],
			},
		},
		options: [
			{
				displayName: 'Return Hash',
				name: 'returnHash',
				type: 'boolean',
				default: false,
				description: 'Whether to include the SHA-1 hash of the password in the output',
			},
		],
	},
];
