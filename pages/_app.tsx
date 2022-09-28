import type { AppProps } from "next/app";
import ControlLayer from "../src/components/control-layer";
import Layout from "../src/components/layout";
import "../src/styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ControlLayer>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </ControlLayer>
  );
}

export default MyApp;
