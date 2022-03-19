import Loader from "../src/components/Loader";
import Form from "../src/components/Form";
import { useState } from "react";

function Home () {
    const [showLoader, setShowLoader] = useState(false);

  return (
        <div className="w-full h-screen bg-gray-200 flex items-center justify-center text-white">
            <Form setShowLoader={ setShowLoader } />
            <Loader showLoader={ showLoader } />
        </div>
  );
}

export default Home;