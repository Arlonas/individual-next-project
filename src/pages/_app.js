import { ChakraProvider } from "@chakra-ui/react";
import Nav from "../components/NavBar";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import { Provider } from "react-redux";
import store from "../redux/store";
import NetworkMessageWrapper from "../components/NetworkMessageWrapper";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AuthProvider>
          <NetworkMessageWrapper>
            <Nav />
            <Component {...pageProps} />
          </NetworkMessageWrapper>
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
