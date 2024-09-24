import clsx from 'clsx'
import { HistoryObject } from '../page'

const HistoryListItem = ({
  historyItem,
  lastItem,
}: {
  historyItem: HistoryObject
  lastItem: boolean
}) => {
  return (
    <li
      className={clsx(
        'flex flex-row justify-between gap-x-[100px] items-center py-4',
        { 'border-b border-[rgba(255,255,255,0.3)]': !lastItem }
      )}
    >
      <p className="text-theme-xs">{historyItem.input}</p>
      <p className="text-theme-lg">{historyItem.value}º</p>
    </li>
  )
}

export default HistoryListItem
