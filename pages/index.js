import { useRef, useState } from "react";

function Home () {
  const [state, setState] = useState({
      show: false,
      message: '',
  });

  const file = useRef(null);
  const name = useRef(null);

  const handleClick = async () => {
      if ( !(name?.current.value.length && file.current.files.length) ) {
          setState({
              show: true,
              message: 'Please enter all data'
          });

          setTimeout(() => {
              setState({
                  show: false,
                  message: '',
              });
          }, 1000);
      } else if (file) {
          let mainFile = file.current.files[0];

          const formData = new FormData();
          formData.append('file', mainFile, `${mainFile.name}`);
          formData.append('name', name.current.value);

          const uploadFileResponse = await fetch('api/upload-file', {
              headers: {
                  'Accept': '*/*',
              },
              method: 'POST',
              body: formData
          });

          console.log(uploadFileResponse);
          if (uploadFileResponse.ok) {
              setState({
                  show: true,
                  message: 'Everything is ok'
              })

              setTimeout(() => {
                  setState({
                      show: false,
                      message: '',
                  });
              }, 1000);
          }
      }
  }

  return (
    <div className="w-full h-screen bg-blue-200 flex flex-col gap-5 items-center justify-center text-white">
        <input type="text" placeholder="Enter your name" className="px-5 py-2 rounded-[12px] bg-blue-400 hover:bg-blue-600 text-white placeholder-white" ref={name}/>
        <input type="file" className="px-5 py-2 rounded-[12px] bg-blue-400 cursor-pointer hover:bg-blue-600" ref={ file }/>
        <button className="px-5 py-2 bg-green-400 cursor-pointer rounded-[12px] hover:bg-green-600" onClick={ handleClick }>Send</button>
        {
            state.show
            &&
            <span className="px-5 py-2 bg-yellow-500 rounded-[12px]">{state.message}</span>
        }
    </div>
  )
}

export default Home;