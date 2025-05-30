const Dweb: React.FC<React.SVGProps<SVGSVGElement>> = ({ height = 32, width = 32, ...props }) => {
  return (
    <svg width={width} height={height} {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_3219_7861)">
        <path d="M20 0H0V20H20V0Z" fill="#333333" />
        <path
          d="M14.246 12.8578C15.7812 11.9715 15.7812 10.5345 14.246 9.64816C12.7109 8.76181 10.222 8.76181 8.68683 9.64816L4.55078 12.0361L10.11 15.2457L14.246 12.8578Z"
          fill="white"
        />
        <path
          d="M5.53201 12.0668L5.06641 11.798V11.2604V6.87568C5.06641 5.42178 6.08716 4.83246 7.34626 5.55943C8.60541 6.28638 9.62611 8.05433 9.62611 9.50823V13.893V14.4306L9.16056 14.1618L5.53201 12.0668Z"
          fill="#333333"
          stroke="white"
        />
        <path d="M5.3125 11.7878L9.647 9.50293" stroke="white" />
      </g>
      <defs>
        <clipPath id="clip0_3219_7861">
          <rect width="20" height="20" rx="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Dweb
