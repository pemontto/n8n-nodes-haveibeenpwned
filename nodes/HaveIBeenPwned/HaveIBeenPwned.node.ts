import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { breachOperations, breachFields } from './resources/breach';
import { pwnedPasswordsOperations, pwnedPasswordsFields } from './resources/pwnedPasswords';

export class HaveIBeenPwned implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Have I Been Pwned',
		name: 'haveIBeenPwned',
		icon: { light: 'file:../../icons/hibp.svg', dark: 'file:../../icons/hibp.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Check if emails or passwords have been exposed in data breaches',
		defaults: {
			name: 'Have I Been Pwned',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'haveIBeenPwnedApi',
				required: false,
				displayOptions: {
					show: {
						resource: ['breach'],
					},
				},
			},
		],
		requestDefaults: {
			baseURL: 'https://haveibeenpwned.com/api/v3',
			headers: {
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Breach',
						value: 'breach',
					},
					{
						name: 'Password',
						value: 'pwnedPasswords',
					},
				],
				default: 'breach',
			},
			breachOperations,
			...breachFields,
			pwnedPasswordsOperations,
			...pwnedPasswordsFields,
		],
	};
}
