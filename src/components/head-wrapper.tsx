import Head from "next/head";

interface HeadWrapperProps {
  title?: string;
}
function HeadWrapper({ title }: HeadWrapperProps) {
  
  return (
    <>
      <Head>
        <title>{!title ? "Organize" : `${title} | Organize`}</title>
        <meta name="description" content="Lightweight Task Manager" />
        <meta name="theme-color" content="#2236C2"/>
        <link rel="apple-touch-icon" href="/icon192.png"/>
        <link rel="icon" href="/icon.png" />
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials"/>
        
      </Head>
    </>
  );
}

export default HeadWrapper;
