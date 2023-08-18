import type { AppProps } from 'next/app'
import '../src/styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '@/store'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
