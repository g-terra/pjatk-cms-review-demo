import { SessionProvider } from 'next-auth/react'
import { Alert } from '../src/components/utils/alert'
import { AppLocaleContextProvider } from '../src/context/appLocale.context'
import { LayoutContextProvider, LocaleContext } from '../src/context/layout.context'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <SessionProvider session={session}>
      <AppLocaleContextProvider>
        <Alert />
        <Component {...pageProps} />
      </AppLocaleContextProvider>
    </SessionProvider>

  )
}
export default MyApp
