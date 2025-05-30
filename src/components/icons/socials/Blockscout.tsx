import React from 'react'

const Blockscout: React.FC<React.SVGProps<SVGSVGElement>> = ({ height = 32, width = 32, className, ...props }) => {
  // Reduce the size of the icon to fit the design
  const heightNum = Number(height) / 1.33
  const widthNum = Number(width) / 1.33

  return (
    <div
      style={{
        backgroundColor: '#5353D3',
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className={className}
    >
      <svg
        width={widthNum}
        height={heightNum}
        {...props}
        viewBox="0 0 276 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M115.899 40C115.899 34.4772 111.422 30 105.899 30H82.2002C76.6774 30 72.2002 34.4772 72.2002 40V63.6984C72.2002 69.2213 67.7231 73.6984 62.2002 73.6984H40C34.4772 73.6984 30 78.1756 30 83.6984V229.753C30 235.275 34.4771 239.753 40 239.753H63.6985C69.2213 239.753 73.6985 235.275 73.6985 229.753V83.6985C73.6985 78.1756 78.1756 73.6985 83.6985 73.6985H105.899C111.422 73.6985 115.899 69.2213 115.899 63.6985V40ZM203.296 40C203.296 34.4772 198.818 30 193.296 30H169.597C164.074 30 159.597 34.4771 159.597 40V63.6985C159.597 69.2213 164.074 73.6985 169.597 73.6985H191.797C197.32 73.6985 201.797 78.1756 201.797 83.6985V229.753C201.797 235.275 206.275 239.753 211.797 239.753H235.496C241.019 239.753 245.496 235.275 245.496 229.753V83.6984C245.496 78.1756 241.019 73.6984 235.496 73.6984H213.296C207.773 73.6984 203.296 69.2212 203.296 63.6984V40ZM159.597 123.651C159.597 118.129 155.12 113.651 149.597 113.651H125.899C120.376 113.651 115.899 118.129 115.899 123.651V188.551C115.899 194.074 120.376 198.551 125.899 198.551H149.597C155.12 198.551 159.597 194.074 159.597 188.551V123.651Z"
          fill="white"
        />
      </svg>
    </div>
  )
}

export default Blockscout
