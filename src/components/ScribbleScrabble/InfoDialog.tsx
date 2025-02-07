// src/components/ScribbleScrabble/InfoDialog.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPalette, 
  faPencil, 
  faRotateLeft, 
  faTrashCan,
  faXmark, 
  faHeart 
} from '@fortawesome/free-solid-svg-icons';
import { COLOR_MAP } from './constants';

interface InfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InfoDialog = ({ open, onOpenChange }: InfoDialogProps) => {
  const iconColors = {
    palette: COLOR_MAP.berryPink,
    pencil: COLOR_MAP.grassGreen,
    rotate: COLOR_MAP.skyBlue,
    trash: COLOR_MAP.magicPurple,
    heart: COLOR_MAP.bubbleGum
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white [&>button]:hidden">
        <div className="absolute right-4 top-4">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="text-gray-800 w-5 h-5" />
          </button>
        </div>
        
        <DialogHeader>
          <DialogTitle className="text-3xl font-fredoka text-gray-800">
            How to Play: It&apos;s Scribble Scrabble Time!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-lg text-gray-700 font-fredoka">
            Let your creativity flow! Scribble Scrabble is all about having fun and expressing yourself through drawing.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm">
                  <FontAwesomeIcon 
                    icon={faPalette} 
                    className="w-5 h-5"
                    style={{ color: iconColors.palette }} 
                  />
                </span>
                <span className="font-fredoka flex-1">
                  Pick from the color palette, or try rainbow mode for extra fun!
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm">
                  <FontAwesomeIcon 
                    icon={faPencil} 
                    className="w-5 h-5"
                    style={{ color: iconColors.pencil }} 
                  />
                </span>
                <span className="font-fredoka flex-1">
                  Start scribble scrabbling away!
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm">
                  <FontAwesomeIcon 
                    icon={faRotateLeft} 
                    className="w-5 h-5"
                    style={{ color: iconColors.rotate }} 
                  />
                </span>
                <span className="font-fredoka flex-1">
                  Made a mistake? No worries! Use undo/redo to fix it.
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm">
                  <FontAwesomeIcon 
                    icon={faTrashCan} 
                    className="w-5 h-5"
                    style={{ color: iconColors.trash }} 
                  />
                </span>
                <span className="font-fredoka flex-1">
                  Want to start fresh? Clear the canvas anytime.
                </span>
              </li>
            </ul>
          </div>

          <p className="text-gray-600 italic text-center font-fredoka">
            Created with <FontAwesomeIcon icon={faHeart} className="mx-1" style={{ color: iconColors.heart }}/>for all the kids (and kids at heart) who love to create, doodle, and express their creativity freely. Have fun!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
