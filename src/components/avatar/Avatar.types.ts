export type AvatarProps = {
  address?: string
  src?: string | null
  name?: string
  fallback?: string
  onClick?: () => void
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLDivElement>
