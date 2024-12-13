const X: React.FC<React.SVGProps<SVGSVGElement>> = ({ height = 32, width = 32 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_3128_6927)">
        <mask id="mask0_3128_6927" maskUnits="userSpaceOnUse" x="0" y="-1" width="512" height="513">
          <path d="M512 -0.000976562H0V511.999H512V-0.000976562Z" fill="white" />
        </mask>
        <g mask="url(#mask0_3128_6927)">
          <circle cx="256" cy="256" r="256" fill="black" />
          <path
            d="M342.267 120H388.27L287.769 234.866L406 391.173H313.426L240.918 296.374L157.953 391.173H111.924L219.419 268.311L106 120H200.924L266.464 206.65L342.267 120ZM326.122 363.638H351.613L187.073 146.088H159.72L326.122 363.638Z"
            fill="white"
          />
        </g>
      </g>
    </svg>
  )
}

export default X
