# n8n-nodes-streamline

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

This is an n8n community node that connects your **Shopify eCommerce data** to [n8n](https://n8n.io) through the **Streamline Connector API**. It enables you to retrieve products, orders, customers, and inventory data from Shopify to automate workflows and integrate with other services.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version History](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

For users on n8n v0.187.0+:

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-streamline` in **Enter npm package name**
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes
5. Select **Install**

After installation, the Streamline node will be available in your nodes panel.

### Manual Installation

For self-hosted n8n instances:

```bash
cd ~/.n8n/custom
npm install n8n-nodes-streamline
```

Restart n8n and the **Streamline** node will appear in your node list.

### Docker

To use this node with Docker:

```bash
docker run -it --rm \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -v ~/.n8n/custom:/home/node/custom \
  -e N8N_CUSTOM_EXTENSIONS="/home/node/custom/node_modules/n8n-nodes-streamline" \
  n8nio/n8n
```

## Operations

The Streamline node supports the following operations:

| Resource | Operation | Description |
|----------|-----------|-------------|
| **Products** | Get Products | Retrieve Shopify product data through Streamline |
| **Orders** | Get Orders | Fetch recent orders and order details |
| **Inventory** | Get Inventory | Retrieve stock levels and availability data |

## Credentials

To use the Streamline node, you need to set up Streamline API credentials:

1. In n8n, go to **Credentials → New**
2. Search for and select **Streamline API**
3. Enter your credentials:
   - **Streamline Shop ID** – Your Streamline access key (found in the app dashboard > Any endpoint page)
4. Click **Save** and test the connection

Once configured, select these credentials when using any Streamline node in your workflows.

### Getting API Credentials

To obtain your Streamline API credentials:

1. Visit [Streamline Connector](https://streamlineconnector.com)
2. Sign up or log in to your account
3. Navigate to your API settings
4. Generate or copy your API key

## Compatibility

- **Minimum n8n version:** 0.187.0
- **Tested with n8n version:** 1.0.0+
- **Node.js version:** 22+

## Usage

### Example Workflows

Here are some common use cases for the Streamline node:

**1. Sync Orders to Google Sheets**
- Trigger: Schedule (every hour)
- Streamline Node: Get Orders
- Google Sheets: Append data
- Use case: Create automated sales reports

**2. Low Stock Alerts**
- Trigger: Schedule (daily)
- Streamline Node: Get Inventory
- IF Node: Check if stock < threshold
- Slack/Email Node: Send alert
- Use case: Monitor inventory levels

**3. Product Catalog Integration**
- Trigger: Manual or Schedule
- Streamline Node: Get Products
- Your Service: Update product database
- Use case: Maintain product information across platforms

### Tips

- Use the **Schedule Trigger** node to automate regular data syncs
- Combine with **IF** nodes to create conditional workflows
- Use **Set** nodes to transform data before sending to other services
- Enable **Error Workflows** to handle API errors gracefully

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Streamline Connector](https://streamlineconnector.com)
- [n8n workflow examples](https://n8n.io/workflows)

### Support

For issues and questions:

- **Node issues:** [GitHub Issues](https://github.com/streamline-connector/n8n-nodes-streamline/issues)
- **n8n help:** [n8n Community Forum](https://community.n8n.io/)
- **Streamline API:** Contact devs@streamlineconnector.com

## Development

### Prerequisites

- Node.js v22 or higher
- npm
- n8n (included as dev dependency)

### Setup

```bash
# Clone the repository
git clone https://github.com/streamline-connector/n8n-nodes-streamline.git
cd n8n-nodes-streamline

# Install dependencies
npm install

# Build the node
npm run build
```

### Local Development

Start n8n with your node loaded:

```bash
npm run dev
```

This command:
- Builds your node with watch mode enabled
- Starts n8n with your node available
- Automatically rebuilds when you make changes
- Opens n8n in your browser at http://localhost:5678

### Testing

Run linting:

```bash
npm run lint
```

Auto-fix linting issues:

```bash
npm run lint:fix
```

### Building for Production

```bash
npm run build
```

This compiles TypeScript code to the `dist/` folder.

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## License

[MIT](LICENSE.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Made with ❤️ by [Streamline Connector](https://streamlineconnector.com)
