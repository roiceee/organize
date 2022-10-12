import Head from "next/head";
import { useRouter } from "next/router";

interface HeadWrapperProps {
  title?: string;
}
function HeadWrapper({ title }: HeadWrapperProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{!title ? "Organize" : `${title} | Organize`}</title>
        <meta name="description" content="Lightweight Task Manager" />
        <link rel="icon" href="/organize-icon.png" />
      </Head>
    </>
  );
}

export default HeadWrapper;
