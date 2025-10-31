import React, { useState, useCallback, useEffect } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { PromptEditor } from './components/PromptEditor';
import { ResultDisplay } from './components/ResultDisplay';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { editImageWithGemini } from './services/geminiService';
import { UploadedFile, HistoryItem } from './types';
import { GenerationOptions } from './components/GenerationOptions';
import { Alert } from './components/Alert';
import { Gallery } from './components/Gallery';
import { AdminPanel } from './components/AdminPanel';
import { getPrompts, savePrompts } from './services/storageService';
import { INITIAL_PROMPTS } from './constants';

const App: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<UploadedFile | null>(null);
  const [editedImages, setEditedImages] = useState<string[] | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [numberOfImages, setNumberOfImages] = useState<number>(1);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [predefinedPrompts, setPredefinedPrompts] = useState<string[]>([]);

  useEffect(() => {
    const storedPrompts = getPrompts();
    if (storedPrompts.length > 0) {
      setPredefinedPrompts(storedPrompts);
    } else {
      setPredefinedPrompts(INITIAL_PROMPTS);
      savePrompts(INITIAL_PROMPTS);
    }
  }, []);

  const handleUpdatePrompts = (newPrompts: string[]) => {
    setPredefinedPrompts(newPrompts);
    savePrompts(newPrompts);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalFile({
        base64: reader.result as string,
        mimeType: file.type,
      });
      setEditedImages(null); // Clear previous results
    };
    reader.onerror = () => {
        setError('Fehler beim Lesen der Bilddatei.');
    }
    reader.readAsDataURL(file);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalFile || !prompt) {
      setError('Bitte laden Sie ein Bild hoch und geben Sie eine Anweisung ein.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setEditedImages(null);

    try {
      const base64Data = originalFile.base64.split(',')[1];
      const generationPromises = Array(numberOfImages).fill(null).map(() => 
        editImageWithGemini(prompt, base64Data, originalFile.mimeType)
      );
      
      const results = await Promise.all(generationPromises);
      const newImages = results.map(newImageBase64 => `data:${originalFile.mimeType};base64,${newImageBase64}`);
      setEditedImages(newImages);

      const newHistoryItem: HistoryItem = {
        id: new Date().toISOString(),
        originalFile: originalFile,
        editedImages: newImages,
        prompt: prompt,
      };
      setHistory(prev => [newHistoryItem, ...prev]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [originalFile, prompt, numberOfImages]);

  const handleRestoreHistory = useCallback((item: HistoryItem) => {
    setOriginalFile(item.originalFile);
    setEditedImages(item.editedImages);
    setPrompt(item.prompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header onAdminClick={() => setIsAdminOpen(true)} />
      <main className="container mx-auto p-4 md:p-8 flex flex-col gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Column */}
          <div className="flex flex-col gap-6 bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg">
            <ImageUploader onImageUpload={handleImageUpload} originalImage={originalFile?.base64 ?? null} />
            <PromptEditor prompt={prompt} setPrompt={setPrompt} predefinedPrompts={predefinedPrompts} />
            <GenerationOptions selectedValue={numberOfImages} onValueChange={setNumberOfImages} />
            <button
              onClick={handleGenerateClick}
              disabled={isLoading || !originalFile || !prompt}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {isLoading ? (
                <>
                  <Loader />
                  Generiere...
                </>
              ) : (
                'Bild generieren'
              )}
            </button>
            {error && <Alert message={error} onClose={() => setError(null)} />}
          </div>

          {/* Output Column */}
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg min-h-[300px] flex items-center justify-center">
            <ResultDisplay 
              originalImage={originalFile?.base64 ?? null} 
              editedImages={editedImages} 
              isLoading={isLoading} 
              originalMimeType={originalFile?.mimeType ?? null}
              numberOfImagesToGenerate={numberOfImages}
            />
          </div>
        </div>

        <Gallery history={history} onRestore={handleRestoreHistory} />
      </main>
      {isAdminOpen && (
        <AdminPanel 
            prompts={predefinedPrompts}
            onClose={() => setIsAdminOpen(false)}
            onSave={handleUpdatePrompts}
        />
      )}
    </div>
  );
};

export default App;