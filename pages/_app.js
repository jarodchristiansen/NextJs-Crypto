import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'next-auth/client'
import Layout from '../components/layout/layout';
import {SSRProvider} from "react-bootstrap";

function MyApp({ Component, pageProps }) {
  return (
      <SSRProvider session={pageProps.session}>
  <Layout>
  <Component {...pageProps} />
  </Layout>
      </SSRProvider>
  );
}

export default MyApp
