#!/usr/bin/env node
/**
 * Validates Product OS content:
 * - Malformed file detection (YAML/JSON parse errors with path and line)
 * - YAML data files against JSON schemas
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

/**
 * Validate a file is parseable. Returns parsed data or null on failure.
 * Reports errors with file path and message.
 */
function validateFileParseable(filePath, parser) {
  const relPath = path.relative(root, filePath)
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    if (parser === 'json') {
      return JSON.parse(content)
    }
    if (parser === 'yaml') {
      const parsed = yaml.parse(content)
      if (parsed === undefined && content.trim().length > 0) {
        console.error(`  ✗ ${relPath}: YAML parse returned undefined (possibly malformed)`)
        hasErrors = true
        return null
      }
      return parsed
    }
  } catch (err) {
    const msg = err.message || String(err)
    const lineMatch = msg.match(/position (\d+)|line (\d+)|:(\d+)/i)
    const lineInfo = lineMatch ? ` (${lineMatch[0]})` : ''
    console.error(`  ✗ ${relPath}: ${parser.toUpperCase()} parse error${lineInfo}: ${msg}`)
    hasErrors = true
    return null
  }
}

function loadJson(filePath) {
  const data = validateFileParseable(filePath, 'json')
  return data !== null ? data : {}
}

function loadYaml(filePath) {
  return validateFileParseable(filePath, 'yaml')
}

function validateYaml(schemaPath, dataPath) {
  const schema = loadJson(schemaPath)
  const data = loadYaml(dataPath)

  if (!data) {
    if (!hasErrors) {
      console.error(`  ✗ ${path.basename(dataPath)}: Empty or invalid YAML`)
      hasErrors = true
    }
    return
  }

  const validate = ajv.compile(schema)
  const items =
    data.features || data.items || data.sources || data.repositories || data.goals
  const key = data.features
    ? 'features'
    : data.items
      ? 'items'
      : data.sources
        ? 'sources'
        : data.repositories
          ? 'repositories'
          : data.goals
            ? 'goals'
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

// Phase 1: Validate all files are parseable (no malformed YAML/JSON)
console.log('Phase 1: Checking files are parseable...')
const schemaFiles = [
  'schemas/feature.schema.json',
  'schemas/backlog-item.schema.json',
  'schemas/research-source.schema.json',
  'schemas/goal.schema.json',
]
const dataFiles = [
  'data/backlog.yaml',
  'data/research-sources.yaml',
  'data/goals.yaml',
  'data/schema.yaml',
]

for (const f of schemaFiles) {
  validateFileParseable(path.join(root, f), 'json')
}
for (const f of dataFiles) {
  const p = path.join(root, f)
  if (fs.existsSync(p)) {
    validateFileParseable(p, 'yaml')
  }
}
// Parse-check domain feature files from schema
try {
  const schemaData = yaml.parse(fs.readFileSync(path.join(root, 'data', 'schema.yaml'), 'utf-8'))
  for (const d of schemaData?.domains || []) {
    const p = path.join(root, d.file)
    if (fs.existsSync(p)) {
      validateFileParseable(p, 'yaml')
    }
  }
} catch {
  // schema.yaml parse already reported in dataFiles loop
}

if (hasErrors) {
  console.error('\nParse errors found. Fix malformed files before schema validation.')
  process.exit(1)
}
console.log('  ✓ All files parseable')

// Phase 2: Schema validation
console.log('\nPhase 2: Validating data against schemas...')
// Validate each domain feature file
const schemaContent = fs.readFileSync(path.join(root, 'data', 'schema.yaml'), 'utf-8')
const schemaData = yaml.parse(schemaContent)
const domains = schemaData?.domains || []
for (const domain of domains) {
  const featurePath = path.join(root, domain.file)
  if (fs.existsSync(featurePath)) {
    validateYaml(
      path.join(root, 'schemas', 'feature.schema.json'),
      featurePath
    )
  }
}
validateYaml(
  path.join(root, 'schemas', 'backlog-item.schema.json'),
  path.join(root, 'data', 'backlog.yaml')
)
validateYaml(
  path.join(root, 'schemas', 'research-source.schema.json'),
  path.join(root, 'data', 'research-sources.yaml')
)
validateYaml(
  path.join(root, 'schemas', 'goal.schema.json'),
  path.join(root, 'data', 'goals.yaml')
)

if (hasErrors) {
  process.exit(1)
}
console.log('  ✓ All validations passed')
