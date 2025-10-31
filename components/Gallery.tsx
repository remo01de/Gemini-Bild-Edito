import React from 'react';
import { HistoryItem } from '../types';

interface GalleryProps {
  history: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ history, onRestore }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="border-b border-gray-700 mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight pb-2">
            Ihre Kreationen
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-lg"
            onClick={() => onRestore(item)}
            title={`Anweisung: ${item.prompt}`}
          >
            <img
              src={item.editedImages[0]}
              alt={item.prompt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute bottom-0 left-0 p-3">
                  <p className="text-white text-xs font-semibold line-clamp-2">
                    {item.prompt}
                  </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};