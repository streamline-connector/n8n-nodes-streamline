import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class StreamlineApi implements ICredentialType {
	name = 'streamlineApi';

	displayName = 'Streamline API';

	documentationUrl = 'https://support.streamlineconnector.com/support/solutions/articles/154000248449-how-to-get-your-store-id-for-streamline-connector';

	icon = 'file:logo.svg' as const;

	properties: INodeProperties[] = [
		{
			name: 'apiKey',
			type: 'string',
			default: '',
			displayName: 'Shop ID',
			description: 'Your Shopify shop ID. Find it in the Streamline Connector app under API Keys.',
			typeOptions: {
				password: true,
			},
		},
		{
			name: 'secretKey',
			type: 'string',
			default: '',
			required: true,
			displayName: 'API Key',
			description: 'Your secret API key. Generate it in the Streamline Connector app under API Keys.',
			typeOptions: {
				password: true,
			},
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				shopId: '={{$credentials.apiKey}}',
			},
			headers: {
				Authorization: '=Bearer {{$credentials.secretKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://streamline-connector-for-voiceflow.gadget.app',
			url: '/products/inventory',
			method: 'GET',
			qs: {
				shopId: '={{$credentials.apiKey}}',
				productTitle: 'test',
			},
			headers: {
				Authorization: '=Bearer {{$credentials.secretKey}}',
			},
		},
	};
}
