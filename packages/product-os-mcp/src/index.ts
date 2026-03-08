#!/usr/bin/env node
/**
 * Product OS MCP Server (Read-Only)
 * Exposes Product OS data as MCP tools and resources.
 * Run from product-os repo root: npx product-os-mcp
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'yaml'
import { z } from 'zod'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// dist/ is inside packages/product-os-mcp/, so go up 3 levels to product-os root
const root = path.resolve(__dirname, '../../..')
const dataDir = path.join(root, 'data')
const contentDir = path.join(root, 'content')

function loadSchema() {
  try {
    const content = fs.readFileSync(path.join(dataDir, 'schema.yaml'), 'utf-8')
    return yaml.parse(content) as { domains?: Array<{ id: string; file: string; description?: string }> }
  } catch {
    return { domains: [] }
  }
}

function loadFeatures(domain?: string) {
  const schema = loadSchema()
  const domains = schema?.domains || []
  const allFeatures: Record<string, unknown>[] = []
  for (const d of domains) {
    if (domain && d.id !== domain) continue
    const filePath = path.join(root, d.file)
    if (!fs.existsSync(filePath)) continue
    const data = yaml.parse(fs.readFileSync(filePath, 'utf-8')) as { features?: Record<string, unknown>[] }
    allFeatures.push(...(data?.features || []))
  }
  return allFeatures
}

function loadBacklog() {
  try {
    const data = yaml.parse(fs.readFileSync(path.join(dataDir, 'backlog.yaml'), 'utf-8'))
    return (data?.items || []) as Record<string, unknown>[]
  } catch {
    return []
  }
}

function loadGoals() {
  try {
    const data = yaml.parse(fs.readFileSync(path.join(dataDir, 'goals.yaml'), 'utf-8'))
    return (data?.goals || []) as Record<string, unknown>[]
  } catch {
    return []
  }
}

function loadSchemaRaw() {
  try {
    return fs.readFileSync(path.join(dataDir, 'schema.yaml'), 'utf-8')
  } catch {
    return ''
  }
}

const server = new McpServer({
  name: 'product-os',
  version: '0.1.0',
}, {
  instructions: 'Read-only Product OS server. Exposes features, backlog, goals, and schema. No write tools.',
})

// Tools
server.registerTool(
  'product_os_list_features',
  {
    title: 'List Features',
    description: 'List all features with optional filters',
    inputSchema: z.object({
      status: z.string().optional(),
      priority: z.string().optional(),
      domain: z.string().optional(),
    }),
  },
  async ({ status, priority, domain }) => {
    let features = loadFeatures(domain)
    if (status) features = features.filter((f: Record<string, unknown>) => f.status === status)
    if (priority) features = features.filter((f: Record<string, unknown>) => f.priority === priority)
    return { content: [{ type: 'text', text: JSON.stringify(features, null, 2) }] }
  }
)

server.registerTool(
  'product_os_get_feature',
  {
    title: 'Get Feature',
    description: 'Get a single feature by id',
    inputSchema: z.object({ feature_id: z.string() }),
  },
  async ({ feature_id }) => {
    const features = loadFeatures()
    const f = features.find((x: Record<string, unknown>) => x.id === feature_id)
    if (!f) return { content: [{ type: 'text', text: JSON.stringify({ error: 'Feature not found' }) }], isError: true }
    return { content: [{ type: 'text', text: JSON.stringify(f, null, 2) }] }
  }
)

server.registerTool(
  'product_os_list_backlog',
  {
    title: 'List Backlog',
    description: 'List backlog items',
    inputSchema: z.object({
      status: z.string().optional(),
      type: z.string().optional(),
      limit: z.number().optional(),
    }),
  },
  async ({ status, type, limit }) => {
    let items = loadBacklog()
    if (status) items = items.filter((i: Record<string, unknown>) => i.status === status)
    if (type) items = items.filter((i: Record<string, unknown>) => i.type === type)
    if (limit) items = items.slice(0, limit)
    return { content: [{ type: 'text', text: JSON.stringify(items, null, 2) }] }
  }
)

server.registerTool(
  'product_os_get_backlog_item',
  {
    title: 'Get Backlog Item',
    description: 'Get a single backlog item by id',
    inputSchema: z.object({ item_id: z.string() }),
  },
  async ({ item_id }) => {
    const items = loadBacklog()
    const item = items.find((x: Record<string, unknown>) => x.id === item_id)
    if (!item) return { content: [{ type: 'text', text: JSON.stringify({ error: 'Item not found' }) }], isError: true }
    return { content: [{ type: 'text', text: JSON.stringify(item, null, 2) }] }
  }
)

server.registerTool(
  'product_os_list_goals',
  {
    title: 'List Goals',
    description: 'List goals',
    inputSchema: z.object({ status: z.string().optional() }),
  },
  async ({ status }) => {
    let goals = loadGoals()
    if (status) goals = goals.filter((g: Record<string, unknown>) => g.status === status)
    return { content: [{ type: 'text', text: JSON.stringify(goals, null, 2) }] }
  }
)

server.registerTool(
  'product_os_get_schema',
  {
    title: 'Get Schema',
    description: 'Get the unified schema (structure of goals, features, OKRs, domains)',
    inputSchema: z.object({}),
  },
  async () => {
    const schema = loadSchemaRaw()
    return { content: [{ type: 'text', text: schema || '{}' }] }
  }
)

// Resources
server.registerResource(
  'product-os-data-features',
  'product-os://data/features',
  {
    title: 'Product OS Features',
    description: 'Merged features from data/features/*.yaml',
    mimeType: 'application/json',
  },
  async () => ({
    contents: [{ uri: 'product-os://data/features', mimeType: 'application/json', text: JSON.stringify(loadFeatures(), null, 2) }],
  })
)

server.registerResource(
  'product-os-data-backlog',
  'product-os://data/backlog',
  {
    title: 'Product OS Backlog',
    description: 'Backlog items',
    mimeType: 'application/json',
  },
  async () => ({
    contents: [{ uri: 'product-os://data/backlog', mimeType: 'application/json', text: JSON.stringify(loadBacklog(), null, 2) }],
  })
)

server.registerResource(
  'product-os-data-goals',
  'product-os://data/goals',
  {
    title: 'Product OS Goals',
    description: 'Strategic goals',
    mimeType: 'application/json',
  },
  async () => ({
    contents: [{ uri: 'product-os://data/goals', mimeType: 'application/json', text: JSON.stringify(loadGoals(), null, 2) }],
  })
)

server.registerResource(
  'product-os-data-schema',
  'product-os://data/schema',
  {
    title: 'Product OS Schema',
    description: 'Unified schema YAML',
    mimeType: 'text/yaml',
  },
  async () => ({
    contents: [{ uri: 'product-os://data/schema', mimeType: 'text/yaml', text: loadSchemaRaw() }],
  })
)

// Dynamic resource for feature specs
server.registerResource(
  'product-os-content-feature',
  new ResourceTemplate('product-os://content/features/{id}', {
    list: async () => {
      const features = loadFeatures()
      return {
        resources: features.map((f: Record<string, unknown>) => ({
          uri: `product-os://content/features/${f.id}`,
          name: String(f.name || f.id),
        })),
      }
    },
  }),
  {
    title: 'Feature Spec',
    description: 'Feature specification MDX',
    mimeType: 'text/markdown',
  },
  async (uri, { id }) => {
    const filePath = path.join(contentDir, 'features', `${id}.mdx`)
    if (!fs.existsSync(filePath)) {
      return { contents: [{ uri: uri.href, mimeType: 'text/plain', text: 'Not found' }] }
    }
    const text = fs.readFileSync(filePath, 'utf-8')
    return { contents: [{ uri: uri.href, mimeType: 'text/markdown', text }] }
  }
)

const transport = new StdioServerTransport()
await server.connect(transport)
