const Person: React.FC<React.SVGProps<SVGSVGElement>> = ({
  height = 32,
  width = 27,
  color = 'currentColor',
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      {...props}
      stroke={color}
      fill={color}
      strokeWidth="0"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M256 256a112 112 0 1 0-112-112 112 112 0 0 0 112 112zm0 32c-69.42 0-208 42.88-208 128v64h416v-64c0-85.12-138.58-128-208-128z"></path>
    </svg>
  )
}

export default Person
