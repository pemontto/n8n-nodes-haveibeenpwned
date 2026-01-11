import type {
	IDataObject,
	IExecuteSingleFunctions,
	INodeExecutionData,
	INodeProperties,
	IN8nHttpFullResponse,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

async function handleStealerLogByEmailResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	if (response.statusCode === 404) {
		const email = this.getNodeParameter('email') as string;
		return [
			{
				json: {
					email,
					found: false,
					websites: [],
					message: 'Email has not been found in any stealer logs',
				},
			},
		];
	}

	if (response.statusCode !== 200) {
		throw new NodeApiError(this.getNode(), response as unknown as JsonObject, {
			httpCode: String(response.statusCode),
		});
	}

	const websites = response.body as IDataObject[];
	const email = this.getNodeParameter('email') as string;

	return [
		{
			json: {
				email,
				found: true,
				count: websites.length,
				websites,
			},
		},
	];
}

async function handleStealerLogByWebsiteDomainResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	if (response.statusCode === 404) {
		const domain = this.getNodeParameter('websiteDomain') as string;
		return [
			{
				json: {
					websiteDomain: domain,
					found: false,
					emails: [],
					message: 'No stealer log entries found for this website domain',
				},
			},
		];
	}

	if (response.statusCode !== 200) {
		throw new NodeApiError(this.getNode(), response as unknown as JsonObject, {
			httpCode: String(response.statusCode),
		});
	}

	const emails = response.body as IDataObject[];
	const domain = this.getNodeParameter('websiteDomain') as string;

	return [
		{
			json: {
				websiteDomain: domain,
				found: true,
				count: emails.length,
				emails,
			},
		},
	];
}

async function handleStealerLogByEmailDomainResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	if (response.statusCode === 404) {
		const domain = this.getNodeParameter('emailDomain') as string;
		return [
			{
				json: {
					emailDomain: domain,
					found: false,
					entries: [],
					message: 'No stealer log entries found for this email domain',
				},
			},
		];
	}

	if (response.statusCode !== 200) {
		throw new NodeApiError(this.getNode(), response as unknown as JsonObject, {
			httpCode: String(response.statusCode),
		});
	}

	const entries = response.body as IDataObject[];
	const domain = this.getNodeParameter('emailDomain') as string;

	if (Array.isArray(entries) && entries.length > 0) {
		return entries.map((entry) => ({
			json: {
				emailDomain: domain,
				found: true,
				...entry,
			},
		}));
	}

	return items;
}

export const stealerLogOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['stealerLog'],
		},
	},
	options: [
		{
			name: 'Get by Email',
			value: 'getByEmail',
			action: 'Get stealer logs for an email',
			description: 'Get website domains from stealer logs where an email address has been captured',
			routing: {
				request: {
					method: 'GET',
					url: '=/stealerlogsbyemail/{{encodeURIComponent($parameter.email)}}',
					ignoreHttpStatusErrors: true,
				},
				output: {
					postReceive: [handleStealerLogByEmailResponse],
				},
			},
		},
		{
			name: 'Get by Website Domain',
			value: 'getByWebsiteDomain',
			action: 'Get emails for a website domain',
			description: 'Get email addresses that have been captured in stealer logs for a specific website domain',
			routing: {
				request: {
					method: 'GET',
					url: '=/stealerlogsbywebsitedomain/{{encodeURIComponent($parameter.websiteDomain)}}',
					ignoreHttpStatusErrors: true,
				},
				output: {
					postReceive: [handleStealerLogByWebsiteDomainResponse],
				},
			},
		},
		{
			name: 'Get by Email Domain',
			value: 'getByEmailDomain',
			action: 'Get stealer logs for an email domain',
			description: 'Get email aliases and associated website domains from stealer logs for an email domain',
			routing: {
				request: {
					method: 'GET',
					url: '=/stealerlogsbyemaildomain/{{encodeURIComponent($parameter.emailDomain)}}',
					ignoreHttpStatusErrors: true,
				},
				output: {
					postReceive: [handleStealerLogByEmailDomainResponse],
				},
			},
		},
	],
	default: 'getByEmail',
};

export const stealerLogFields: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		default: '',
		description: 'Email address to check for stealer log entries',
		displayOptions: {
			show: {
				resource: ['stealerLog'],
				operation: ['getByEmail'],
			},
		},
	},
	{
		displayName: 'Website Domain',
		name: 'websiteDomain',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g., example.com',
		description: 'Website domain to search for captured email addresses',
		displayOptions: {
			show: {
				resource: ['stealerLog'],
				operation: ['getByWebsiteDomain'],
			},
		},
	},
	{
		displayName: 'Email Domain',
		name: 'emailDomain',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g., example.com',
		description: 'Email domain to search for stealer log entries. Must be a domain you have verified ownership of.',
		displayOptions: {
			show: {
				resource: ['stealerLog'],
				operation: ['getByEmailDomain'],
			},
		},
	},
];
