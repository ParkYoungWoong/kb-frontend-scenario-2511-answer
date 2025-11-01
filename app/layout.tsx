import { roboto } from '@/styles/fonts'
import '@/styles/global.css'
import { QueryProvider } from '@/providers/query'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${roboto.className} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
