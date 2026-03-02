import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Life. Elevated. — Elevate Your Results',
  description: 'A Complete Framework for Designing the Life You Are Capable of Living.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { font-size: 16px; scroll-behavior: smooth; }
          body { font-family: 'Palatino Linotype', Palatino, Georgia, serif;
                 background: #ffffff; color: #080808; line-height: 1.7; }
          button { font-family: inherit; }
          textarea, input { font-family: inherit; }
          textarea { resize: none; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}