import { MainService } from "../src/services/frontend/MainService";
import {useRef} from "react";

function Home () {
  const file = useRef(null)

  const handleClick = () => {
      if (file) {
          const googleDriveService = MainService.getInstance().getDriveService();

          let mainFile = file.current.files[0];
          console.log(mainFile);

          googleDriveService.uploadFile({
              fileName: mainFile.name,
              fileType: mainFile.type,
              file: mainFile,
          });
      }
  }

  return (
    <div className="w-full h-screen bg-blue-200 flex items-center justify-center text-white">
        <input type="file" className="px-5 py-2 rounded-[12px] mr-5 bg-blue-400 cursor-pointer hover:bg-blue-600" ref={ file }/>
        <button className="px-5 py-2 bg-green-400 cursor-pointer rounded-[12px] hover:bg-green-600" onClick={ handleClick }>Send</button>
    </div>
  )
}

export default Home;