import { ChakraProvider } from '@chakra-ui/react'
import Nav from "../components/NavBar"
import store from '../redux/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  return (
   <Provider store={store}>
    <ChakraProvider>
      <Nav />
      <Component {...pageProps} />
    </ChakraProvider>
   </Provider>
  )
}

export default MyApp


