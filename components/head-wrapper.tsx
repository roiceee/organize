import Head from "next/head";

interface HeadWrapperProps {
  title: string;
}
function HeadWrapper({ title }: HeadWrapperProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Lightweight To Do list" />
        <link rel="icon" href="/organize-icon.png" />
      </Head>
    </>
  );
}

export default HeadWrapper;
