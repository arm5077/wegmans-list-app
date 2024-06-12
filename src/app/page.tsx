'use client'
import { useState } from 'react';
import styles from "./page.module.css";

export default function Home() {
  const [file, setFile] = useState('');
  
  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & {
      files: FileList;
    };
  }

  const handleImageUpload = async (event: FileChangeEvent) => {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String: string = reader.result?.toString()?.replace(/^data:image\/[a-z]+;base64,/, '') || '';
        setFile(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {

    console.log('hihihihihi')
    event.preventDefault();
    
    console.log(file);

    if (file) {
      const response = await fetch('/api/process-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          base64Image: file
        })
      });

      const result = await response.json();
      console.log(result);
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept=".jpeg, .jpg, .png"
          onChange={handleImageUpload}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
