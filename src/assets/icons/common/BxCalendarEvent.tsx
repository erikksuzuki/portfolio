const IconBxCalendarEvent = ({
  className = 'w-5 h-5',
}: {
  className?: string
}) => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11 12h6v6h-6z" />
      <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm.001 16H5V8h14l.001 12z" />
    </svg>
  )
}

export default IconBxCalendarEvent
