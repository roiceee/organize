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
        <link rel="icon" href="/organize-icon.png" />
        <link rel="manifest" href="/webmanifest.json" crossOrigin="use-credentials"/>
      </Head>
    </>
  );
}

export default HeadWrapper;
