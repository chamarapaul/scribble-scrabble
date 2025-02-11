// src/components/dialogs/Drawing/InfoDialog.tsx
'use client';

import { BaseDialog } from '../Base/BaseDialog';
import { ActionList } from './ActionList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPalette,
  faPencil,
  faRotateLeft,
  faTrashCan,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import { COLOR_MAP } from '@/constants/colors';

interface InfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InfoDialog = ({ open, onOpenChange }: InfoDialogProps) => {
  const actions = [
    {
      icon: faPalette,
      iconColor: COLOR_MAP.berryPink,
      label: 'Pick from the color palette, or try rainbow mode for extra fun!'
    },
    {
      icon: faPencil,
      iconColor: COLOR_MAP.grassGreen,
      label: 'Start scribble scrabbling away!'
    },
    {
      icon: faRotateLeft,
      iconColor: COLOR_MAP.skyBlue,
      label: 'Made a mistake? No worries! Use undo/redo to fix it.'
    },
    {
      icon: faTrashCan,
      iconColor: COLOR_MAP.magicPurple,
      label: 'Want to start fresh? Clear the canvas anytime.'
    }
  ];

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title="How to Play: It's Scribble Scrabble Time!"
    >
      <p className="text-lg text-gray-700 font-fredoka">
        Let your creativity flow! Scribble Scrabble is all about having fun and expressing yourself through drawing.
      </p>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <ActionList actions={actions} />
      </div>

      <p className="text-gray-600 text-sm text-center mx-14 font-fredoka">
        Created with<FontAwesomeIcon icon={faHeart} className="mx-1" style={{ color: COLOR_MAP.bubbleGum }}/> 
        for all the kids (and kids at heart) who love to create, doodle, and express their creativity.
      </p>
    </BaseDialog>
  );
};