import React from 'react'
import { useTranslation } from '../../../../../context'
import { TransactionType } from '../../../../../types/transactions'
import MapPin from '../../../../icons/ui/MapPin'
import Person from '../../../../icons/ui/Person'
import Key from '../../../../icons/ui/Key'
import Pencil from '../../../../icons/ui/Pencil'
import List from '../../../../icons/ui/List'
import Reset from '../../../../icons/ui/Reset'
import { isAddress } from '../../../../../utils'
import ListAccount from './ListAccount'
import { Address, TranslationKey } from '../../../../../types'
import './ListSettings.css'

export interface ListSettingsProps {
  txs: TransactionType[]
}

const ListSettings: React.FC<ListSettingsProps> = ({ txs }) => {
  const { t } = useTranslation()

  return (
    <div className="list-settings-container">
      <p className="list-settings-title">{t('transaction.updateListSettings')}</p>
      <div className="list-settings-items-container">
        {txs.map((tx, index) => (
          <ListSetting key={index} title={tx.title} description={tx.description} />
        ))}
      </div>
    </div>
  )
}

export interface ListSettingProps {
  title?: string
  description?: string
}

export const ListSetting: React.FC<ListSettingProps> = ({ title, description }) => {
  const { t } = useTranslation()

  const ListSettingIcon = {
    owner: Key,
    manager: Pencil,
    user: Person,
    'list storage location': MapPin,
    'set primary list': List,
    'reset list': Reset,
    default: null,
  }[title || 'default']

  const titleTranslationKey = title
    ?.split(' ')
    .map((word, index) => (index > 0 ? word[0].toUpperCase() + word.slice(1) : word))
    .join('')

  return (
    <div className="list-setting-container">
      <div className="list-setting-title-container">
        {ListSettingIcon && (
          <div className="list-setting-icon-container">
            <ListSettingIcon height={18} width={18} />
          </div>
        )}
        <p className="list-setting-title">{t(`listSettings.${titleTranslationKey}` as TranslationKey)}</p>
      </div>
      {description && isAddress(description) ? (
        <ListAccount address={description as Address} />
      ) : (
        <p className="list-setting-description">{description}</p>
      )}
    </div>
  )
}

export default ListSettings
