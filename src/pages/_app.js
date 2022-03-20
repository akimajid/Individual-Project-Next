import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux"
import Navbar from "../component/Navbar"

function MyApp({ Component, pageProps }) {
  return (
  // <Provider>
    <ChakraProvider>
      <Navbar />
    <Component {...pageProps} />
    </ChakraProvider>
  // </Provider>
  )
  
}

export default MyApp
