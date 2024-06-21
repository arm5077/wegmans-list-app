import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone'

import SubmitBar from '@/components/common/SubmitBar';

import useSubmit from '@/utils/hooks/useSubmit';

import classes from './styles.module.scss';
import { isErrored } from 'stream';

interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    files: FileList;
  };
}

interface ImageInputProps {
  active: boolean
}

const ImageInput: React.FC<ImageInputProps> = (props) => {
  const { 
    active
  } = props;

  const [file, setFile] = useState('');
  const [fileToSubmit, setFileToSubmit] = useState('');
  const [filename, setFilename] = useState('');
  const { data, isLoading, error, setError  } = useSubmit({
    type: 'image', 
    input: fileToSubmit,
  });

  const onDrop = useCallback((files: File[]) => {
    const file = files[0];
    if (file) {
      setFilename(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String: string = reader.result?.toString() || '';
        setFile(base64String);
        console.log(base64String);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const submitAction = () => {
    setFileToSubmit(file);
   }
 

  if (!active) {
    return '';
  }

  if (file) {
    return (
      <div className={classes.root}>
        <img src={file} />
        <p>{filename}</p>

        <SubmitBar 
          show={true}
          clearAction={() => { setFile('')}}
          submitAction={submitAction}
          isLoading={isLoading}
          isError={!!error}
        />
      </div>
    )
  }

  return (
    <div 
      className={classes.root}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {
        isDragActive ? (
          <p>Yep, gimme that grocery list!</p>
        ) : (
          <div>
          <svg width="122" height="85" viewBox="0 0 122 85" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.5995 84.2389C12.569 84.2389 0.374512 72.1451 0.374512 57.2389C0.374512 45.4639 7.97482 35.4514 18.5623 31.7576C18.5434 31.2514 18.5245 30.7451 18.5245 30.2389C18.5245 13.6639 32.0614 0.238892 48.7745 0.238892C59.9859 0.238892 69.7605 6.27639 74.9975 15.2764C77.8712 13.3639 81.35 12.2389 85.0745 12.2389C95.0948 12.2389 103.225 20.3014 103.225 30.2389C103.225 32.5264 102.79 34.7014 102.015 36.7264C113.056 38.9389 121.375 48.6326 121.375 60.2389C121.375 73.4951 110.541 84.2389 97.1745 84.2389H27.5995ZM42.5354 43.5514C40.7583 45.3139 40.7583 48.1639 42.5354 49.9076C44.3126 51.6514 47.1864 51.6701 48.9447 49.9076L56.3181 42.5951V67.7389C56.3181 70.2326 58.3411 72.2389 60.8556 72.2389C63.3701 72.2389 65.3931 70.2326 65.3931 67.7389V42.5951L72.7665 49.9076C74.5437 51.6701 77.4175 51.6701 79.1758 49.9076C80.934 48.1451 80.9529 45.2951 79.1758 43.5514L64.0508 28.5514C62.2736 26.7889 59.3998 26.7889 57.6415 28.5514L42.5165 43.5514H42.5354Z" fill="#3A40D9" fillOpacity="0.29"/>
          </svg>
          <p>Click or drag file<br/>to upload</p>
        </div>
        )
          
      }
    </div>
  );
};

{/* <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept=".jpeg, .jpg, .png"
          onChange={handleImageUpload}
        />
        <button type="submit">Submit</button>
      </form> */}

      // const handleSubmit = async (event: React.FormEvent) => {
      //   event.preventDefault();
        
      //   console.log(file);
    
      //   if (file) {
      //     const response = await fetch('/api/process-image', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify({
      //         base64Image: file
      //       })
      //     });
    
      //     const result = await response.json();
      //     console.log(result);
      //   }
      // }



export default ImageInput;