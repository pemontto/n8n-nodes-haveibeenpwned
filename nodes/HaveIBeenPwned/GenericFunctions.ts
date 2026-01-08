import { createHash } from 'crypto';
import type {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	IN8nHttpFullResponse,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

/**
 * preSend hook for Pwned Passwords that:
 * 1. Computes SHA-1 hash of the password
 * 2. Stores the hash suffix in context for postReceive
 * 3. Modifies URL to use k-anonymity (only send first 5 chars)
 */
export async function hashPasswordPreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const password = this.getNodeParameter('password') as string;

	// Compute SHA-1 hash (uppercase)
	const hash = createHash('sha1').update(password).digest('hex').toUpperCase();
	const prefix = hash.substring(0, 5);

	// Store the full hash and suffix for postReceive to use
	const nodeContext = this.getContext('node');
	nodeContext.passwordHash = hash;
	nodeContext.hashSuffix = hash.substring(5);

	// Modify the URL to use only the prefix (k-anonymity)
	requestOptions.url = `https://api.pwnedpasswords.com/range/${prefix}`;

	return requestOptions;
}

/**
 * postReceive hook for Pwned Passwords that:
 * 1. Parses the text/plain response
 * 2. Finds matching suffix in the response
 * 3. Returns structured result
 */
export async function parsePasswordResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	const nodeContext = this.getContext('node');
	const suffix = nodeContext.hashSuffix as string;
	const hash = nodeContext.passwordHash as string;

	// Parse text/plain response: each line is "SUFFIX:COUNT"
	const body = response.body as string;
	const lines = body.split('\n');

	let found = false;
	let count = 0;

	for (const line of lines) {
		const [hashSuffix, countStr] = line.trim().split(':');
		if (hashSuffix === suffix) {
			found = true;
			count = parseInt(countStr, 10);
			break;
		}
	}

	const options = this.getNodeParameter('options', {}) as { returnHash?: boolean };

	return [
		{
			json: {
				found,
				count,
				message: found
					? `Password has been seen ${count.toLocaleString()} times in data breaches`
					: 'Password has not been found in any known data breaches',
				...(options.returnHash && { hash }),
			},
		},
	];
}

/**
 * postReceive hook for Breach lookups that handles 404 as "not breached"
 */
export async function handleBreachResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	// 404 means email not found in any breaches - this is a valid result
	if (response.statusCode === 404) {
		const email = this.getNodeParameter('email') as string;
		return [
			{
				json: {
					email,
					breached: false,
					breaches: [],
					message: 'Email has not been found in any known data breaches',
				},
			},
		];
	}

	// Throw error for non-200 responses
	if (response.statusCode !== 200) {
		throw new NodeApiError(this.getNode(), response as unknown as JsonObject, {
			httpCode: String(response.statusCode),
		});
	}

	// For successful responses, return the breaches
	const breaches = response.body as IDataObject[];
	const email = this.getNodeParameter('email') as string;

	// Return each breach as a separate item
	if (Array.isArray(breaches) && breaches.length > 0) {
		return breaches.map((breach) => ({
			json: {
				email,
				breached: true,
				...breach,
			},
		}));
	}

	return items;
}
