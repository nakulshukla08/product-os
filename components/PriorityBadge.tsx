type Priority = 'P0' | 'P1' | 'P2' | 'P3'

const priorityStyles: Record<Priority, string> = {
  P0: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  P1: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  P2: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  P3: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityStyles[priority]}`}
    >
      {priority}
    </span>
  )
}
