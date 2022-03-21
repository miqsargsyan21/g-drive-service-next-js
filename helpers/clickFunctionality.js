import handleSetState from "./stateManagement";
import { MainService } from "../src/services/frontend/MainService";

export default async function handleClick (refs, setShowLoader, setState) {
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
            Object.values(refs).map((val => {
                val.current.value = '';
            }))

            setShowLoader(false);
            handleSetState('Done.', setState);
        } else {
            setShowLoader(false);
            handleSetState('Something went wrong.', setState);
        }
    }
};