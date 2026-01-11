import type {
	IDataObject,
	IExecuteSingleFunctions,
	INodeExecutionData,
	INodeProperties,
	IN8nHttpFullResponse,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

async function handlePasteResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	// 404 means email not found in any pastes
	if (response.statusCode === 404) {
		const email = this.getNodeParameter('email') as string;
		return [
			{
				json: {
					email,
					found: false,
					pastes: [],
					message: 'Email has not been found in any known pastes',
				},
			},
		];
	}

	if (response.statusCode !== 200) {
		throw new NodeApiError(this.getNode(), response as unknown as JsonObject, {
			httpCode: String(response.statusCode),
		});
	}

	const pastes = response.body as IDataObject[];
	const email = this.getNodeParameter('email') as string;

	if (Array.isArray(pastes) && pastes.length > 0) {
		return pastes.map((paste) => ({
			json: {
				email,
				found: true,
				...paste,
			},
		}));
	}

	return items;
}

export const pasteOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['paste'],
		},
	},
	options: [
		{
			name: 'Get by Email',
			value: 'getByEmail',
			action: 'Get pastes for an email',
			description: 'Get all pastes that an email address has been found in',
			routing: {
				request: {
					method: 'GET',
					url: '=/pasteaccount/{{encodeURIComponent($parameter.email)}}',
					ignoreHttpStatusErrors: true,
				},
				output: {
					postReceive: [handlePasteResponse],
				},
			},
		},
	],
	default: 'getByEmail',
};

export const pasteFields: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		default: '',
		description: 'Email address to check for pastes',
		displayOptions: {
			show: {
				resource: ['paste'],
				operation: ['getByEmail'],
			},
		},
	},
];
