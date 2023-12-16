import { useContext, useTransition } from 'react'

import Switch from '@/components/ui/switch'
import { SortByContext } from '@/stores/sort-by'

export default function SortByToggle() {
  const [isPending, startTransition] = useTransition()
  const { sortBy, setSortBy } = useContext(SortByContext)
  const isSortByTime = sortBy === 'time'

  const toggleSortBy = () => {
    const newSortBy = isSortByTime ? 'completed' : 'time'
    startTransition(() => setSortBy(newSortBy))
  }

  return (
    <div className={'flex flex-wrap items-center justify-end gap-x-2'}>
      <span className={'text-sm'}>{'Move completed things to the end?'}</span>
      <Switch checked={sortBy === 'completed'} onCheckedChange={toggleSortBy} disabled={isPending} />
    </div>
  )
}
