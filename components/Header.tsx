import React from 'react';

interface HeaderProps {
    onAdminClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAdminClick }) => {
  return (
    <header className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Gemini <span className="text-indigo-400">Bild-Editor</span>
        </h1>
        <div className="flex items-center gap-4">
            <p className="text-sm text-gray-400 hidden sm:block">Unterstützt von Gemini 2.5 Flash Image</p>
            <button 
                onClick={onAdminClick}
                className="bg-gray-700 hover:bg-gray-600 text-sm text-gray-300 font-medium py-1.5 px-3 rounded-md transition-colors duration-300"
            >
                Admin
            </button>
        </div>
      </div>
    </header>
  );
};