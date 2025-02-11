// src/components/dialogs/Drawing/InfoDialog.tsx
'use client';

import { BaseDialog } from '../Base/BaseDialog';
import { InstallInstructions } from './InstallInstructions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPalette,
  faPencil,
  faRotate,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

interface InfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const actions = [
  {
    icon: faPalette,
    label: 'Pick from the color palette, or try rainbow mode for extra fun!',
    // Muted bubble gum
    color: 'rgb(233, 30, 99, 0.8)'
  },
  {
    icon: faPencil,
    label: 'Start scribble scrabbling away!',
    // Muted mermaid tail
    color: 'rgb(0, 150, 136, 0.8)'
  },
  {
    icon: faRotate,
    label: 'Made a mistake? No worries! Use undo/redo to fix it.',
    // Muted magic purple
    color: 'rgb(156, 39, 176, 0.8)'
  },
  {
    icon: faTrashCan,
    label: 'Want to start fresh? Clear the canvas anytime.',
    color: 'rgb(75, 85, 99, 0.9)' // Softer gray
  }
];

export const InfoDialog = ({ open, onOpenChange }: InfoDialogProps) => {
  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title="How to Play"
    >
      <div className="overflow-y-auto max-h-[60vh]">
        <p className="text-lg text-gray-700 font-fredoka mb-6">
          Let your creativity flow! It&apos;s Scribble Scrabble Time is all about having fun and expressing yourself through drawing.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          {actions.map((action, index) => (
            <div key={index} className="flex items-center gap-3 mb-4 last:mb-0">
              <span className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm">
                <FontAwesomeIcon 
                  icon={action.icon} 
                  className="w-5 h-5"
                  style={{ color: action.color }}
                />
              </span>
              <span className="font-fredoka flex-1 text-gray-700">
                {action.label}
              </span>
            </div>
          ))}
        </div>

        <InstallInstructions />
      </div>
    </BaseDialog>
  );
};