import { loadFeatures, loadGoals } from '@/lib/loadData'
import { StatusBadge } from './StatusBadge'
import { PriorityBadge } from './PriorityBadge'
import { DataTable } from './DataTable'

export function FeatureTable() {
  const features = loadFeatures()
  const goals = loadGoals()

  if (features.length === 0) {
    return (
      <DataTable>
        <div className="p-10 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No features in <code className="rounded bg-slate-200/80 dark:bg-slate-700/80 px-1.5 py-0.5">data/features/*.yaml</code>. Add entries per domain (see <code>data/schema.yaml</code>).
          </p>
        </div>
      </DataTable>
    )
  }

  return (
    <DataTable>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60">
              <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Feature
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Status
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Priority
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Progress
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Repos
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Goals
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Links
              </th>
            </tr>
          </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
          {features.map((f, i) => (
            <tr
              key={f.id}
              className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                i % 2 === 1 ? 'bg-slate-50/50 dark:bg-slate-800/20' : ''
              }`}
            >
              <td className="px-6 py-4 align-middle">
                <span className="block font-medium text-slate-900 dark:text-slate-100 break-words">
                  {f.name}
                </span>
              </td>
              <td className="px-6 py-4 align-middle whitespace-nowrap">
                <StatusBadge status={f.status as 'planned' | 'in-progress' | 'shipped' | 'deprecated'} />
              </td>
              <td className="px-6 py-4 align-middle whitespace-nowrap">
                <PriorityBadge priority={f.priority as 'P0' | 'P1' | 'P2' | 'P3'} />
              </td>
              <td className="px-6 py-4 align-middle">
                {f.completion != null ? (
                  <div className="flex items-center gap-3">
                    <div className="h-2 min-w-[4rem] flex-1 max-w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className="h-full rounded-full bg-cyan-500 dark:bg-cyan-400 transition-all"
                        style={{ width: `${f.completion}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-sm font-medium tabular-nums text-slate-600 dark:text-slate-400">
                      {f.completion}%
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </td>
              <td className="px-6 py-4 align-middle">
                <span className="block text-sm text-slate-600 dark:text-slate-400 break-words">
                  {f.repos?.join(', ') || '—'}
                </span>
              </td>
              <td className="px-6 py-4 align-middle">
                <div className="flex flex-wrap gap-1.5">
                  {f.goal_ids?.map((gid) => {
                    const goal = goals.find((g) => g.id === gid)
                    return goal ? (
                      <span
                        key={gid}
                        className="inline-flex shrink-0 whitespace-nowrap rounded bg-cyan-100/80 dark:bg-cyan-900/30 px-2 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300"
                      >
                        {goal.title.split(' ')[0]}
                      </span>
                    ) : null
                  })}
                  {(!f.goal_ids || f.goal_ids.length === 0) && (
                    <span className="text-slate-400">—</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 align-middle">
                <div className="flex flex-wrap gap-1.5">
                  {f.links?.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center whitespace-nowrap rounded border border-slate-200 dark:border-slate-600/80 px-2 py-0.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      {link.label} →
                    </a>
                  ))}
                  {(!f.links || f.links.length === 0) && (
                    <span className="text-slate-400">—</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </DataTable>
  )
}
