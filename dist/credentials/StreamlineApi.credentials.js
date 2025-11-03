"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamlineApi = void 0;
class StreamlineApi {
    constructor() {
        this.name = 'StreamlineApi';
        this.displayName = 'Streamline API';
        this.documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
        this.properties = [
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
        this.authenticate = {
            type: 'generic',
            properties: {
                qs: {
                    shopId: '={{$credentials.apiKey}}',
                },
            },
        };
    }
}
exports.StreamlineApi = StreamlineApi;
//# sourceMappingURL=StreamlineApi.credentials.js.map