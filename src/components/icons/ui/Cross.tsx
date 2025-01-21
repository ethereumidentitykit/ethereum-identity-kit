const Cross: React.FC<React.SVGProps<SVGSVGElement>> = ({ height = 32, width = 27, color = 'currentColor' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.2852 2L2.07195 23.2132" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <path d="M2 2L23.2132 23.2132" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export default Cross
