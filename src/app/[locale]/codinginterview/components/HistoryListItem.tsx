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
        'flex flex-row justify-between gap-x-[100px] items-center py-4 px-2',
        { 'border-b border-[rgba(255,255,255,0.3)]': !lastItem }
      )}
    >
      <div className="text-theme-xs">{historyItem.input}</div>
      <div className="text-theme-lg">{historyItem.value}º</div>
    </li>
  )
}

export default HistoryListItem
