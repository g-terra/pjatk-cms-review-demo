import { SessionProvider } from 'next-auth/react'
import { AppLocaleContextProvider } from '../src/context/appLocale.context'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <>
      <SessionProvider session={session}>
        <AppLocaleContextProvider>
            <Component {...pageProps} />
        </AppLocaleContextProvider>
      </SessionProvider>
    </>

  )
}
export default MyApp
