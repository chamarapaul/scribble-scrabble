// src/components/Gallery/PreviewDialog.tsx
'use client';

import { BaseDialog } from '@/components/BaseDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrash, 
  faDownload, 
  faChevronLeft, 
  faChevronRight 
} from '@fortawesome/free-solid-svg-icons';
import { SavedDrawing } from './types';
import { formatFriendlyDate } from '@/lib/formatDate';

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  drawing: SavedDrawing | null;
  drawings: SavedDrawing[];
  onDelete: (id: string) => void;
  onNavigate: (drawing: SavedDrawing) => void;
}

export const PreviewDialog = ({ 
  open, 
  onOpenChange, 
  drawing, 
  drawings,
  onDelete,
  onNavigate
}: PreviewDialogProps) => {
  if (!drawing) return null;

  const currentIndex = drawings.findIndex(d => d.id === drawing.id);
  const hasNext = currentIndex < drawings.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNavigation = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < drawings.length) {
      return drawings[newIndex];
    }
    return null;
  };

  return (
    <BaseDialog 
      open={open} 
      onOpenChange={onOpenChange}
      title={''}
    >
      <div className="h-[80vh] flex flex-col">
        {/* Image Container */}
        <div className="flex-grow relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={drawing.dataUrl} 
              alt="Drawing Preview"
              className="max-w-full max-h-full object-contain mx-auto"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center p-4 border-t bg-white">
          <div className="flex items-center gap-4">
            {/* Navigation */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const prevDrawing = handleNavigation('prev');
                  if (prevDrawing) onNavigate(prevDrawing);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  hasPrev ? 'hover:bg-gray-100 text-gray-800' : 'text-gray-300'
                }`}
                disabled={!hasPrev}
                aria-label="Previous drawing"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  const nextDrawing = handleNavigation('next');
                  if (nextDrawing) onNavigate(nextDrawing);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  hasNext ? 'hover:bg-gray-100 text-gray-800' : 'text-gray-300'
                }`}
                disabled={!hasNext}
                aria-label="Next drawing"
              >
                <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
              </button>
            </div>

            {/* Timestamp */}
            <span className="text-gray-600 font-fredoka border-l pl-4">
              {formatFriendlyDate(drawing.timestamp)}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => onDelete(drawing.id)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Delete"
            >
              <FontAwesomeIcon icon={faTrash} className="w-5 h-5 text-gray-800" />
            </button>
            <a
              href={drawing.dataUrl}
              download={`scribble-${drawing.id}.png`}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Download"
            >
              <FontAwesomeIcon icon={faDownload} className="w-5 h-5 text-gray-800" />
            </a>
          </div>
        </div>
      </div>
    </BaseDialog>
  );
};