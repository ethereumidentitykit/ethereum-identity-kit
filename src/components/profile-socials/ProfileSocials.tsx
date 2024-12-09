import React from 'react'
import { PROFILE_CARD_SOCIALS } from '../../constants/socials'
import type { ProfileSocialsProps } from './ProfileSocials.types'
import Dweb from '../../assets/dweb.png';
import './ProfileSocials.css'
import LoadingCell from '../loading-cell';

const ProfileSocials: React.FC<ProfileSocialsProps> = ({ userAddress, name, records, iconSize = 36, isLoading = false }) => {
  return (
    <div className='profile-socials'>
      {!isLoading && <div className='profile-links-container'>
        {records?.url && (
          <a
            href={`https://${records?.url.replace('https://', '').replace('http://', '')}`}
            target='_blank'
            rel='noreferrer'
            className='profile-link'
          >
            <p>
              {records?.url.slice(-1) === '/'
                ? records?.url.replace('https://', '').slice(0, -1)
                : records?.url.replace('https://', '')}
            </p>
          </a>
        )}
        {records?.contenthash && name && (
          <a
            href={`https://${name}.limo`}
            target='_blank'
            rel='noreferrer'
            className='profile-link'
          >
            <p>dweb</p>
            <img
              src={Dweb}
              alt='dweb'
              width={20}
              height={20}
            />
          </a>
        )}
      </div>}
      <div className='socials-container'>
        {isLoading ? Array.from({ length: 5 }).map((_, index) => <LoadingCell key={index} height='36px' width='36px' radius='18px' />)
          : PROFILE_CARD_SOCIALS.map(social => (
            <a
              key={social.name}
              href={social.url(
                social.name === 'etherscan' ? userAddress : records?.[social.name] || ''
              )}
              target='_blank'
              rel='noreferrer'
              aria-disabled={!records?.[social.name] && social.name !== 'etherscan'}
              className='social-link'
            // Hide social links that don't exist, can be switched to just reducing opacity
            >
              <img
                src={social.icon}
                alt={social.name}
                width={iconSize}
                height={iconSize}
                className='social-icon'
              />
            </a>
          ))}
      </div>
    </div>
  )
}

export default ProfileSocials