import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Streamline implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Streamline',
		name: 'streamline',
		icon: 'file:logo.svg',
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Call Streamline APIs',
		defaults: { name: 'Streamline' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'streamlineApi', required: true }],
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
					{ name: 'Create a Discount', value: 'createADiscount' },
					{ name: 'Get a Product', value: 'getAProduct' },
					{ name: 'Get AI Product Recommendation', value: 'getAiProductRecommendation' },
					{ name: 'Get an Order', value: 'getAnOrder' },
					{ name: 'Get Inventory Location', value: 'getInventoryLocations' },
					{ name: 'Get Many Order', value: 'getManyOrders' },
					// { name: 'Get Product List', value: 'getProductList' },
					// { name: 'Update Product', value: 'updateProduct' },
					// { name: 'Update Variant', value: 'updateVariant' },
					// { name: 'Update Product Description', value: 'updateProductDescription' },
				],
				default: 'getAnOrder',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['getAnOrder'] } },	
				options: [
					{
						name: 'Get an Order',
						value: 'get',
						action: 'Get an order',
						description: 'Get an order using email or order number',
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
				displayOptions: { show: { resource: ['getAnOrder'], operation: ['get'] } },
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
				displayOptions: { show: { resource: ['getAnOrder'], operation: ['get'] } },
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
				displayOptions: { show: { resource: ['getAnOrder'], operation: ['get'] } },
				default: 'llm-ready',
				routing: {
					send: {
						property: 'format',
						type: 'query',
					},
				},
			},
			// ---- Get Order List (uses /api/order-data with page & size) ----
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['getManyOrders'] } },
				options: [
					{
						name: 'Get Many Orders',
						value: 'get',
						action: 'List orders with pagination',
						description: 'Get paginated list of all orders (calls order-data API)',
						routing: { request: { method: 'GET', url: '/api/order-data' } },
					},
				],
				default: 'get',
			},
			{
				displayName: 'Page',
				description: 'Page number (1-based). Use 1 for the first page.',
				name: 'page',
				type: 'number',
				displayOptions: { show: { resource: ['getManyOrders'], operation: ['get'] } },
				default: 1,
				typeOptions: { minValue: 1, maxValue: 1000 },
				routing: {
					send: { property: 'page', type: 'query' },
				},
			},
			{
				displayName: 'Items per Page',
				description: 'Number of orders per page (max 10 for this endpoint)',
				name: 'size',
				type: 'number',
				displayOptions: { show: { resource: ['getManyOrders'], operation: ['get'] } },
				default: 10,
				typeOptions: { minValue: 1, maxValue: 10 },
				routing: {
					send: { property: 'size', type: 'query' },
				},
			},
			{
				displayName: 'Format',
				name: 'format',
				type: 'hidden',
				displayOptions: { show: { resource: ['getManyOrders'], operation: ['get'] } },
				default: 'llm-ready',
				routing: {
					send: { property: 'format', type: 'query' },
				},
			},
			// ---- Get AI Product Recommendation ----
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


			// ---- Get a product ----
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['getAProduct'] } },
				options: [
					{
						name: 'Get a Product',
						value: 'get',
						action: 'Get a product',
						description: 'Get a product by title',
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
						resource: ['getAProduct'],
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
				displayOptions: {
					show: {
						resource: ['getAProduct'],
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


			// ---- Get Product List ----
			// {
			// 	displayName: 'Operation',
			// 	name: 'operation',
			// 	type: 'options',
			// 	noDataExpression: true,
			// 	displayOptions: { show: { resource: ['getProductList'] } },
			// 	options: [
			// 		{
			// 			name: 'List Products',
			// 			value: 'get',
			// 			action: 'List products (catalog)',
			// 			description: 'Get paginated product catalog',
			// 			routing: { request: { method: 'GET', url: '/api/product-list' } },
			// 		},
			// 	],
			// 	default: 'get',
			// },
			// {
			// 	displayName: 'Limit',
			// 	description: 'Maximum number of products to return',
			// 	name: 'limit',
			// 	type: 'number',
			// 	displayOptions: { show: { resource: ['getProductList'], operation: ['get'] } },
			// 	default: 50,
			// 	typeOptions: { minValue: 1, maxValue: 250 },
			// 	routing: { send: { property: 'limit', type: 'query' } },
			// },
			// {
			// 	displayName: 'After Cursor',
			// 	description: 'Optional. Use endCursor from the previous response to fetch the next page. Leave empty for the first page.',
			// 	name: 'after',
			// 	type: 'string',
			// 	displayOptions: { show: { resource: ['getProductList'], operation: ['get'] } },
			// 	default: '',
			// 	routing: { send: { property: 'after', type: 'query' } },
			// },
			// {
			// 	displayName: 'Before Cursor',
			// 	description: 'Optional. Use startCursor from the previous response to fetch the previous page. Leave empty for the first request.',
			// 	name: 'before',
			// 	type: 'string',
			// 	displayOptions: { show: { resource: ['getProductList'], operation: ['get'] } },
			// 	default: '',
			// 	routing: { send: { property: 'before', type: 'query' } },
			// },


			// ---- Get Inventory Locations ----
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['getInventoryLocations'] } },
				options: [
					{
						name: 'Get Inventory Locations',
						value: 'get',
						action: 'Get store locations',
						description: 'Retrieve Store locations',
						routing: { request: { method: 'GET', url: '/products/locations' } },
					},
				],
				default: 'get',
			},
			{
				displayName: 'Format',
				name: 'format',
				type: 'hidden',
				displayOptions: { show: { resource: ['getInventoryLocations'], operation: ['get'] } },
				default: 'llm-ready',
				routing: { send: { property: 'format', type: 'query' } },
			},


			// ---- Create a discount ----
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['createADiscount'] } },
				options: [
					{
						name: 'Create a Discount',
						value: 'create',
						action: 'Create a discount',
						description: 'Create a new discount',
						routing: { request: { method: 'POST', url: '/api/create-discount-code' } },
					},
				],
				default: 'create',
			},
			{
				displayName: 'Title',
				description: 'Discount title (e.g. "Summer Sale")',
				name: 'title',
				type: 'string',
				required: true,
				displayOptions: { show: { resource: ['createADiscount'], operation: ['create'] } },
				default: '',
				routing: { send: { property: 'title', type: 'body' } },
			},
			{
				displayName: 'Code',
				description: 'The discount code string (e.g. SAVE20)',
				name: 'code',
				type: 'string',
				required: true,
				displayOptions: { show: { resource: ['createADiscount'], operation: ['create'] } },
				default: '',
				routing: { send: { property: 'code', type: 'body' } },
			},
			{
				displayName: 'Customer Gets',
				description: 'JSON: what the customer gets (e.g. {"value":"PERCENTAGE","valueType":"percentage","valueNumber":20})',
				name: 'customerGets',
				type: 'string',
				required: true,
				displayOptions: { show: { resource: ['createADiscount'], operation: ['create'] } },
				default: '',
				placeholder: '{"value":"PERCENTAGE","valueType":"percentage","valueNumber":20}',
				routing: { send: { property: 'customerGets', type: 'body' } },
			},
			{
				displayName: 'Starts At',
				description: 'ISO date when the discount becomes active',
				name: 'startsAt',
				type: 'string',
				required: true,
				displayOptions: { show: { resource: ['createADiscount'], operation: ['create'] } },
				default: '',
				placeholder: '2025-01-01T00:00:00Z',
				routing: { send: { property: 'startsAt', type: 'body' } },
			},
			{
				displayName: 'Ends At',
				description: 'ISO date when the discount ends (optional)',
				name: 'endsAt',
				type: 'string',
				displayOptions: { show: { resource: ['createADiscount'], operation: ['create'] } },
				default: '',
				routing: { send: { property: 'endsAt', type: 'body' } },
			},
			{
				displayName: 'Usage Limit',
				description: 'Max number of times the code can be used (optional)',
				name: 'usageLimit',
				type: 'number',
				displayOptions: { show: { resource: ['createADiscount'], operation: ['create'] } },
				default: 0,
				routing: { send: { property: 'usageLimit', type: 'body' } },
			},
			{
				displayName: 'Applies Once Per Customer',
				description: 'Whether the discount applies only once per customer',
				name: 'appliesOncePerCustomer',
				type: 'boolean',
				displayOptions: { show: { resource: ['createADiscount'], operation: ['create'] } },
				default: false,
				routing: { send: { property: 'appliesOncePerCustomer', type: 'body' } },
			},


			// ---- Update Product ----
			// {
			// 	displayName: 'Operation',
			// 	name: 'operation',
			// 	type: 'options',
			// 	noDataExpression: true,
			// 	displayOptions: { show: { resource: ['updateProduct'] } },
			// 	options: [
			// 		{
			// 			name: 'Update',
			// 			value: 'update',
			// 			action: 'Update product',
			// 			description: 'Update product title, vendor, tags, status, etc.',
			// 			routing: { request: { method: 'GET', url: '/products/update-product' } },
			// 		},
			// 	],
			// 	default: 'update',
			// },
			// {
			// 	displayName: 'Product ID',
			// 	description: 'Shopify product GID or numeric ID',
			// 	name: 'productId',
			// 	type: 'string',
			// 	required: true,
			// 	displayOptions: { show: { resource: ['updateProduct'], operation: ['update'] } },
			// 	default: '',
			// 	routing: { send: { property: 'productId', type: 'query' } },
			// },
			// {
			// 	displayName: 'Title',
			// 	description: 'Product title',
			// 	name: 'title',
			// 	type: 'string',
			// 	displayOptions: { show: { resource: ['updateProduct'], operation: ['update'] } },
			// 	default: '',
			// 	routing: { send: { property: 'title', type: 'query' } },
			// },
			// {
			// 	displayName: 'Vendor',
			// 	name: 'vendor',
			// 	type: 'string',
			// 	displayOptions: { show: { resource: ['updateProduct'], operation: ['update'] } },
			// 	default: '',
			// 	routing: { send: { property: 'vendor', type: 'query' } },
			// },
			// {
			// 	displayName: 'Product Type',
			// 	name: 'productType',
			// 	type: 'string',
			// 	displayOptions: { show: { resource: ['updateProduct'], operation: ['update'] } },
			// 	default: '',
			// 	routing: { send: { property: 'productType', type: 'query' } },
			// },
			// {
			// 	displayName: 'Tags',
			// 	description: 'Comma-separated tags',
			// 	name: 'tags',
			// 	type: 'string',
			// 	displayOptions: { show: { resource: ['updateProduct'], operation: ['update'] } },
			// 	default: '',
			// 	routing: { send: { property: 'tags', type: 'query' } },
			// },
			// {
			// 	displayName: 'Status',
			// 	description: 'ACTIVE, DRAFT, or ARCHIVED',
			// 	name: 'status',
			// 	type: 'options',
			// 	displayOptions: { show: { resource: ['updateProduct'], operation: ['update'] } },
			// 	options: [
			// 		{ name: 'Active', value: 'ACTIVE' },
			// 		{ name: 'Draft', value: 'DRAFT' },
			// 		{ name: 'Archived', value: 'ARCHIVED' },
			// 	],
			// 	default: '',
			// 	routing: { send: { property: 'status', type: 'query' } },
			// },
			// {
			// 	displayName: 'Handle',
			// 	name: 'handle',
			// 	type: 'string',
			// 	displayOptions: { show: { resource: ['updateProduct'], operation: ['update'] } },
			// 	default: '',
			// 	routing: { send: { property: 'handle', type: 'query' } },
			// },
			// {
			// 	displayName: 'Format',
			// 	name: 'format',
			// 	type: 'hidden',
			// 	displayOptions: { show: { resource: ['updateProduct'], operation: ['update'] } },
			// 	default: 'llm-ready',
			// 	routing: { send: { property: 'format', type: 'query' } },
			// },



			// ---- Update Variant ----
			// {
			// 	displayName: 'Operation',
			// 	name: 'operation',
			// 	type: 'options',
			// 	noDataExpression: true,
			// 	displayOptions: { show: { resource: ['updateVariant'] } },
			// 	options: [
			// 		{
			// 			name: 'Update',
			// 			value: 'update',
			// 			action: 'Update variant',
			// 			description: 'Update variant price, SKU, options, etc.',
			// 			routing: { request: { method: 'GET', url: '/products/update-variant' } },
			// 		},
			// 	],
			// 	default: 'update',
			// },
			// {
			// 	displayName: 'Variant ID',
			// 	description: 'Shopify variant GID or numeric ID',
			// 	name: 'variantId',
			// 	type: 'string',
			// 	required: true,
			// 	displayOptions: { show: { resource: ['updateVariant'], operation: ['update'] } },
			// 	default: '',
			// 	routing: { send: { property: 'variantId', type: 'query' } },
			// },
			// {
			// 	displayName: 'Title',
			// 	name: 'title',
			// 	type: 'string',
			// 	displayOptions: { show: { resource: ['updateVariant'], operation: ['update'] } },
			// 	default: '',
			// 	routing: { send: { property: 'title', type: 'query' } },
			// },
			// {
			// 	displayName: 'Price',
			// 	name: 'price',
			// 	type: 'string',
			// 	displayOptions: { show: { resource: ['updateVariant'], operation: ['update'] } },
			// 	default: '',
			// 	routing: { send: { property: 'price', type: 'query' } },
			// },
			// {
			// 	displayName: 'Compare At Price',
			// 	name: 'compareAtPrice',
			// 	type: 'string',
			// 	displayOptions: { show: { resource: ['updateVariant'], operation: ['update'] } },
			// 	default: '',
			// 	routing: { send: { property: 'compareAtPrice', type: 'query' } },
			// },
			// {
			// 	displayName: 'SKU',
			// 	name: 'sku',
			// 	type: 'string',
			// 	displayOptions: { show: { resource: ['updateVariant'], operation: ['update'] } },
			// 	default: '',
			// 	routing: { send: { property: 'sku', type: 'query' } },
			// },
			// {
			// 	displayName: 'Barcode',
			// 	name: 'barcode',
			// 	type: 'string',
			// 	displayOptions: { show: { resource: ['updateVariant'], operation: ['update'] } },
			// 	default: '',
			// 	routing: { send: { property: 'barcode', type: 'query' } },
			// },
			// {
			// 	displayName: 'Inventory Policy',
			// 	description: 'deny or continue',
			// 	name: 'inventoryPolicy',
			// 	type: 'options',
			// 	displayOptions: { show: { resource: ['updateVariant'], operation: ['update'] } },
			// 	options: [
			// 		{ name: 'Deny', value: 'deny' },
			// 		{ name: 'Continue', value: 'continue' },
			// 	],
			// 	default: '',
			// 	routing: { send: { property: 'inventoryPolicy', type: 'query' } },
			// },
			// {
			// 	displayName: 'Format',
			// 	name: 'format',
			// 	type: 'hidden',
			// 	displayOptions: { show: { resource: ['updateVariant'], operation: ['update'] } },
			// 	default: 'llm-ready',
			// 	routing: { send: { property: 'format', type: 'query' } },
			// },





			// ---- Update Product Description ----
			// {
			// 	displayName: 'Operation',
			// 	name: 'operation',
			// 	type: 'options',
			// 	noDataExpression: true,
			// 	displayOptions: { show: { resource: ['updateProductDescription'] } },
			// 	options: [
			// 		{
			// 			name: 'Update',
			// 			value: 'update',
			// 			action: 'Update product description',
			// 			description: 'Update product body HTML description',
			// 			routing: { request: { method: 'POST', url: '/products/update-product-description' } },
			// 		},
			// 	],
			// 	default: 'update',
			// },
			// {
			// 	displayName: 'Product ID',
			// 	description: 'Shopify product GID or numeric ID',
			// 	name: 'productId',
			// 	type: 'string',
			// 	required: true,
			// 	displayOptions: { show: { resource: ['updateProductDescription'], operation: ['update'] } },
			// 	default: '',
			// 	routing: { send: { property: 'productId', type: 'body' } },
			// },
			// {
			// 	displayName: 'Description',
			// 	description: 'Product description (HTML supported)',
			// 	name: 'description',
			// 	type: 'string',
			// 	typeOptions: { rows: 4 },
			// 	required: true,
			// 	displayOptions: { show: { resource: ['updateProductDescription'], operation: ['update'] } },
			// 	default: '',
			// 	routing: { send: { property: 'description', type: 'body' } },
			// },
			// {
			// 	displayName: 'Format',
			// 	name: 'format',
			// 	type: 'hidden',
			// 	displayOptions: { show: { resource: ['updateProductDescription'], operation: ['update'] } },
			// 	default: 'llm-ready',
			// 	routing: { send: { property: 'format', type: 'body' } },
			// },
		],
	};
}
