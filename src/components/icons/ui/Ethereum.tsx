const Clock: React.FC<React.SVGProps<SVGSVGElement>> = ({
  height = 24,
  width = 24,
  color = 'currentColor',
  ...props
}) => {
  return (
    <svg width={width} height={height} {...props} viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 10.7354L6.52381 0L13 10.7354L6.52381 14.6435L0 10.7354Z" fill={color} />
      <path d="M6.52381 15.8206L0 11.9126L6.52381 21L13 11.9126L6.52381 15.8206Z" fill={color} />
    </svg>
  )
}

export default Clock
