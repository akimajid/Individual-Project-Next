import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

function MyApp({ Component, pageProps }) {
  return (
    // <Provider>
    <ChakraProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
    // </Provider>
  );
}

export default MyApp;
