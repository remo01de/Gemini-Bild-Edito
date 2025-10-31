import React from 'react';

interface GenerationOptionsProps {
  selectedValue: number;
  onValueChange: (value: number) => void;
}

const options = [1, 2, 3, 4];

export const GenerationOptions: React.FC<GenerationOptionsProps> = ({ selectedValue, onValueChange }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-indigo-400">3. Anzahl der Bilder</h2>
      <div className="grid grid-cols-4 gap-2 rounded-lg bg-gray-700 p-1">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onValueChange(option)}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 ${
              selectedValue === option
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-transparent text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};