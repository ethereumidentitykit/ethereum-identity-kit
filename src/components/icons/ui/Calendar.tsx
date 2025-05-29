const Calendar: React.FC<React.SVGProps<SVGSVGElement>> = ({
  height = 32,
  width = 27,
  color = 'currentColor',
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      stroke={color}
      fill={color}
      {...props}
      strokeWidth="0"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="416" height="384" x="48" y="80" fill="none" stroke-linejoin="round" stroke-width="32" rx="48"></rect>
      <circle cx="296" cy="232" r="24"></circle>
      <circle cx="376" cy="232" r="24"></circle>
      <circle cx="296" cy="312" r="24"></circle>
      <circle cx="376" cy="312" r="24"></circle>
      <circle cx="136" cy="312" r="24"></circle>
      <circle cx="216" cy="312" r="24"></circle>
      <circle cx="136" cy="392" r="24"></circle>
      <circle cx="216" cy="392" r="24"></circle>
      <circle cx="296" cy="392" r="24"></circle>
      <path
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M128 48v32m256-32v32"
      ></path>
      <path fill="none" stroke-linejoin="round" stroke-width="32" d="M464 160H48"></path>
    </svg>
  )
}

export default Calendar
