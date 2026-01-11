import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { breachOperations, breachFields } from './resources/breach';
import { pwnedPasswordsOperations, pwnedPasswordsFields } from './resources/pwnedPasswords';
import { pasteOperations, pasteFields } from './resources/paste';
import { stealerLogOperations, stealerLogFields } from './resources/stealerLog';
import { domainOperations, domainFields } from './resources/domain';
import { subscriptionOperations, subscriptionFields } from './resources/subscription';

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
						resource: ['breach', 'paste', 'stealerLog', 'domain', 'subscription'],
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
						name: 'Domain',
						value: 'domain',
					},
					{
						name: 'Password',
						value: 'pwnedPasswords',
					},
					{
						name: 'Paste',
						value: 'paste',
					},
					{
						name: 'Stealer Log',
						value: 'stealerLog',
					},
					{
						name: 'Subscription',
						value: 'subscription',
					},
				],
				default: 'breach',
			},
			breachOperations,
			...breachFields,
			pwnedPasswordsOperations,
			...pwnedPasswordsFields,
			pasteOperations,
			...pasteFields,
			stealerLogOperations,
			...stealerLogFields,
			domainOperations,
			...domainFields,
			subscriptionOperations,
			...subscriptionFields,
		],
	};
}
