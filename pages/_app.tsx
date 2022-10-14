import type { AppProps } from "next/app";
import ControlLayer from "../src/components/control-layer";
import Head from "next/head";
import Layout from "../src/components/layout";
import "../src/styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  <Head>
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
    />
    <meta name="description" content="Lightweight Task Manager" />
    <meta name="theme-color" content="#2236C2" />
    <link rel="apple-touch-icon" href="/icon192.png" />
    <link rel="icon" href="/icon.png" />
    <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
  </Head>;

  return (
    <ControlLayer>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ControlLayer>
  );
}

export default MyApp;
