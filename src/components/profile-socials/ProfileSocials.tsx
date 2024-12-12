import clsx from 'clsx'
import React from 'react'
import { PROFILE_CARD_SOCIALS } from '../../constants/socials'
import Dweb from '../icons/Dweb'
import Link from '../icons/Link'
import LoadingCell from '../loading-cell/LoadingCell'
import './ProfileSocials.css'
import type { ProfileSocialsProps } from './ProfileSocials.types'

/**
 * Component to display the social links of a user
 * @param userAddress - The address of the user
 * @param name - The name of the user
 * @param records - The records of the user
 * @param darkMode - Whether the profile is in dark mode
 * @param includeUrls - Whether to include the URLs in the profile
 * @param iconSize - The size of the icons
 * @param isLoading - Whether the profile is loading
 * @returns ProfileSocials component
 */
const ProfileSocials: React.FC<ProfileSocialsProps> = ({
  userAddress,
  name,
  records,
  darkMode,
  includeUrls = false,
  iconSize = 32,
  isLoading = false
}) => {
  return (
    <div className='profile-socials'>
      {includeUrls &&
        (isLoading ? (
          <div className='profile-links-container'>
            <LoadingCell height='26px' width='68px' radius='18px' />
            <LoadingCell height='26px' width='68px' radius='18px' />
          </div>
        ) : (
          <div className='profile-links-container'>
            {records?.url && (
              <a
                href={`https://${records?.url.replace('https://', '').replace('http://', '')}`}
                target='_blank'
                rel='noreferrer'
                className={clsx(
                  'profile-link',
                  darkMode ? 'profile-link-dark' : 'profile-link-light'
                )}
              >
                <p className='profile-link-text'>
                  {records?.url.slice(-1) === '/'
                    ? records?.url.replace('https://', '').slice(0, -1)
                    : records?.url.replace('https://', '')}
                </p>
                <Link height={14} width={14} />
              </a>
            )}
            {records?.contenthash && name && (
              <a
                href={`https://${name}.limo`}
                target='_blank'
                rel='noreferrer'
                className={clsx(
                  'profile-link',
                  darkMode ? 'profile-link-dark' : 'profile-link-light'
                )}
                style={{
                  paddingRight: '2px'
                }}
              >
                <p className='profile-link-text'>dweb</p>
                <Dweb height={20} width={20} />
              </a>
            )}
          </div>
        ))}
      <div className='socials-container'>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
            <LoadingCell key={index} height='36px' width='36px' radius='18px' />
          ))
          : PROFILE_CARD_SOCIALS.map(social => (
            <a
              key={social.name}
              href={social.url(
                social.name === 'etherscan' ? userAddress || '' : records?.[social.name] || ''
              )}
              target='_blank'
              rel='noreferrer'
              aria-disabled={!records?.[social.name] && social.name !== 'etherscan'}
              className='social-link'
            // Hide social links that don't exist, can be switched to just reducing opacity
            >
              {darkMode ? (
                <social.icon.dark className='social-icon' height={iconSize} width={iconSize} />
              ) : (
                <social.icon.light className='social-icon' height={iconSize} width={iconSize} />
              )}
            </a>
          ))}
      </div>
    </div>
  )
}

export default ProfileSocials
