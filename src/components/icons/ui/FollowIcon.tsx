const FollowIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  height = 32,
  width = 32,
  color = '#333333',
  ...props
}) => {
  return (
    <svg width={width} height={height} {...props} viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 9.21289L5.35156 0.306641L10.6641 9.21289L5.35156 12.4551L0 9.21289Z" fill={color} />
      <path d="M5.35156 13.4316L0 10.1895L5.35156 17.7285L10.6641 10.1895L5.35156 13.4316Z" fill={color} />
      <path
        d="M12.1875 14.291H10.6641V16.5566H8.55469V17.9629H10.6641V20.3066H12.1875V17.9629H14.2578V16.5566H12.1875V14.291Z"
        fill={color}
      />
    </svg>
  )
}

export default FollowIcon
