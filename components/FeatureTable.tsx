import { loadFeatures } from '@/lib/loadData'
import { StatusBadge } from './StatusBadge'
import { PriorityBadge } from './PriorityBadge'

export function FeatureTable() {
  const features = loadFeatures()

  if (features.length === 0) {
    return (
      <div className="my-4 rounded-lg border border-slate-200 dark:border-slate-700 p-4 text-sm text-slate-500 dark:text-slate-400">
        No features in data/features.yaml. Add entries to see them here.
      </div>
    )
  }

  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
              Feature
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
              Priority
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
              Completion
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
              Repos
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {features.map((f) => (
            <tr key={f.id}>
              <td className="px-4 py-3 text-sm font-medium">{f.name}</td>
              <td className="px-4 py-3">
                <StatusBadge status={f.status as 'planned' | 'in-progress' | 'shipped' | 'deprecated'} />
              </td>
              <td className="px-4 py-3">
                <PriorityBadge priority={f.priority as 'P0' | 'P1' | 'P2' | 'P3'} />
              </td>
              <td className="px-4 py-3 text-sm">{f.completion != null ? `${f.completion}%` : '-'}</td>
              <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                {f.repos?.join(', ') || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
