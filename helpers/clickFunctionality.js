import PropTypes from "prop-types";
import handleSetState from "./stateManagement";

async function handleClick (refs, setShowLoader, setState) {
        if ( !(refs.name?.current.value.length && refs.file?.current.files.length && refs.position?.current.value.length) ) {
            handleSetState("Please enter all data.", setState);
        } else if (refs.file) {
            setShowLoader(true);
            let mainFile = refs.file.current.files[0];

            const formData = new FormData();
            formData.append('file', mainFile, `${mainFile.name}`);
            formData.append('name', refs.name.current.value);
            formData.append('position', refs.position.current.value);

            const uploadFileResponse = await fetch('api/upload-file', {
                headers: {
                    'Accept': '*/*',
                },
                method: 'POST',
                body: formData
            });

            if (uploadFileResponse.ok) {
                setShowLoader(false);
                handleSetState('Done.', setState);
            } else {
                handleSetState('Something went wrong.', setState);
            }
        }
}

handleClick.propTypes = {
    refs: PropTypes.object.isRequired,
    setState: PropTypes.func.isRequired,
    setShowLoader: PropTypes.func.isRequired,
}

export default handleClick;