import clsx from 'clsx'
import React from 'react'
import { Link, Dweb } from '../../icons'
import LoadingCell from '../../atoms/loading-cell/LoadingCell'
import { PROFILE_CARD_SOCIALS } from '../../../constants/socials'
import type { ProfileSocialsProps } from './ProfileSocials.types'
import './ProfileSocials.css'

/**
 * Component to display the social links of a user
 *
 * @param userAddress - The address of the user (required)
 *
 * @param name - The name of the user (optional)
 *
 * @param records - The records of the user (required)
 *
 * @param darkMode - Whether the profile is in dark mode (optional)
 *
 * @param includeUrls - Whether to include the URLs in the profile (optional)
 *
 * @param iconSize - The size of the icons (optional)
 *
 * @param isLoading - Whether the profile is loading (optional)
 *
 * @returns ProfileSocials component
 */
const ProfileSocials: React.FC<ProfileSocialsProps> = ({
  userAddress,
  name,
  records,
  darkMode,
  includeUrls = false,
  iconSize = 32,
  isLoading = false,
  style,
  showEmptySocials = true,
}) => {
  return (
    <div className={clsx('profile-socials', darkMode && 'dark')} style={style}>
      {includeUrls &&
        (isLoading ? (
          <div className="profile-links-container">
            <LoadingCell height="26px" width="68px" radius="4px" />
            <LoadingCell height="26px" width="68px" radius="4px" />
          </div>
        ) : records?.url || records?.contenthash ? (
          <div className="profile-links-container">
            {records?.url && (
              <a
                href={`https://${records?.url.replace('https://', '').replace('http://', '')}`}
                target="_blank"
                rel="noreferrer"
                className="profile-link"
                style={{
                  paddingRight: '6px',
                }}
              >
                <p className="profile-link-text">
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
                target="_blank"
                rel="noreferrer"
                className="profile-link"
                style={{
                  paddingRight: '2px',
                }}
              >
                <p className="profile-link-text">dweb</p>
                <Dweb height={20} width={20} style={{ borderRadius: '4px' }} />
              </a>
            )}
          </div>
        ) : null)}
      <div className="socials-container">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <LoadingCell key={index} height={iconSize} width={iconSize} radius="18px" />
            ))
          : PROFILE_CARD_SOCIALS.map((social) =>
              records?.[social.name] || social.name === 'etherscan' || showEmptySocials ? (
                <a
                  key={social.name}
                  href={social.url(social.name === 'etherscan' ? userAddress || '' : records?.[social.name] || '')}
                  target={social.name === 'email' ? '_self' : '_blank'}
                  rel="noreferrer"
                  aria-disabled={!records?.[social.name] && social.name !== 'etherscan'}
                  className="social-link"
                  onClick={() => {
                    if (social.name === 'email') {
                      navigator.clipboard.writeText(records?.[social.name] || '')
                    }
                  }}
                >
                  <div className="social-icon-dark">
                    <social.icon.dark height={iconSize} width={iconSize} />
                  </div>
                  <div className="social-icon">
                    <social.icon.light height={iconSize} width={iconSize} />
                  </div>
                </a>
              ) : null
            )}
      </div>
    </div>
  )
}

export default ProfileSocials
