import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import rootReducer from "../redux/store";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import AuthProvider from "../component/AuthProvider";
import NetworkMessageWrapper from "../component/networkMessageWrapper";

const store = createStore(rootReducer, applyMiddleware(thunk));

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <NetworkMessageWrapper>
        <AuthProvider>
          <Component {...pageProps} />
          <Footer />
        </AuthProvider>
        </NetworkMessageWrapper>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
