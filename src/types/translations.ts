export type TranslationKey =
  | 'signInWithEthereum'
  | 'signingMessage'
  | 'connect'
  | 'disconnect'
  | 'follow'
  | 'unfollow'
  | 'following'
  | 'followers'
  | 'loading'
  | 'error'
  | 'success'
  | 'mute'
  | 'unmute'
  | 'block'
  | 'unblock'
  | 'save'
  | 'cancel'
  | 'confirm'
  | 'close'
  | 'viewAll'
  | 'noData'
  | 'retry'
  | 'lists'
  | 'blocked'
  | 'muted'
  | 'notifications.empty'
  | 'notifications.error'
  | 'notifications.follow'
  | 'notifications.unfollow'
  | 'notifications.tag'
  | 'notifications.untag'
  | 'notifications.block'
  | 'notifications.unblock'
  | 'notifications.mute'
  | 'notifications.unmute'
  | 'and'
  | 'others'
  | 'other'
  | 'search placeholder'
  | 'no tags'
  | 'followersYouKnow.title'
  | 'followersYouKnow.viewAll'
  | 'followersYouKnow.noCommon'
  | 'followersYouKnow.followsThem'
  | 'followersYouKnow.followThem'
  | 'followersYouKnow.oneOtherFollows'
  | 'followersYouKnow.othersFollow'
  | 'followersYouKnow.and'
  | 'latest first'
  | 'earliest first'
  | 'follower count'
  // Transactions
  | 'transaction.pending'
  | 'transaction.success'
  | 'transaction.error'
  | 'transaction.rejected'
  // Follower State
  | 'followerState.blocksYou'
  | 'followerState.mutesYou'
  | 'followerState.followsYou'
  // Modals
  | 'modal.cancelTransactions.title'
  | 'modal.cancelTransactions.description'
  | 'modal.cancelTransactions.confirm'
  | 'modal.clearCart.title'
  | 'modal.clearCart.description'
  | 'modal.clearCart.confirm'
  | 'goBack'
  | 'notifications.title'
  | 'notifications.noNotifications'
  | 'profile.editProfile'
  // Recommended
  | 'recommended.empty'
  | 'recommended.title'
  // Transaction Modal Cart
  | 'cart.title'
  | 'cart.changes'
  | 'cart.clearCart'
  | 'cart.noItems'
  | 'cart.action'
  | 'cart.actions'
  | 'cart.transaction'
  | 'cart.transactions'
  | 'cart.backToTop'
  // Transaction Modal Summary
  | 'summary.title'
  | 'summary.txn'
  | 'summary.txns'
  | 'summary.on'
  | 'summary.changeChain'
  | 'summary.insufficientEth'
  // Transaction Modal Manual Add
  | 'manualAdd.placeholder'
  | 'manualAdd.add'
  | 'manualAdd.alreadyInCart'
  | 'manualAdd.alreadyFollowing'
  | 'manualAdd.accountNotFound'
  | 'claimPOAP'

export type TranslationFunction = (key: TranslationKey, fallback?: string) => string

export type LanguageCode = string // e.g., 'en', 'fr', 'es', 'de', etc.

export type TranslationObject = Partial<Record<TranslationKey, string>>

export type TranslationsMap = Record<LanguageCode, TranslationObject>

export interface TranslationConfig {
  // Option 1: Provide translation function (current approach)
  translateFn?: TranslationFunction

  // Option 2: Provide translations object with multiple languages
  translations?: TranslationsMap

  // Option 3: Provide loaded JSON translations (user handles file loading)
  translationsFromJSON?: TranslationsMap

  // Active language selection
  activeLanguage?: LanguageCode

  // Fallback language (defaults to 'en')
  fallbackLanguage?: LanguageCode
}

export const defaultTranslations: Record<TranslationKey, string> = {
  signInWithEthereum: 'Sign in with Ethereum',
  signingMessage: 'Signing Message...',
  connect: 'Connect',
  disconnect: 'Disconnect',
  follow: 'Follow',
  unfollow: 'Unfollow',
  following: 'Following',
  followers: 'Followers',
  loading: 'Loading...',
  error: 'Error',
  success: 'Success',
  mute: 'Mute',
  unmute: 'Unmute',
  block: 'Block',
  unblock: 'Unblock',
  save: 'Save',
  cancel: 'Cancel',
  confirm: 'Confirm',
  close: 'Close',
  viewAll: 'View All',
  noData: 'No data available',
  retry: 'Retry',
  lists: 'Lists',
  blocked: 'Blocked',
  muted: 'Muted',
  // Notifications
  'notifications.empty': 'No notifications',
  'notifications.error': 'Failed to load notifications',
  'notifications.follow': 'followed you',
  'notifications.unfollow': 'unfollowed you',
  'notifications.tag': 'tagged you with',
  'notifications.untag': 'untagged you with',
  'notifications.block': 'blocked you',
  'notifications.unblock': 'unblocked you',
  'notifications.mute': 'muted you',
  'notifications.unmute': 'unmuted you',
  and: 'and',
  others: 'others',
  other: 'other',
  'search placeholder': 'Search ENS or address',
  'no tags': 'no tags',
  'followersYouKnow.title': 'Followers you know',
  'followersYouKnow.viewAll': 'View all',
  'followersYouKnow.noCommon': 'No common followers',
  'followersYouKnow.followsThem': ' follow them',
  'followersYouKnow.followThem': ' follows them',
  'followersYouKnow.oneOtherFollows': '1 other you know follows them',
  'followersYouKnow.othersFollow': 'others you know follow them',
  'followersYouKnow.and': ' and ',
  'latest first': 'Latest first',
  'earliest first': 'Earliest first',
  'follower count': 'Follower count',
  // Transactions
  'transaction.pending': 'Transaction pending...',
  'transaction.success': 'Transaction successful',
  'transaction.error': 'Transaction failed',
  'transaction.rejected': 'Transaction rejected',
  // Follower State
  'followerState.blocksYou': 'Blocks you',
  'followerState.mutesYou': 'Mutes you',
  'followerState.followsYou': 'Follows you',
  // Modals
  'modal.cancelTransactions.title': 'Cancel All Transactions',
  'modal.cancelTransactions.description': 'Are you sure you want to cancel all pending transactions?',
  'modal.cancelTransactions.confirm': 'Cancel All',
  'modal.clearCart.title': 'Clear Cart',
  'modal.clearCart.description': 'Are you sure you want to clear all items from your cart?',
  'modal.clearCart.confirm': 'Clear Cart',
  goBack: 'Go Back',
  'notifications.title': 'Notifications',
  'notifications.noNotifications': 'No notifications',
  'profile.editProfile': 'Edit Profile',
  // Recommended
  'recommended.empty': 'No recommended profiles',
  'recommended.title': 'Recommended',
  // Transaction Modal Cart
  'cart.title': 'Cart',
  'cart.changes': 'Changes',
  'cart.clearCart': 'Clear Cart',
  'cart.noItems': 'No items in cart',
  'cart.action': 'Action',
  'cart.actions': 'Actions',
  'cart.transaction': 'Transaction',
  'cart.transactions': 'Transactions',
  'cart.backToTop': 'Back to top',
  // Transaction Modal Summary
  'summary.title': 'Summary',
  'summary.txn': 'txn',
  'summary.txns': 'txns',
  'summary.on': 'on',
  'summary.changeChain': 'Change Chain',
  'summary.insufficientEth': 'Insufficient ETH on',
  // Transaction Modal Manual Add
  'manualAdd.placeholder': 'ENS name or Address',
  'manualAdd.add': 'Add',
  'manualAdd.alreadyInCart': 'Already in cart',
  'manualAdd.alreadyFollowing': 'Already following',
  'manualAdd.accountNotFound': 'Account not found',
  claimPOAP: 'Claim POAP',
}

// Helper function to load translations from JSON files
export const loadTranslationsFromJSON = async (filePaths: Record<LanguageCode, string>): Promise<TranslationsMap> => {
  const translations: TranslationsMap = {}

  for (const [language, filePath] of Object.entries(filePaths)) {
    try {
      const response = await fetch(filePath)
      if (response.ok) {
        const data = await response.json()
        translations[language] = data
      } else {
        console.warn(`Failed to load translation file for ${language}: ${filePath}`)
      }
    } catch (error) {
      console.warn(`Error loading translation file for ${language}: ${filePath}`, error)
    }
  }

  return translations
}
