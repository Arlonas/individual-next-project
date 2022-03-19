import { ChakraProvider } from '@chakra-ui/react'
import Nav from "../components/NavBar"

function MyApp({ Component, pageProps }) {
  return (
    
    <ChakraProvider>
      <Nav />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

