// src/components/ScribbleScrabble/Header.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUndo, 
  faRedo, 
  faTrashCan, 
  faSave,
  faImages,
  faBookOpen,
  faCircleInfo, 
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface HeaderProps {
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onSave: () => void;
  onColorInfo: () => void;
  onInfo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  hasContent: boolean;  // New prop
}

export const Header = ({
  onUndo,
  onRedo,
  onClear,
  onSave,
  onColorInfo,
  onInfo,
  canUndo,
  canRedo,
}: HeaderProps) => {
  const iconClass = "w-5 h-5";
  const buttonClass = "p-2 rounded-lg transition-colors";
  const activeButtonClass = "text-gray-800 hover:bg-gray-100 active:bg-gray-200";
  const disabledButtonClass = "text-gray-300 cursor-not-allowed";
  
  return (
    <div className="bg-white border-b">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Title */}
        <div className="px-4 py-2">
          <h1 className="text-2xl font-semibold text-gray-800 scribble-title text-center">
            It&apos;s Scribble Scrabble Time!
          </h1>
        </div>
        
        {/* Mobile Navigation */}
        <div className="flex items-center justify-center px-4 py-2">
          <div className="flex items-center gap-2">
            <button 
              onClick={onUndo}
              disabled={!canUndo}
              className={`${buttonClass} ${canUndo ? activeButtonClass : disabledButtonClass}`}
              title="Undo"
            >
              <FontAwesomeIcon icon={faUndo} className={iconClass} />
            </button>
            <button 
              onClick={onRedo}
              disabled={!canRedo}
              className={`${buttonClass} ${canRedo ? activeButtonClass : disabledButtonClass}`}
              title="Redo"
            >
              <FontAwesomeIcon icon={faRedo} className={iconClass} />
            </button>
            <button 
              onClick={onClear}
              className={`${buttonClass} ${activeButtonClass}`}
              title="Clear Canvas"
            >
              <FontAwesomeIcon icon={faTrashCan} className={iconClass} />
            </button>

            <div className="w-px h-5 bg-gray-200 mx-1"></div>

            <button 
              onClick={onSave}
              className={`${buttonClass} ${activeButtonClass}`}
              title="Save Drawing"
            >
              <FontAwesomeIcon icon={faSave} className={iconClass} />
            </button>
            <Link 
              href="/gallery"
              className={`${buttonClass} ${activeButtonClass}`}
              title="View Gallery"
            >
              <FontAwesomeIcon icon={faImages} className={iconClass} />
            </Link>

            <div className="w-px h-5 bg-gray-200 mx-1"></div>

            <button 
              onClick={onColorInfo}
              className={`${buttonClass} ${activeButtonClass}`}
              title="Color Stories"
            >
              <FontAwesomeIcon icon={faBookOpen} className={iconClass} />
            </button>
            <button 
              onClick={onInfo}
              className={`${buttonClass} ${activeButtonClass}`}
              title="Help"
            >
              <FontAwesomeIcon icon={faCircleInfo} className={iconClass} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between items-center px-4 py-2">
        <h1 className="text-2xl font-semibold text-gray-800 scribble-title">
          It&apos;s Scribble Scrabble Time!
        </h1>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onUndo}
            disabled={!canUndo}
            className={`${buttonClass} ${canUndo ? activeButtonClass : disabledButtonClass}`}
            title="Undo"
          >
            <FontAwesomeIcon icon={faUndo} className={iconClass} />
          </button>
          <button 
            onClick={onRedo}
            disabled={!canRedo}
            className={`${buttonClass} ${canRedo ? activeButtonClass : disabledButtonClass}`}
            title="Redo"
          >
            <FontAwesomeIcon icon={faRedo} className={iconClass} />
          </button>
          <button 
            onClick={onClear}
            className={`${buttonClass} ${activeButtonClass}`}
            title="Clear Canvas"
          >
            <FontAwesomeIcon icon={faTrashCan} className={iconClass} />
          </button>
          
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          
          <button 
            onClick={onSave}
            className={`${buttonClass} ${activeButtonClass}`}
            title="Save Drawing"
          >
            <FontAwesomeIcon icon={faSave} className={iconClass} />
          </button>
          <Link 
            href="/gallery"
            className={`${buttonClass} ${activeButtonClass}`}
            title="View Gallery"
          >
            <FontAwesomeIcon icon={faImages} className={iconClass} />
          </Link>
          
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          
          <button 
            onClick={onColorInfo}
            className={`${buttonClass} ${activeButtonClass}`}
            title="Color Stories"
          >
            <FontAwesomeIcon icon={faBookOpen} className={iconClass} />
          </button>
          <button 
            onClick={onInfo}
            className={`${buttonClass} ${activeButtonClass}`}
            title="Help"
          >
            <FontAwesomeIcon icon={faCircleInfo} className={iconClass} />
          </button>
        </div>
      </div>
    </div>
  );
};