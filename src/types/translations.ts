export type TranslationKey =
  // Common
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
  // Sign in with Ethereum
  | 'signInWithEthereum'
  | 'signingMessage'
  // Notifications
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
  // Common Followers
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
  // Transactions/Checkout
  | 'transaction.switchChain'
  | 'transaction.initiate'
  | 'transaction.pending'
  | 'transaction.reInitiate'
  | 'transaction.indexing'
  | 'transaction.finish'
  | 'transaction.next'
  | 'transaction.selectChain'
  | 'transaction.selectChainDescription'
  | 'transaction.selectChainLater'
  | 'transaction.updateListSettings'
  | 'listSettings.owner'
  | 'listSettings.manager'
  | 'listSettings.user'
  | 'listSettings.listStorageLocation'
  | 'listSettings.setPrimaryList'
  | 'listSettings.resetList'
  | 'transaction.onchainUpdate'
  | 'transaction.claimPOAPTitle'
  | 'transaction.claimPOAPDescription'
  | 'transaction.claimPOAP'
  | 'transaction.noThanks'
  // Follower State
  | 'followerState.blocksYou'
  | 'followerState.mutesYou'
  | 'followerState.followsYou'
  // Modals
  | 'modal.cancelTransactions.title'
  | 'modal.cancelTransactions.description'
  | 'modal.cancelTransactions.confirm'
  | 'cart.clearCart'
  | 'cart.clearCart.description'
  | 'cart.clearCart'
  | 'goBack'
  | 'notifications.title'
  | 'profile.editProfile'
  | 'profile.noUser'
  | 'profile.noBio'
  | 'profile.showMore'
  | 'profile.showLess'
  | 'profile.notConfirmedByUser'
  | 'profile.notConfirmedByUserDescription'
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
  | 'backToTop'
  // Transaction Modal Summary
  | 'summary.title'
  | 'summary.txn'
  | 'summary.txns'
  | 'summary.on'
  | 'summary.changeChain'
  | 'summary.insufficientEth'
  // Transaction Modal Manual Add
  | 'manualAdd.add'
  | 'manualAdd.alreadyInCart'
  | 'manualAdd.alreadyFollowing'
  | 'manualAdd.accountNotFound'

export type TranslationFunction = (key: TranslationKey, fallback?: string) => string

export type LanguageCode = string // e.g., 'en', 'fr', 'es', 'de', etc.

export type TranslationObject = Partial<Record<TranslationKey, string>>

export type TranslationsMap = Record<LanguageCode, TranslationObject>

export interface TranslationConfig {
  translateFn?: TranslationFunction
  translations?: TranslationsMap
  translationsFromJSON?: TranslationsMap
  activeLanguage?: LanguageCode
  fallbackLanguage?: LanguageCode
}
