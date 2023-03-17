// https://medium.com/codex/use-a-button-to-upload-files-on-your-react-app-with-bootstrap-ef963cbe8280

import { useRef } from "react";

export default function ImageUpload({handleFileUpload}) {
  const inputRef = useRef(null);

  const handleUpload = (e) => {
		e.preventDefault() ;
    inputRef.current?.click();
  };
  const handleDisplayFileDetails = () => {
    inputRef.current?.files &&
      handleFileUpload(inputRef.current.files[0]);
  };
  return (
    <div className="m-3">
      <input
        ref={inputRef}
        onChange={handleDisplayFileDetails}
        className="d-none"
        type="file"
      />
      <button onClick={handleUpload} className='btn btn-outline-primary'>
        Upload
      </button>
    </div>
  );
}