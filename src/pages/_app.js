import { ChakraProvider } from "@chakra-ui/react";
import Nav from "../components/NavBar";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import { Provider } from "react-redux";
import store from "../redux/store";

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
