import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "next-auth/client";
import Layout from "../components/layout/layout";
import { SSRProvider } from "react-bootstrap";
import { useStore } from "../store";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

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
