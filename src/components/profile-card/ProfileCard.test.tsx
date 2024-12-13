import ProfileCard from './ProfileCard'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProfileCardProps } from './ProfileCard.types'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'

const mockProps: ProfileCardProps = {
  addressOrName: 'encrypteddegen.eth',
  list: undefined,
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  darkMode: false,
  showFollowerState: true,
  onStatClick: jest.fn(({ addressOrName, stat }) => {
    console.log(`Stat clicked: ${stat} for ${addressOrName}`)
  }),
  options: {
    profileData: {
      address: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
      ens: {
        name: 'encrypteddegen.eth',
        avatar: 'https://euc.li/encrypteddegen.eth',
        records: {
          avatar: 'https://euc.li/encrypteddegen.eth',
          'com.discord': 'encrypteddegen.eth',
          'com.github': 'encryptedDegen',
          'com.twitter': 'ZunecJan',
          description: 'UI/UX Designer & Developer | Building the web3 social graph @efp.eth',
          header: 'https://i.imgur.com/pWYMFBn.jpeg',
          'org.telegram': 'encrypteddegen',
        },
      },
      ranks: {
        mutuals_rank: 270,
        followers_rank: 119,
        following_rank: 694,
        top8_rank: 133,
        blocks_rank: 0,
      },
      primary_list: '1',
    },
    statsData: {
      followers_count: 316,
      following_count: 100,
    },
    prefetchedStatsLoading: false,
    prefetchedProfileLoading: false,
    refetchProfileData: jest.fn(),
    refetchStatsData: jest.fn(),
  },
  className: 'custom-class',
}

const queryClient = new QueryClient()

const CardWithQueryClient = (props: ProfileCardProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileCard {...props} />
    </QueryClientProvider>
  )
}

describe('ProfileCard Component', () => {
  it('renders without crashing', () => {
    render(<CardWithQueryClient {...mockProps} />)
    expect(screen.getByText(mockProps.addressOrName)).toBeDefined()
  })

  it('displays the correct list number', () => {
    render(<CardWithQueryClient {...mockProps} />)
    expect(screen.getByText(`List #${mockProps.options?.profileData?.primary_list}`)).toBeDefined()
  })

  it('displays the correct follower and following counts', () => {
    render(<CardWithQueryClient {...mockProps} />)
    expect(screen.getByText(mockProps.options?.statsData?.followers_count || '-')).toBeDefined()
    expect(screen.getByText(mockProps.options?.statsData?.following_count || '-')).toBeDefined()
  })

  it('calls onStatClick when a stat is clicked', () => {
    render(<CardWithQueryClient {...mockProps} />)
    fireEvent.click(screen.getByText('Following'))
    expect(mockProps.onStatClick).toHaveBeenCalledWith({
      addressOrName: mockProps.options?.profileData?.address || mockProps.addressOrName,
      stat: 'following',
    })
  })

  it('displays the bio with a link for @mentions', () => {
    render(<CardWithQueryClient {...mockProps} />)
    const bioLink = screen.getByText('@efp.eth')
    expect(bioLink).toBeDefined()
    expect(bioLink).toHaveProperty('href', 'https://ethfollow.xyz/efp.eth')
  })

  it('applies custom class', () => {
    render(<CardWithQueryClient {...mockProps} />)
    const profileCard = screen.getByTestId('profile-card')
    expect(profileCard).toHaveProperty('className', 'profile-card profile-card-light custom-class')
  })
})
