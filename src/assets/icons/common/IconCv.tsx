const IconCv = ({ className = 'w-5 h-5' }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1"
      viewBox="10 10 80 80"
      stroke="currentColor"
      fill="currentcolor"
      className={className}
    >
      <path d="M16.667,90h66.667C86.999,90,90,86.999,90,83.333V16.667C90,13.001,86.999,10,83.333,10H16.667	C13.001,10,10,13.001,10,16.667v66.667C10,86.999,13.001,90,16.667,90z M16.667,16.667h66.667v66.667H16.667V16.667z" />
      <rect width="46.667" height="6.666" x="26.667" y="66.667" />
      <path d="M40,36.667c0-1.841-1.493-3.333-3.333-3.333s-3.333,1.492-3.333,3.333v13.33c0,1.841,1.492,3.333,3.333,3.333	S40,51.838,40,49.997h6.667c0,5.524-4.479,10-10,10c-5.521,0-10-4.477-10-10v-13.33c0-5.522,4.479-10,10-10c5.521,0,10,4.478,10,10	H40z" />
      <polygon points="66.462 26.667 73.333 26.667 65 60 58.333 60 50 26.667 56.872 26.667 61.667 45.846" />
    </svg>
  )
}

export default IconCv
