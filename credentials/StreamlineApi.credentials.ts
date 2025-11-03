import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class StreamlineApi implements ICredentialType {
	name = 'StreamlineApi';

	displayName = 'Streamline API';

	documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';

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
			url: '/api/order-data',
			method: 'GET',
		},
	};
}
