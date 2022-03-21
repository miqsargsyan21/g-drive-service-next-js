import handleSetState from "./stateManagement";
import { MainService } from "../src/services/frontend/MainService";

export default async function handleClick (refs, setShowLoader, setState) {
    const name = refs.name?.current.value,
          file = refs.file?.current.files[0],
          position = refs.position?.current.value;

    if ( !(name && file && position) ) {
        handleSetState("Please enter all data.", setState);
    } else if (refs.file) {
        setShowLoader(true);
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('position', position);

        const googleDriveService = MainService.getInstance().getDrive();
        const uploadFileResponse = await googleDriveService.uploadFile(formData);

        if (uploadFileResponse.ok) {
            Object.values(refs).map((val => {
                val.current.value = '';
            }));

            setShowLoader(false);
            handleSetState('Done.', setState);
        } else {
            setShowLoader(false);
            handleSetState('Something went wrong.', setState);
        }
    }
};