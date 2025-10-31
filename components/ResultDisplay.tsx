import React from 'react';

interface ResultDisplayProps {
  originalImage: string | null;
  editedImages: string[] | null;
  isLoading: boolean;
  originalMimeType: string | null;
  numberOfImagesToGenerate: number;
}

interface ImageBoxProps {
    src: string | null;
    title: string;
    isLoading?: boolean;
    mimeType?: string | null;
    showDownload?: boolean;
}

const ImageBox: React.FC<ImageBoxProps> = ({ src, title, isLoading = false, mimeType, showDownload = false }) => {
    const handleDownload = () => {
        if (!src) return;
        const link = document.createElement('a');
        link.href = src;
        const extension = mimeType?.split('/')[1] || 'png';
        link.download = `edited-image-${Date.now()}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full flex flex-col items-center gap-2">
            {title && <h3 className="text-md font-semibold text-gray-400">{title}</h3>}
            <div className="relative aspect-square w-full bg-gray-700/50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-600">
                {isLoading ? (
                <div className="flex flex-col items-center text-gray-400">
                    <svg className="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                ) : src ? (
                <img src={src} alt={title} className="w-full h-full object-contain" />
                ) : (
                <p className="text-gray-500 text-center p-4">Bild wird hier erscheinen</p>
                )}
                 {showDownload && src && !isLoading && (
                    <button
                        onClick={handleDownload}
                        className="absolute bottom-2 right-2 bg-gray-900/60 backdrop-blur-sm hover:bg-indigo-600 text-white p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        aria-label="Bearbeitetes Bild herunterladen"
                        title="Bearbeitetes Bild herunterladen"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, editedImages, isLoading, originalMimeType, numberOfImagesToGenerate }) => {
  if (!originalImage && !isLoading) {
    return (
      <div className="text-center text-gray-500">
        <h2 className="text-2xl font-bold mb-2">Ihr bearbeitetes Bild wartet</h2>
        <p>Laden Sie ein Bild hoch und geben Sie eine Anweisung ein, um zu beginnen.</p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <ImageBox src={originalImage} title="Original" />

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-400 text-center">Bearbeitet</h3>
          <div className="grid grid-cols-2 gap-4">
            {isLoading &&
              Array.from({ length: numberOfImagesToGenerate }).map((_, i) => (
                <ImageBox key={i} src={null} title="" isLoading={true} />
              ))}
            
            {!isLoading && editedImages &&
              editedImages.map((imageSrc, i) => (
                <ImageBox
                  key={i}
                  src={imageSrc}
                  title={`Variante ${i + 1}`}
                  mimeType={originalMimeType}
                  showDownload={true}
                />
              ))}
              
            {!isLoading && !editedImages && (
               <div className="col-span-2">
                 <ImageBox src={null} title="" />
               </div>
            )}
          </div>
        </div>
    </div>
  );
};