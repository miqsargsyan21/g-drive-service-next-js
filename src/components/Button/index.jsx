import React, { useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import handleClick from "../../../helpers/clickFunctionality";

function Button ({ refs, setState }) {
    const [showLoader, setShowLoader] = useState(false);

    return (
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={async () => { await handleClick(refs, setShowLoader, setState) }}>
            {
                !showLoader
                    ?
                    <span>Send</span>
                    :
                    <div className="relative w-[20px] h-[20px] m-auto">
                        <Image src="/images/loader3.gif" alt="Loader" layout="fill" objectFit="responsive" />
                    </div>
            }
        </button>
    );
}

Button.propTypes = {
    refs: PropTypes.object.isRequired,
    setState: PropTypes.func.isRequired,
};

export default React.memo(Button);