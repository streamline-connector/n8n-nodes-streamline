"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Streamline = void 0;
class Streamline {
    constructor() {
        this.description = {
            displayName: 'Streamline',
            name: 'streamline',
            icon: 'file:logo.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Call Streamline APIs',
            defaults: { name: 'Streamline' },
            inputs: ["main"],
            outputs: ["main"],
            credentials: [{ name: 'StreamlineApi', required: true }],
            requestDefaults: {
                baseURL: 'https://streamline-connector-for-voiceflow.gadget.app',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer gsk-xGZjqxkDrmeYjdYWGQmpBCcZhFzzNfh2',
                },
            },
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        { name: 'Get Shopify Order', value: 'getShopifyOrder' },
                        { name: 'Get AI Product Recommendation', value: 'getAiProductRecommendation' },
                        { name: 'Get Product Inventory', value: 'getProductInventory' },
                    ],
                    default: 'getShopifyOrder',
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: { show: { resource: ['getShopifyOrder'] } },
                    options: [
                        {
                            name: 'Get Order(s)',
                            value: 'get',
                            action: 'Get shopify order s',
                            description: 'Get Shopify Order/s using email or order number',
                            routing: { request: { method: 'GET', url: '/api/order-data' } },
                        },
                    ],
                    default: 'get',
                },
                {
                    displayName: 'Customer Email',
                    description: 'Email of the customer to look up orders for',
                    name: 'email',
                    type: 'string',
                    placeholder: 'name@email.com',
                    displayOptions: { show: { resource: ['getShopifyOrder'], operation: ['get'] } },
                    default: '',
                    routing: {
                        send: {
                            property: 'email',
                            type: 'query',
                        },
                    },
                },
                {
                    displayName: 'Order Number',
                    description: 'Specific order number to retrieve',
                    name: 'orderNumber',
                    type: 'string',
                    displayOptions: { show: { resource: ['getShopifyOrder'], operation: ['get'] } },
                    default: '',
                    routing: {
                        send: {
                            property: 'orderNumber',
                            type: 'query',
                        },
                    },
                },
                {
                    displayName: 'Format',
                    description: 'The format of the response. Choose either LLM enriched data or RAW.',
                    name: 'format',
                    type: 'hidden',
                    displayOptions: { show: { resource: ['getShopifyOrder'], operation: ['get'] } },
                    default: 'llm-ready',
                    routing: {
                        send: {
                            property: 'format',
                            type: 'query',
                        },
                    },
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: { show: { resource: ['getAiProductRecommendation'] } },
                    options: [
                        {
                            name: 'Get Recommendations',
                            value: 'get',
                            action: 'Get ai product recommendations',
                            description: 'Get AI-based product suggestions',
                            routing: { request: { method: 'GET', url: '/products/recommendations' } },
                        },
                    ],
                    default: 'get',
                },
                {
                    displayName: 'Query',
                    description: 'Natural language search query for product recommendations',
                    required: true,
                    name: 'searchQuery',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['getAiProductRecommendation'],
                            operation: ['get'],
                        },
                    },
                    default: '',
                    routing: {
                        send: {
                            property: 'searchQuery',
                            type: 'query',
                        },
                    },
                },
                {
                    displayName: 'Format',
                    description: 'The format of the response. Choose either LLM enriched data or RAW.',
                    name: 'format',
                    type: 'hidden',
                    displayOptions: {
                        show: {
                            resource: ['getAiProductRecommendation'],
                            operation: ['get'],
                        },
                    },
                    default: 'llm-ready',
                    routing: {
                        send: {
                            property: 'format',
                            type: 'query',
                        },
                    },
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: { show: { resource: ['getProductInventory'] } },
                    options: [
                        {
                            name: 'Get Inventory',
                            value: 'get',
                            action: 'Get product inventory',
                            description: 'Retrieve inventory levels for a product',
                            routing: { request: { method: 'GET', url: '/products/inventory' } },
                        },
                    ],
                    default: 'get',
                },
                {
                    displayName: 'Product Title',
                    description: 'Title of the product to check inventory for',
                    required: true,
                    name: 'productTitle',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['getProductInventory'],
                            operation: ['get'],
                        },
                    },
                    default: '',
                    routing: {
                        send: {
                            property: 'productTitle',
                            type: 'query',
                        },
                    },
                },
                {
                    displayName: 'Format',
                    description: 'The format of the response. Choose either LLM enriched data or RAW.',
                    name: 'format',
                    type: 'hidden',
                    displayOptions: { show: { resource: ['getShopifyOrder'], operation: ['get'] } },
                    default: 'llm-ready',
                    routing: {
                        send: {
                            property: 'format',
                            type: 'query',
                        },
                    },
                },
            ],
        };
    }
}
exports.Streamline = Streamline;
//# sourceMappingURL=Streamline.node.js.map