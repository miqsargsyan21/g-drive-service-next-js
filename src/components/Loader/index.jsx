import Image from "next/image";
import PropTypes from "prop-types";

function Loader ({ showLoader }) {
    if ( !showLoader ) return null;
    return (
        <div className="absolute top-0 left-0 w-full h-screen bg-black/[0.7] flex flex-col items-center justify-center gap-5">
            <div className="relative w-[300px] h-[300px]">
                <Image src="/images/loader3.gif" alt="Loader" layout="fill" objectFit="responsive" />
            </div>
            <span>Please wait a minute...</span>
        </div>
    );
}

Loader.propTypes = {
    showLoader: PropTypes.bool.isRequired,
}

export default Loader;