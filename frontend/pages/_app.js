import { SessionProvider } from 'next-auth/react'
import Layout from '../src/components/layout/layout'
import AlertWrapper from '../src/components/utils/alertWrapper'
import { AppLocaleContextProvider } from '../src/context/appLocale.context'
import { LayoutContextProvider, LocaleContext } from '../src/context/layout.context'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <>
      <SessionProvider session={session}>
        <AppLocaleContextProvider>
          <AlertWrapper>
            <Component {...pageProps} />
          </AlertWrapper>
        </AppLocaleContextProvider>
      </SessionProvider>
    </>

  )
}
export default MyApp
