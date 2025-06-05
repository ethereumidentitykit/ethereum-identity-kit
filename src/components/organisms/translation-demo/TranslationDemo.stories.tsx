import React from 'react'
import { useTranslation } from '../../../context/TranslationContext'
import { TranslationKey } from '../../../types/translations'

const TranslationDemo = () => {
  const { t, activeLanguage, availableLanguages } = useTranslation()

  // Complete list of all translation keys (66 total) - updated with latest keys
  const translationKeys: TranslationKey[] = [
    'signInWithEthereum',
    'signingMessage',
    'connect',
    'disconnect',
    'follow',
    'unfollow',
    'following',
    'followers',
    'loading',
    'error',
    'success',
    'mute',
    'unmute',
    'block',
    'unblock',
    'save',
    'cancel',
    'confirm',
    'close',
    'viewAll',
    'noData',
    'retry',
    'followers',
    'following',
    'lists',
    'blocked',
    'muted',
    'notifications.empty',
    'notifications.error',
    'notifications.follow',
    'notifications.unfollow',
    'notifications.tag',
    'notifications.untag',
    'notifications.block',
    'notifications.unblock',
    'notifications.mute',
    'notifications.unmute',
    'and',
    'others',
    'other',
    'search placeholder',
    'no tags',
    'followersYouKnow.title',
    'followersYouKnow.viewAll',
    'followersYouKnow.noCommon',
    'followersYouKnow.followThem',
    'followersYouKnow.oneOtherFollows',
    'followersYouKnow.othersFollow',
    'followersYouKnow.and',
    'transaction.pending',
    'transaction.initiate',
    'transaction.switchChain',
    'transaction.indexing',
    'transaction.finish',
    'transaction.reInitiate',
    'transaction.next',
    'followerState.blocksYou',
    'followerState.mutesYou',
    'followerState.followsYou',
    'modal.cancelTransactions.title',
    'modal.cancelTransactions.description',
    'modal.cancelTransactions.confirm',
    'cart.clearCart',
    'cart.clearCart.description',
    'cart.clearCart',
    'goBack',
    'notifications.title',
    'profile.editProfile',
    'recommended.empty',
  ]

  // Group keys by category for better organization
  const keyCategories = {
    'Authentication & Connection': translationKeys.filter((key) =>
      ['signInWithEthereum', 'signingMessage', 'connect', 'disconnect'].includes(key)
    ),
    'User Actions': translationKeys.filter((key) =>
      [
        'follow',
        'unfollow',
        'following',
        'mute',
        'unmute',
        'block',
        'unblock',
        'save',
        'cancel',
        'confirm',
        'close',
        'viewAll',
        'retry',
        'goBack',
      ].includes(key)
    ),
    'System States': translationKeys.filter((key) => ['loading', 'error', 'success', 'noData'].includes(key)),
    'Profile Statistics': translationKeys.filter((key) => key.startsWith('profile.stats')),
    Notifications: translationKeys.filter(
      (key) => key.startsWith('notifications') && !key.startsWith('notifications.')
    ),
    'Notification Actions': translationKeys.filter((key) => key.startsWith('notifications.')),
    'Table Headers': translationKeys.filter((key) => key.startsWith('tableHeaders')),
    'Followers You Know': translationKeys.filter((key) => key.startsWith('followersYouKnow')),
    'Transaction States': translationKeys.filter((key) => key.startsWith('transaction')),
    'Follower States': translationKeys.filter((key) => key.startsWith('followerState')),
    'Modal Dialogs': translationKeys.filter((key) => key.startsWith('modal')),
    Other: translationKeys.filter((key) => ['followers', 'profile.editProfile', 'recommended.empty'].includes(key)),
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#1a1a1a', marginBottom: '8px', fontSize: '32px' }}>Translation System Demo</h1>
      <p style={{ color: '#666', marginBottom: '24px', fontSize: '16px', lineHeight: '1.5' }}>
        Complete demonstration of all <strong>{translationKeys.length} translation keys</strong> across{' '}
        <strong>{Object.keys(keyCategories).length} categories</strong>
      </p>

      {/* Current Settings Panel */}
      <div
        style={{
          marginBottom: '32px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0', color: '#495057', fontSize: '18px' }}>🌍 Current Translation Settings</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            <strong style={{ color: '#495057' }}>Active Language:</strong>
            <div style={{ color: '#007bff', fontSize: '16px', fontWeight: '600', marginTop: '4px' }}>
              {activeLanguage?.toUpperCase() || 'EN'}
            </div>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            <strong style={{ color: '#495057' }}>Available Languages:</strong>
            <div style={{ color: '#28a745', fontSize: '16px', fontWeight: '600', marginTop: '4px' }}>
              {availableLanguages?.join(', ').toUpperCase() || 'EN, ES, FR'}
            </div>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            <strong style={{ color: '#495057' }}>Total Translation Keys:</strong>
            <div style={{ color: '#dc3545', fontSize: '16px', fontWeight: '600', marginTop: '4px' }}>
              {translationKeys.length}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#e7f3ff',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#0056b3',
          }}
        >
          💡 <strong>Tip:</strong> Use the language selector in the Storybook toolbar to switch languages and see
          translations update in real-time.
        </div>
      </div>

      {/* Translation Categories */}
      {Object.entries(keyCategories).map(
        ([category, keys]) =>
          keys.length > 0 && (
            <div key={category} style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  color: '#343a40',
                  borderLeft: '4px solid #007bff',
                  paddingLeft: '12px',
                  marginBottom: '20px',
                  fontSize: '22px',
                  fontWeight: '600',
                }}
              >
                {category}{' '}
                <span style={{ color: '#6c757d', fontSize: '16px', fontWeight: '400' }}>({keys.length} keys)</span>
              </h2>

              <div
                style={{
                  overflow: 'hidden',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                }}
              >
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    backgroundColor: '#fff',
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th
                        style={{
                          border: '1px solid #dee2e6',
                          padding: '16px',
                          textAlign: 'left',
                          fontWeight: '600',
                          color: '#495057',
                          fontSize: '14px',
                          width: '45%',
                        }}
                      >
                        🔑 Translation Key
                      </th>
                      <th
                        style={{
                          border: '1px solid #dee2e6',
                          padding: '16px',
                          textAlign: 'left',
                          fontWeight: '600',
                          color: '#495057',
                          fontSize: '14px',
                        }}
                      >
                        🌐 Current Translation ({activeLanguage?.toUpperCase() || 'EN'})
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {keys.map((key, index) => (
                      <tr
                        key={key}
                        style={{
                          backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                        }}
                      >
                        <td
                          style={{
                            border: '1px solid #dee2e6',
                            padding: '12px 16px',
                            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                            fontSize: '13px',
                            color: '#e83e8c',
                            backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                            verticalAlign: 'top',
                            lineHeight: '1.4',
                          }}
                        >
                          {key}
                        </td>
                        <td
                          style={{
                            border: '1px solid #dee2e6',
                            padding: '12px 16px',
                            color: '#212529',
                            lineHeight: '1.5',
                            fontSize: '14px',
                          }}
                        >
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '4px 8px',
                              backgroundColor: '#e7f3ff',
                              borderRadius: '4px',
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#0056b3',
                            }}
                          >
                            &quot;{t(key)}&quot;
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
      )}

      {/* Features Summary */}
      <div
        style={{
          marginTop: '48px',
          padding: '24px',
          // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          background: '#f8f9fa',
          borderRadius: '12px',
          color: '#000',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0', fontSize: '20px' }}>🚀 Translation System Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>🔒 Type Safety</h4>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
              All translation keys are strongly typed with TypeScript
            </p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>🛡️ Fallback System</h4>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
              Gracefully falls back to English if translation is missing
            </p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>⚡ Dynamic Switching</h4>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Change languages at runtime without page reload</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>📁 JSON Support</h4>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Load translations from external JSON files</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>🌍 Multi-Language</h4>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Currently supports English, Spanish, and French</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>👩‍💻 Developer Experience</h4>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Easy to add new keys and maintain translations</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Story configuration
export default {
  title: 'Organisms/Translation System',
  component: TranslationDemo,
  parameters: {
    docs: {
      description: {
        component: `
# 🌍 Translation System Demo

This comprehensive demo showcases the complete internationalization system for the Ethereum Identity Kit with **66 translation keys** across **12 categories**.

## 📊 System Overview

- **Total Translation Keys**: 66
- **Supported Languages**: English (en), Spanish (es), French (fr)
- **Categories**: 12 organized categories
- **Type Safety**: Full TypeScript support
- **Runtime Switching**: Dynamic language changes

## 🚀 Key Features

### Type-Safe Translations
All translation keys are strongly typed, preventing typos and ensuring consistency across the application.

### Fallback System
If a translation is missing in the selected language, the system gracefully falls back to English.

### Dynamic Language Switching
Users can change languages at runtime without requiring a page reload.

### JSON-Based Translations
Translations are loaded from JSON files, making it easy to manage and update content.

### Developer Experience
The system is designed for ease of use, with clear APIs and comprehensive tooling.

## 📚 Categories

1. **Authentication & Connection** - Sign-in and wallet connection
2. **User Actions** - Follow, block, mute, and other user interactions  
3. **System States** - Loading, error, and success states
4. **Profile Statistics** - User profile metrics and counts
5. **Notifications** - General notification messages
6. **Notification Actions** - Specific notification action text
7. **Table Headers** - Search and filter interface elements
8. **Followers You Know** - Social connection features
9. **Transaction States** - Blockchain transaction status
10. **Follower States** - User relationship indicators
11. **Modal Dialogs** - Confirmation and dialog messages
12. **Other** - Miscellaneous translations

## 💻 Usage Example

\`\`\`tsx
import { useTranslation } from '@ethereum-identity-kit/context'

function MyComponent() {
  const { t, activeLanguage } = useTranslation()
  
  return (
    <div>
      <button>{t('follow')}</button>
      <p>Current language: {activeLanguage}</p>
    </div>
  )
}
\`\`\`

## 🎮 Interactive Demo

Use the **language selector in the Storybook toolbar** above to switch between languages and see all translations update in real-time!
        `,
      },
    },
  },
}

export const Default = {
  name: 'Complete Translation Demo',
}
