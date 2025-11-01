import { twMerge } from 'tailwind-merge'

export default function Loader({
  size = 20,
  color = 'primary',
  loading = true
}) {
  const colors: Record<string, string> = {
    light: '#fff',
    dark: '#0E111B',
    primary: '#FDC000'
  }
  return (
    loading && (
      <div
        data-testid="loader"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderColor: colors[color] || color
        }}
        className={twMerge(
          'animate-spin rounded-full border-4',
          'border-t-transparent!'
        )}></div>
    )
  )
}
