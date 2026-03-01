import fs from 'node:fs'
import path from 'node:path'
import yaml from 'yaml'

const dataDir = path.join(process.cwd(), 'data')

export function loadFeatures() {
  try {
    const content = fs.readFileSync(path.join(dataDir, 'features.yaml'), 'utf-8')
    const data = yaml.parse(content)
    return (data?.features || []) as Array<{
      id: string
      name: string
      status: string
      priority: string
      completion?: number
      repos?: string[]
    }>
  } catch {
    return []
  }
}

export function loadBacklog() {
  try {
    const content = fs.readFileSync(path.join(dataDir, 'backlog.yaml'), 'utf-8')
    const data = yaml.parse(content)
    return (data?.items || []) as Array<{
      id: string
      title: string
      priority: string
      status: string
      ice?: { impact: number; confidence: number; ease: number }
    }>
  } catch {
    return []
  }
}
