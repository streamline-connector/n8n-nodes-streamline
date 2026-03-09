# Streamline for Shopify – n8n Node Action List

Node: **Streamline for Shopify** (`streamline`)  
Base URL: `https://streamline-connector-for-voiceflow.gadget.app`

---

## What’s essential?

**Essential** = actions that most Shopify + n8n workflows need first (order lookup, catalog read/write, basic promos, inventory context).

| Priority | Actions | Why |
|----------|--------|-----|
| **Essential** | Get an Order, Get Many Orders | Support, fulfillment, reporting, syncs |
| **Essential** | Get a Product, Get Many Products | Catalog sync, recommendations, stock checks |
| **Essential** | Get Inventory Locations | Required for any inventory-by-location logic |
| **Essential** | Create a Discount | Promos, campaigns, one-off codes |
| **Essential** | Create/Update Product, Create/Update Variant | Catalog management, imports, price/stock updates |
| **Recommended** | Delete Product, Delete Variant | Cleanup, catalog hygiene |
| **Recommended** | Get AI Product Recommendations | Personalization, upsell workflows |

---

## Current actions (by resource)

### Order (`orderActions`)

| Operation value | Display name | API | Essential? |
|----------------|--------------|-----|------------|
| `getOne` | Get an Order | GET `/api/order-data` (email, orderNumber) | ✅ Essential |
| `getMany` | Get Many Orders | GET `/api/order-data` (page, size) | ✅ Essential |

---

### Product (`productActions`)

| Operation value | Display name | API | Essential? |
|----------------|--------------|-----|------------|
| `getOne` | Get a Product | GET `/products/inventory` (productId / productTitle) | ✅ Essential |
| `getMany` | Get Many Products | GET `/products/inventory` (page, size) | ✅ Essential |
| `createProduct` | Create a Product | POST `/products/create-product` | ✅ Essential |
| `updateProduct` | Update a Product | POST `/products/update-product` | ✅ Essential |
| `createVariant` | Create a Variant | POST `/products/create-variant` | ✅ Essential |
| `updateVariant` | Update a Variant | POST `/products/update-variant` | ✅ Essential |
| `deleteProduct` | Delete a Product | POST `/products/delete-product` | Recommended |
| `deleteVariant` | Delete a Variant | POST `/products/delete-variant` | Recommended |

---

### Additional (`additionalActions`)

| Operation value | Display name | API | Essential? |
|----------------|--------------|-----|------------|
| `getRecommendations` | Get AI Product Recommendations | GET `/products/recommendations` (searchQuery) | Recommended |
| `getLocations` | Get Inventory Locations | GET `/products/locations` | ✅ Essential |
| `createDiscount` | Create a Discount | POST `/api/create-discount-code` | ✅ Essential |

---

## Summary: essential set (minimum to ship)

For a “store management” node, the **essential** actions are:

1. **Order:** Get an Order, Get Many Orders  
2. **Product:** Get a Product, Get Many Products, Create a Product, Update a Product, Create a Variant, Update a Variant  
3. **Additional:** Get Inventory Locations, Create a Discount  

Optional but recommended: Get AI Product Recommendations, Delete a Product, Delete a Variant.  
You already have all of the above implemented.

---

## Recommended actions to add (future)

Align with [STORE-MANAGEMENT-ENDPOINTS.md](../../streamline-connector-for-voiceflow/docs/STORE-MANAGEMENT-ENDPOINTS.md). Add these as **new resources** or **new operations** in the same node.

### Order (add operations)

| Operation (suggested) | Display name | API (to add) | Priority |
|-----------------------|--------------|--------------|----------|
| `updateOrder` | Update an Order | POST `/api/update-order` | High |
| `cancelOrder` | Cancel an Order | POST `/api/cancel-order` | High |
| `closeOrder` | Close an Order | POST `/api/close-order` | Low |

### Customer (new resource: `customerActions`)

| Operation (suggested) | Display name | API (to add) | Priority |
|-----------------------|--------------|--------------|----------|
| `getOne` | Get a Customer | GET `/api/customer-data` | High |
| `getMany` | Get Many Customers | GET `/api/customer-list` | High |
| `create` | Create a Customer | POST `/api/create-customer` | High |
| `update` | Update a Customer | POST `/api/update-customer` | Medium |

### Inventory (new resource: `inventoryActions`)

| Operation (suggested) | Display name | API (to add) | Priority |
|-----------------------|--------------|--------------|----------|
| `setQuantity` | Set / Adjust Inventory | POST `/products/set-inventory` | High |

### Fulfillment (new resource: `fulfillmentActions`)

| Operation (suggested) | Display name | API (to add) | Priority |
|-----------------------|--------------|--------------|----------|
| `create` | Create a Fulfillment | POST `/api/create-fulfillment` | High |
| `getMany` | Get Fulfillments | GET `/api/fulfillment-list` | Medium |

### Collection (new resource: `collectionActions`)

| Operation (suggested) | Display name | API (to add) | Priority |
|-----------------------|--------------|--------------|----------|
| `getMany` | Get Many Collections | GET `/products/collections` | Medium |
| `getProducts` | Get Products in Collection | GET `/products/collection-products` | Medium |

### Draft Order (new resource: `draftOrderActions`)

| Operation (suggested) | Display name | API (to add) | Priority |
|-----------------------|--------------|--------------|----------|
| `create` | Create a Draft Order | POST `/api/create-draft-order` | High |
| `complete` | Complete Draft Order | POST `/api/complete-draft-order` | High |

### Discount (extend Additional or new resource)

| Operation (suggested) | Display name | API (to add) | Priority |
|-----------------------|--------------|--------------|----------|
| `getMany` | Get Many Discounts | GET `/api/discount-list` | Low |
| `update` | Update a Discount | POST `/api/update-discount` | Low |

### Abandoned Checkout (new resource, optional)

| Operation (suggested) | Display name | API (to add) | Priority |
|-----------------------|--------------|--------------|----------|
| `getMany` | Get Abandoned Checkouts | GET `/api/abandoned-checkouts` | Low |

---

## Quick reference: all current actions (flat list)

| Resource | Operation | Display name |
|----------|-----------|--------------|
| Order | getOne | Get an Order |
| Order | getMany | Get Many Orders |
| Product | getOne | Get a Product |
| Product | getMany | Get Many Products |
| Product | createProduct | Create a Product |
| Product | updateProduct | Update a Product |
| Product | createVariant | Create a Variant |
| Product | updateVariant | Update a Variant |
| Product | deleteProduct | Delete a Product |
| Product | deleteVariant | Delete a Variant |
| Additional | getRecommendations | Get AI Product Recommendations |
| Additional | getLocations | Get Inventory Locations |
| Additional | createDiscount | Create a Discount |

**Total: 13 actions** across 3 resources. Use this list for docs, changelogs, and planning new actions.
