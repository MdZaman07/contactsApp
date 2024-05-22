"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
interface SelectImageProps {
  //   item?: ImageType;
  handleFileChange: (value: File) => void;
}

const SelectImage = ({ handleFileChange }: SelectImageProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png"] },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-slate-600 p-2 border-dashed cursor-pointer text-sm font-notmal text-slate-600 flex items-center justify-center pl-10 pr-10 pb-10 pt-10"
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the image here...</p> : <p>+ Upload Image</p>}
    </div>
  );
};

export default SelectImage;
