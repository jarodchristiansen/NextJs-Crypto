import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "next-auth/client";
import Layout from "../components/layout/layout";
import { SSRProvider } from "react-bootstrap";
import {useStore} from "../store";

function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)

  return (
    <Provider session={pageProps.session} store={store}>
      <SSRProvider session={pageProps.session} store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SSRProvider>
    </Provider>
  );
}

export default MyApp;
