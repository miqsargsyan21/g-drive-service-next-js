import Form from "../src/components/Form";
import Head from "next/head";

function Home () {
  return (
        <>
            <Head>
                <title>Google Drive Service</title>
            </Head>
            <div className="w-full h-screen bg-gray-200 flex items-center justify-center text-white">
                <Form />
            </div>
        </>
  );
}

export default Home;