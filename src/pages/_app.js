import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import rootReducer from "../redux/store";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

const store = createStore(rootReducer, applyMiddleware(thunk));

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
