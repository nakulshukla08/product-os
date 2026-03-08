import fs from 'node:fs'
import path from 'node:path'
import yaml from 'yaml'

const dataDir = path.join(process.cwd(), 'data')

function loadSchema() {
  try {
    const content = fs.readFileSync(path.join(dataDir, 'schema.yaml'), 'utf-8')
    return yaml.parse(content) as {
      domains?: Array<{ id: string; file: string; description?: string }>
    }
  } catch {
    return { domains: [] }
  }
}

export function loadFeatures() {
  try {
    const schema = loadSchema()
    const domains = schema?.domains || []
    const allFeatures: Array<{
      id: string
      name: string
      status: string
      priority: string
      completion?: number
      repos?: string[]
      goal_ids?: string[]
      links?: Array<{ label: string; url: string }>
    }> = []

    for (const domain of domains) {
      const filePath = path.join(process.cwd(), domain.file)
      if (!fs.existsSync(filePath)) continue
      const content = fs.readFileSync(filePath, 'utf-8')
      const data = yaml.parse(content) as { features?: typeof allFeatures }
      const features = data?.features || []
      allFeatures.push(...features)
    }

    return allFeatures
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
      description?: string
      ice?: { impact: number; confidence: number; ease: number }
      goal_ids?: string[]
      links?: Array<{ label: string; url: string }>
    }>
  } catch {
    return []
  }
}

export function loadGoals() {
  try {
    const content = fs.readFileSync(path.join(dataDir, 'goals.yaml'), 'utf-8')
    const data = yaml.parse(content)
    return (data?.goals || []) as Array<{
      id: string
      title: string
      description?: string
      status: 'active' | 'accomplished'
      target_date?: string
      links?: Array<{ label: string; url: string }>
    }>
  } catch {
    return []
  }
}
