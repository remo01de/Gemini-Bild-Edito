import React, { useState } from 'react';

interface AdminPanelProps {
  prompts: string[];
  onClose: () => void;
  onSave: (newPrompts: string[]) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ prompts: initialPrompts, onClose, onSave }) => {
  const [prompts, setPrompts] = useState([...initialPrompts]);
  const [newPrompt, setNewPrompt] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  const handleAddPrompt = () => {
    if (newPrompt.trim()) {
      setPrompts([...prompts, newPrompt.trim()]);
      setNewPrompt('');
    }
  };

  const handleDeletePrompt = (index: number) => {
    setPrompts(prompts.filter((_, i) => i !== index));
  };

  const handleStartEditing = (index: number, text: string) => {
    setEditingIndex(index);
    setEditingText(text);
  };

  const handleCancelEditing = () => {
    setEditingIndex(null);
    setEditingText('');
  };

  const handleUpdatePrompt = () => {
    if (editingIndex !== null && editingText.trim()) {
      const updatedPrompts = [...prompts];
      updatedPrompts[editingIndex] = editingText.trim();
      setPrompts(updatedPrompts);
      handleCancelEditing();
    }
  };

  const handleSaveChanges = () => {
    onSave(prompts);
    onClose();
  };

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Prompt-Vorlagen bearbeiten</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </header>
        
        <main className="p-6 overflow-y-auto flex-grow">
          <div className="space-y-4">
            {prompts.map((prompt, index) => (
              <div key={index} className="bg-gray-700/50 p-3 rounded-lg flex items-center justify-between gap-2">
                {editingIndex === index ? (
                    <input 
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full bg-gray-600 border border-gray-500 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 text-white"
                    />
                ) : (
                    <p className="text-gray-300 text-sm flex-grow">{prompt}</p>
                )}
                <div className="flex-shrink-0 flex gap-2">
                    {editingIndex === index ? (
                        <>
                            <button onClick={handleUpdatePrompt} className="text-green-400 hover:text-green-300 text-xs font-bold">Speichern</button>
                            <button onClick={handleCancelEditing} className="text-gray-400 hover:text-gray-300 text-xs font-bold">Abbrechen</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => handleStartEditing(index, prompt)} className="text-indigo-400 hover:text-indigo-300 text-xs font-bold">Bearbeiten</button>
                            <button onClick={() => handleDeletePrompt(index)} className="text-red-400 hover:text-red-300 text-xs font-bold">Löschen</button>
                        </>
                    )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-2 text-white">Neue Vorlage hinzufügen</h3>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newPrompt}
                    onChange={(e) => setNewPrompt(e.target.value)}
                    placeholder="Neue Prompt-Vorlage eingeben..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 text-white"
                />
                <button onClick={handleAddPrompt} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Hinzufügen
                </button>
            </div>
          </div>
        </main>
        
        <footer className="p-4 border-t border-gray-700 flex justify-end">
            <button
              onClick={handleSaveChanges}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Speichern & Schließen
            </button>
        </footer>
      </div>
    </div>
  );
};