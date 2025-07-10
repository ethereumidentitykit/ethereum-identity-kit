export type AvatarProps = {
  address?: string | null
  src?: string | null
  name?: string | null
  fallback?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLDivElement>
