const Check: React.FC<React.SVGProps<SVGSVGElement>> = ({ height = 32, width = 27, color = 'currentColor' }) => {
  return (
    <svg height={height} width={width} viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27 2L10.6957 22L2 14.6316" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export default Check
