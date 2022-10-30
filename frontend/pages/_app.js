import { LayoutContextProvider, LocaleContext } from '../src/context/layout.context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
      <Component {...pageProps} />
  )
}
export default MyApp
