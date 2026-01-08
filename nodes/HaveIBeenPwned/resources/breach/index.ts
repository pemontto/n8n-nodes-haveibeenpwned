import type { INodeProperties } from 'n8n-workflow';
import { handleBreachResponse } from '../../GenericFunctions';
import { getByEmailFields } from './getByEmail';
import { getByNameFields } from './getByName';
import { getManyFields } from './getMany';

export const breachOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['breach'],
		},
	},
	options: [
		{
			name: 'Get by Email',
			value: 'getByEmail',
			action: 'Get breaches for an email',
			description: 'Get all breaches that an email address has been found in',
			routing: {
				request: {
					method: 'GET',
					url: '=/breachedaccount/{{encodeURIComponent($parameter.email)}}',
					qs: {
						truncateResponse: '={{ $parameter.options?.truncateResponse ? "true" : "false" }}',
					},
					ignoreHttpStatusErrors: true,
				},
				output: {
					postReceive: [handleBreachResponse],
				},
			},
		},
		{
			name: 'Get by Name',
			value: 'getByName',
			action: 'Get a breach by name',
			description: 'Get details of a specific breach by its name',
			routing: {
				request: {
					method: 'GET',
					url: '=/breach/{{encodeURIComponent($parameter.breachName)}}',
				},
			},
		},
		{
			name: 'Get Latest',
			value: 'getLatest',
			action: 'Get the latest breach',
			description: 'Get the most recently added breach',
			routing: {
				request: {
					method: 'GET',
					url: '/latestbreach',
				},
			},
		},
		{
			name: 'Get Many',
			value: 'getMany',
			action: 'Get all breaches',
			description: 'Get all breaches in the system',
			routing: {
				request: {
					method: 'GET',
					url: '/breaches',
				},
			},
		},
	],
	default: 'getByEmail',
};

export const breachFields: INodeProperties[] = [
	...getByEmailFields,
	...getByNameFields,
	...getManyFields,
];
