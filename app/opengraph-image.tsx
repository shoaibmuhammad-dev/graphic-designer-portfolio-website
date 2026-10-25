import { ImageResponse } from 'next/og'
import { siteConfig } from '@/data/site'
import { theme } from '@/data/theme'

export const alt = `${siteConfig.name} - ${siteConfig.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: theme.background,
          color: theme.ink,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -140,
            top: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: theme.accent.DEFAULT,
            opacity: 0.22,
          }}
        />
        <div style={{ display: 'flex', fontSize: 26, color: theme.muted, letterSpacing: 4 }}>
          PORTFOLIO / {siteConfig.city.toUpperCase()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 148, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>
            {siteConfig.name}
          </div>
          <div style={{ display: 'flex', fontSize: 148, fontWeight: 700, letterSpacing: -6, lineHeight: 1, color: theme.muted }}>
            {siteConfig.role}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 32, color: theme.accent.ink }}>{siteConfig.tagline}</div>
      </div>
    ),
    { ...size },
  )
}
