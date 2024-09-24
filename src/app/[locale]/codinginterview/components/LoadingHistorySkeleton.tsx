const LoadingSkeleton = ({ width = '40px' }) => (
  <p
    className="rounded-md bg-[rgba(255,255,255,0.05)] mb-1 h-[23px]"
    style={{ width: `${width}` }}
  >
    &nbsp;
  </p>
)

const LoadingHistorySkeleton = () => {
  return (
    <li className="py-4 border-b border-[rgba(255,255,255,0.3)]">
      <div className="text-theme-xs w-[calc(100%-180px)] inline-block ">
        <LoadingSkeleton width="calc(100%-80px)" />
      </div>
      <div className="text-theme-xs w-[180px] inline-flex justify-end">
        <LoadingSkeleton width="60px" />
      </div>
    </li>
  )
}

export default LoadingHistorySkeleton
