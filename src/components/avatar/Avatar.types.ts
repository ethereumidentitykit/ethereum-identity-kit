export type AvatarProps = {
  address?: string | null
  src?: string | null
  name?: string | null
  fallback?: string
  onClick?: () => void
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLDivElement>
