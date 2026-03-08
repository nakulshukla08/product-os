#!/usr/bin/env node
/**
 * Commit-and-PR CLI for Product OS
 * Run after agent edits files in data/ or content/.
 * Creates branch, commits, validates, pushes, and opens PR.
 */

import { execSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

function run(cmd, opts = {}) {
  return execSync(cmd, { cwd: root, encoding: 'utf-8', ...opts })
}

function runSpawn(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { cwd: root, encoding: 'utf-8', ...opts })
  return { ...r, ok: r.status === 0 }
}

function hasUncommittedChanges() {
  try {
    const status = run('git status --porcelain data/ content/')
    return status.trim().length > 0
  } catch {
    return false
  }
}

function validate() {
  console.log('Running validation...')
  const r = runSpawn('npm', ['run', 'validate'])
  if (!r.ok) {
    console.error('Validation failed. Fix errors before creating PR.')
    process.exit(1)
  }
  console.log('  ✓ Validation passed')
}

function createBranch() {
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const branch = `product-os/update-${ts}`
  run(`git checkout -b ${branch}`)
  return branch
}

function commit() {
  run('git add data/ content/')
  const status = run('git status --porcelain data/ content/')
  if (!status.trim()) {
    console.error('No changes to commit in data/ or content/')
    process.exit(1)
  }
  const msg = 'chore(product-os): update data and content'
  run(`git commit -m "${msg}"`)
}

function push(branch) {
  run(`git push -u origin ${branch}`)
}

function createPR(branch) {
  const templatePath = path.join(root, '.github', 'PULL_REQUEST_TEMPLATE.md')
  const bodyFile = fs.existsSync(templatePath) ? ['--body-file', templatePath] : []
  const r = runSpawn('gh', ['pr', 'create', '--fill', ...bodyFile])
  if (r.ok) {
    console.log('\n✓ PR created successfully')
    return
  }
  console.log('\nCould not create PR via `gh`. You can create it manually:')
  console.log(`  1. Push completed. Branch: ${branch}`)
  console.log(`  2. Open: https://github.com/YOUR_ORG/product-os/compare/${branch}`)
}

function main() {
  console.log('Product OS — Commit and Create PR\n')

  if (!hasUncommittedChanges()) {
    console.log('No uncommitted changes in data/ or content/. Nothing to do.')
    process.exit(0)
  }

  validate()
  const branch = createBranch()
  commit()
  push(branch)
  createPR(branch)
}

main()
