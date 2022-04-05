import { ChakraProvider } from "@chakra-ui/react";
import Nav from "../components/NavBar";
import store from "../redux/store";
import { Provider } from "react-redux";
import AuthProvider from "../components/AuthProvider/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AuthProvider>
          <Nav />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
