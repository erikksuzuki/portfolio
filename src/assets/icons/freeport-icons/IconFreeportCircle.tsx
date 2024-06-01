const IconFreeportCircle = ({
  className = 'w-8 h-8',
}: {
  className?: string
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 256 256"
    >
      <g fill="none" fill-rule="evenodd">
        <circle
          cx="128"
          cy="128"
          r="120"
          stroke="currentColor"
          stroke-width="16"
        ></circle>
        <rect
          width="146"
          height="28"
          x="55"
          y="97"
          fill="currentColor"
          rx="14"
        ></rect>
        <rect
          width="78"
          height="28"
          x="55"
          y="133"
          fill="currentColor"
          rx="14"
        ></rect>
      </g>
    </svg>
  )
}

export default IconFreeportCircle
