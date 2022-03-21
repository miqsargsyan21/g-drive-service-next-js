import React from "react";
import { useRef, useState } from "react";
import Button from "../Button";

function Form () {
    const [state, setState] = useState({
        show: false,
        message: '',
    });

    const refs = {
        file: useRef(null),
        name: useRef(null),
        position: useRef(null),
    };

    return (
        <div className="relative flex flex-col gap-1">
            <div className="relative z-0 mb-6 w-full group">
                <input type="text" name="floating_name" id="floating_name" className="rounded-lg pl-3 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required ref={ refs.name } />
                <label htmlFor="floating_name" className="absolute text-sm pl-3 text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
                <input type="text" name="floating_position" id="floating_position" className="rounded-lg pl-3 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required ref={ refs.position } />
                <label htmlFor="floating_position" className="absolute pl-3 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Position</label>
            </div>
            <div className="relative z-0 mb-6 w-full cursor-pointer">
                <label htmlFor="formFile" className="cursor-pointer form-label inline-block pl-3 mb-2 text-gray-500">Upload file</label>
                <input className="form-control cursor-pointer block w-full px-3 py-1.5 text-base font-normal text-gray-500 bg-clip-padding border-0 border-b-2 border-solid border-gray-300 rounded-lg transition ease-in-out focus:border-blue-600 focus:outline-none" type="file" id="formFile" ref={ refs.file } />
            </div>
            <Button setState={setState} refs={refs} />
            {
                state.show
                &&
                <span className={`px - 5 py-2 absolute top-[110%] w-full text-center rounded-[12px] ${state.message === "Done." ? "bg-green-500" : "bg-yellow-500"}`}>{state.message}</span>
            }
        </div>
    );
}

export default React.memo(Form);