import { Cross, FollowIcon } from '../components/icons'
import Mute from '../components/icons/ui/Mute'
import Tag from '../components/icons/ui/Tag'
import { EFPActionType } from '../types/transactions'

export const EFPActionIds: Record<EFPActionType, string> = {
  CreateEFPList: 'CreateEFPList',
  UpdateEFPList: 'UpdateEFPList',
  SetEFPListSettings: 'SetEFPListSettings',
  UpdateENSProfile: 'UpdateENSProfile',
}

export const TRANSACTION_TITLES = {
  [EFPActionIds.CreateEFPList]: 'Create EFP List',
  [EFPActionIds.UpdateEFPList]: 'Update EFP List',
}

export const ACTION_ITEM_ICON = {
  follow: {
    icon: FollowIcon,
    color: '#FFE066',
  },
  unfollow: {
    icon: FollowIcon,
    color: '#FF7C7C',
  },
  tag: {
    icon: Tag,
    color: '#AAAAAA',
  },
  untag: {
    icon: Tag,
    color: '#AAAAAA',
  },
  block: {
    icon: Cross,
    color: '#FF7C7C',
  },
  unblock: {
    icon: Cross,
    color: '#FFE066',
  },
  mute: {
    icon: Mute,
    color: '#FF7C7C',
  },
  unmute: {
    icon: Mute,
    color: '#FFE066',
  },
}
