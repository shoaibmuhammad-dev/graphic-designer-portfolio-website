import { ImageResponse } from 'next/og'
import { theme } from '@/data/theme'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.ink,
          color: '#FFFFFF',
          fontSize: 88,
          fontWeight: 700,
        }}
      >
        KZ
      </div>
    ),
    { ...size },
  )
}
