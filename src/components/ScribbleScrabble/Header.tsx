// src/components/ScribbleScrabble/Header.tsx
'use client';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUndo, 
  faRedo, 
  faTrashCan, 
  faCircleInfo 
} from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onInfo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Header = ({
  onUndo,
  onRedo,
  onClear,
  onInfo,
  canUndo,
  canRedo,
}: HeaderProps) => {
  const iconClass = "w-5 h-5 text-gray-800";
  
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white border-b">
      <h1 className="text-2xl font-semibold text-gray-800 scribble-title flex items-center gap-2">
        It&apos;s Scribble Scrabble Time!
      </h1>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-2 rounded-lg transition-colors ${
            !canUndo ? 'text-gray-300' : 'hover:bg-gray-100'
          }`}
          title="Undo"
        >
          <FontAwesomeIcon icon={faUndo} className={iconClass} />
        </button>
        <button 
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-2 rounded-lg transition-colors ${
            !canRedo ? 'text-gray-300' : 'hover:bg-gray-100'
          }`}
          title="Redo"
        >
          <FontAwesomeIcon icon={faRedo} className={iconClass} />
        </button>
        <button 
          onClick={onClear}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Clear Canvas"
        >
          <FontAwesomeIcon icon={faTrashCan} className={iconClass} />
        </button>
        
        <div className="w-px h-6 bg-gray-200 mx-1"></div>
        
        <button 
          onClick={onInfo}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Help"
        >
          <FontAwesomeIcon icon={faCircleInfo} className={iconClass} />
        </button>
      </div>
    </div>
  );
};