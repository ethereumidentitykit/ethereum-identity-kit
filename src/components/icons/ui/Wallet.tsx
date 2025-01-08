const Wallet: React.FC<React.SVGProps<SVGSVGElement>> = ({ height = 24, width = 22, color = 'currentColor' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.6003 9.50272H11.8082C10.783 9.5021 9.95204 8.6778 9.95142 7.66005C9.95142 6.64231 10.783 5.81801 11.8082 5.81738H14.6003"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1234 7.61774H11.9082"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.01869 1.69983H10.98C12.9788 1.69983 14.5993 3.3085 14.5993 5.29282V10.2068C14.5993 12.1911 12.9788 13.7998 10.98 13.7998H5.01869C3.01985 13.7998 1.39941 12.1911 1.39941 10.2068V5.29282C1.39941 3.3085 3.01985 1.69983 5.01869 1.69983Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4.52832 4.8071H8.25197" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Wallet
