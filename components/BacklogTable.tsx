import { loadBacklog } from '@/lib/loadData'
import { PriorityBadge } from './PriorityBadge'

export function BacklogTable() {
  const items = loadBacklog()

  if (items.length === 0) {
    return (
      <div className="my-4 rounded-lg border border-slate-200 dark:border-slate-700 p-4 text-sm text-slate-500 dark:text-slate-400">
        No backlog items in data/backlog.yaml. Add entries to see them here.
      </div>
    )
  }

  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
              #
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
              Title
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
              Priority
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
              ICE Score
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {items.map((item, i) => (
            <tr key={item.id}>
              <td className="px-4 py-3 text-sm text-slate-500">{i + 1}</td>
              <td className="px-4 py-3 text-sm font-medium">{item.title}</td>
              <td className="px-4 py-3">
                <PriorityBadge priority={item.priority as 'P0' | 'P1' | 'P2' | 'P3'} />
              </td>
              <td className="px-4 py-3 text-sm capitalize">{item.status}</td>
              <td className="px-4 py-3 text-sm">
                {item.ice
                  ? `I:${item.ice.impact} C:${item.ice.confidence} E:${item.ice.ease}`
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
