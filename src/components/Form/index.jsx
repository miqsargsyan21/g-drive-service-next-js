import PropTypes from "prop-types";
import { useRef, useState } from "react";
import handleClick from "../../../helpers/clickFunctionality";

function Form ({ setShowLoader }) {
    const [state, setState] = useState({
        show: false,
        message: '',
    });

    const [refs] = useState({
        file: useRef(null),
        name: useRef(null),
        position: useRef(null),
    });

    return (
        <div className="relative flex flex-col gap-5">
            <input type="text" placeholder="Enter your name" className="px-5 py-2 rounded-[12px] bg-blue-400 hover:bg-blue-600 text-white placeholder-white" ref={ refs.name }/>
            <input type="text" placeholder="Enter position" className="px-5 py-2 rounded-[12px] bg-blue-400 hover:bg-blue-600 text-white placeholder-white" ref={ refs.position }/>
            <input type="file" className="px-5 py-2 rounded-[12px] bg-blue-400 cursor-pointer hover:bg-blue-600" ref={ refs.file }/>
            <button className="px-5 py-2 w-44 m-auto bg-green-400 cursor-pointer rounded-[12px] hover:bg-green-600" onClick={async () => { await handleClick(refs, setShowLoader, setState) }}>Send</button>
            {
                state.show
                &&
                <span className={`px - 5 py-2 absolute top-[110%] w-full text-center rounded-[12px] ${state.message === "Done." ? "bg-green-500" : "bg-yellow-500"}`}>{state.message}</span>
            }
        </div>
    );
}

Form.propTypes = {
    setShowLoader: PropTypes.func.isRequired,
};

export default Form;