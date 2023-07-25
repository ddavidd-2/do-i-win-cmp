import { Inter } from 'next/font/google'
import GlobalStyles from '@/components/GlobalStyles'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'
import MainWrapper from '@/components/MainWrapper'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Header />
          <MainWrapper>
            {children}
          </MainWrapper>
          <GlobalStyles />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
