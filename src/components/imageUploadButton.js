// https://medium.com/codex/use-a-button-to-upload-files-on-your-react-app-with-bootstrap-ef963cbe8280

import { useRef } from "react";
import { Button } from 'react-bootstrap';

export default function ImageUpload({handleFileUpload}) {
  const inputRef = useRef(null);

  const handleUploadClick = (e) => {
		e.preventDefault() ;
    inputRef.current?.click();
  };
  const handleFileUploadInternal = () => {
    inputRef.current?.files &&
      handleFileUpload(inputRef.current.files[0]);
  };
  return (
    <div className="m-3">
      <input
        ref={inputRef}
        onChange={handleFileUploadInternal}
        className="d-none"
        type="file"
      />
      <Button onClick={handleUploadClick} variant='primary'>
        Upload
      </Button>
    </div>
  );
}