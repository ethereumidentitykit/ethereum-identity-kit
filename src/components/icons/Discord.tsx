import React from 'react'

const Discord: React.FC<React.SVGProps<SVGSVGElement>> = ({ height = 32, width = 32 }) => {
  return (
    <div>
      <svg width={width} height={height} viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='18' cy='18' r='18' fill='#8C9EFF' />
        <g clip-path='url(#clip0_3129_6940)'>
          <path
            d='M25.6361 11.3964C24.1907 10.7347 22.6648 10.2652 21.0974 10C20.8829 10.3834 20.6888 10.7779 20.5159 11.1818C18.8463 10.9303 17.1484 10.9303 15.4788 11.1818C15.3059 10.778 15.1118 10.3835 14.8974 10C13.329 10.2674 11.8021 10.738 10.3552 11.3999C7.48276 15.6497 6.70409 19.7939 7.09342 23.8793C8.77559 25.1222 10.6584 26.0674 12.66 26.6739C13.1108 26.0677 13.5096 25.4246 13.8523 24.7515C13.2014 24.5083 12.5731 24.2084 11.9748 23.8551C12.1323 23.7409 12.2863 23.6232 12.4351 23.509C14.176 24.3278 16.0762 24.7523 18 24.7523C19.9238 24.7523 21.8239 24.3278 23.5649 23.509C23.7154 23.6319 23.8694 23.7496 24.0252 23.8551C23.4257 24.209 22.7963 24.5095 22.1442 24.7532C22.4865 25.426 22.8854 26.0686 23.3365 26.6739C25.3398 26.0699 27.2241 25.1251 28.9065 23.8811C29.3634 19.1433 28.1261 15.0371 25.6361 11.3964ZM14.3454 21.3668C13.2605 21.3668 12.3641 20.3823 12.3641 19.171C12.3641 17.9597 13.2293 16.9665 14.342 16.9665C15.4546 16.9665 16.344 17.9597 16.325 19.171C16.3059 20.3823 15.4511 21.3668 14.3454 21.3668ZM21.6545 21.3668C20.5679 21.3668 19.675 20.3823 19.675 19.171C19.675 17.9597 20.5402 16.9665 21.6545 16.9665C22.7689 16.9665 23.6514 17.9597 23.6324 19.171C23.6133 20.3823 22.7602 21.3668 21.6545 21.3668Z'
            fill='white'
          />
        </g>
        <defs>
          <clipPath id='clip0_3129_6940'>
            <rect width='22' height='16.6739' fill='white' transform='translate(7 10)' />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default Discord