import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  originalImage: string | null;
}

const ImageUploaderComponent: React.FC<ImageUploaderProps> = ({ onImageUpload, originalImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-indigo-400">1. Bild hochladen</h2>
      <div 
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition-all duration-300 min-h-[200px] flex items-center justify-center ${isDragging ? 'border-indigo-500 bg-gray-700/50' : ''}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {originalImage ? (
          <img src={originalImage} alt="Original" className="max-h-64 object-contain rounded-md shadow-lg" />
        ) : (
          <div className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <p>
              <span className="font-semibold text-indigo-400">Zum Hochladen klicken</span> oder per Drag & Drop ziehen
            </p>
            <p className="text-xs">PNG, JPG, oder WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const ImageUploader = React.memo(ImageUploaderComponent);