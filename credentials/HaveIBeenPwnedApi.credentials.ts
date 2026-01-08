import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class HaveIBeenPwnedApi implements ICredentialType {
	name = 'haveIBeenPwnedApi';

	displayName = 'Have I Been Pwned API';

	icon: Icon = { light: 'file:../icons/hibp.svg', dark: 'file:../icons/hibp.dark.svg' };

	documentationUrl = 'https://haveibeenpwned.com/API/v3';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your HIBP API key from haveibeenpwned.com/API/Key',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'hibp-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://haveibeenpwned.com/api/v3',
			url: '/latestbreach',
			method: 'GET',
		},
	};
}
