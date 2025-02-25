const Key: React.FC<React.SVGProps<SVGSVGElement>> = ({ height = 32, width = 27, color = 'currentColor' }) => {
  return (
    <svg
      width={width}
      height={height}
      stroke={color}
      fill={color}
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path>
    </svg>
  )
}

export default Key
