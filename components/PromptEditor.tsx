import React from 'react';

interface PromptEditorProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  predefinedPrompts: string[];
}

export const PromptEditor: React.FC<PromptEditorProps> = ({ prompt, setPrompt, predefinedPrompts }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold mb-2 text-indigo-400">2. Bearbeitung beschreiben</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="z.B. 'Füge einen Retro-Filter hinzu' oder 'Mache den Hintergrund zu einer futuristischen Stadt'"
          className="w-full h-28 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 resize-none"
        />
      </div>
      <div>
        <h3 className="text-md font-semibold mb-2 text-gray-300">Oder versuchen Sie ein Beispiel:</h3>
        <div className="flex flex-wrap gap-2">
          {predefinedPrompts.map((p, index) => (
            <button
              key={index}
              onClick={() => setPrompt(p)}
              className="bg-gray-700 hover:bg-gray-600 text-sm text-gray-300 font-medium py-1.5 px-3 rounded-full transition-colors duration-300"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};