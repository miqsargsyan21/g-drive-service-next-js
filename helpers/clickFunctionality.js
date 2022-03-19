import PropTypes from "prop-types";
import handleSetState from "./stateManagement";
import { MainService } from "../src/services/frontend/MainService";

async function handleClick (refs, setShowLoader, setState) {
    if ( !(refs.name?.current.value.length && refs.file?.current.files.length && refs.position?.current.value.length) ) {
        handleSetState("Please enter all data.", setState);
    } else if (refs.file) {
        setShowLoader(true);
        
        const formData = new FormData();
        formData.append('file', refs.file.current.files[0]);
        formData.append('name', refs.name.current.value);
        formData.append('position', refs.position.current.value);

        const googleDriveService = MainService.getInstance().getDrive();
        const uploadFileResponse = await googleDriveService.uploadFile(formData);

        if (uploadFileResponse.ok) {
            refs.name.current.value = '';
            refs.position.current.value = '';
            refs.file.current.value = '';
            setShowLoader(false);
            handleSetState('Done.', setState);
        } else {
            setShowLoader(false);
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