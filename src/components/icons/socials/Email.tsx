import React from 'react'

const Email: React.FC<React.SVGProps<SVGSVGElement>> = ({ height = 32, width = 32 }) => {
  return (
    <div>
      <svg width={width} height={height} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="18" fill="#fa6161" />
        <path
          stroke="white"
          strokeWidth="1.75"
          d="M10 11h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H10c-1.1 0-2-.9-2-2v-10c0-1.1.9-2 2-2z"
        ></path>
        <polyline stroke="white" strokeWidth="1.75" points="28,13 18,20 8,13"></polyline>
      </svg>
    </div>
  )
}

export default Email
