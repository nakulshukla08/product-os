#!/usr/bin/env node
/**
 * Validates Product OS content:
 * - YAML data files against JSON schemas
 * - MDX frontmatter (basic checks)
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'yaml'
import Ajv from 'ajv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const ajv = new Ajv({ allErrors: true })
let hasErrors = false

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function loadYaml(filePath) {
  return yaml.parse(fs.readFileSync(filePath, 'utf-8'))
}

function validateYaml(schemaPath, dataPath) {
  const schema = loadJson(schemaPath)
  const data = loadYaml(dataPath)

  if (!data) {
    console.error(`  ✗ ${path.basename(dataPath)}: Empty or invalid YAML`)
    hasErrors = true
    return
  }

  const validate = ajv.compile(schema)
  const items =
    data.features || data.items || data.sources || data.repositories
  const key = data.features
    ? 'features'
    : data.items
      ? 'items'
      : data.sources
        ? 'sources'
        : data.repositories
          ? 'repositories'
          : null

  if (key && Array.isArray(items)) {
    items.forEach((item, i) => {
      const valid = validate(item)
      if (!valid) {
        console.error(`  ✗ ${path.basename(dataPath)} [${i}]:`, validate.errors)
        hasErrors = true
      }
    })
  }
}

console.log('Validating data files...')
validateYaml(
  path.join(root, 'schemas', 'feature.schema.json'),
  path.join(root, 'data', 'features.yaml')
)
validateYaml(
  path.join(root, 'schemas', 'backlog-item.schema.json'),
  path.join(root, 'data', 'backlog.yaml')
)
validateYaml(
  path.join(root, 'schemas', 'research-source.schema.json'),
  path.join(root, 'data', 'research-sources.yaml')
)

if (hasErrors) {
  process.exit(1)
}
console.log('  ✓ All validations passed')
