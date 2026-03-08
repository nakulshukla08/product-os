# Product OS MCP Server

Read-only MCP server that exposes Product OS data (features, backlog, goals, schema) as tools and resources.

## Usage

Run from the product-os repo root:

```bash
npm run product-os:mcp
```

Or from this package:

```bash
cd packages/product-os-mcp && npm run start
```

## Cursor Setup

Add to Cursor MCP settings (e.g. `~/.cursor/mcp.json` or project config):

```json
{
  "mcpServers": {
    "product-os": {
      "command": "node",
      "args": ["/path/to/product-os/packages/product-os-mcp/dist/index.js"],
      "cwd": "/path/to/product-os"
    }
  }
}
```

## Tools (Read-Only)

| Tool | Description |
|------|-------------|
| `product_os_list_features` | List features (optional: status, priority, domain) |
| `product_os_get_feature` | Get feature by id |
| `product_os_list_backlog` | List backlog items (optional: status, type, limit) |
| `product_os_get_backlog_item` | Get backlog item by id |
| `product_os_list_goals` | List goals (optional: status) |
| `product_os_get_schema` | Get unified schema YAML |

## Resources

| URI | Description |
|-----|-------------|
| `product-os://data/features` | Merged features JSON |
| `product-os://data/backlog` | Backlog JSON |
| `product-os://data/goals` | Goals JSON |
| `product-os://data/schema` | Schema YAML |
| `product-os://content/features/{id}` | Feature spec MDX |
