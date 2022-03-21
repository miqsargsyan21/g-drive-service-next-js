import Loader from "../src/components/Loader";
import Form from "../src/components/Form";
import { useState } from "react";
import Head from "next/head";

function Home () {
    const [showLoader, setShowLoader] = useState(false);

  return (
        <>
            <Head>
                <title>Google Drive Service</title>
            </Head>
            <div className="w-full h-screen bg-gray-200 flex items-center justify-center text-white">
                <Form setShowLoader={ setShowLoader } />
                <Loader showLoader={ showLoader } />
            </div>
        </>
  );
}

export default Home;