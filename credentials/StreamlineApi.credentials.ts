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
			displayName: 'Streamline Shop ID',
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
		},
	};
}
