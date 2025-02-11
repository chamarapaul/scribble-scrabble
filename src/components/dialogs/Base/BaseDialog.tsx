// src/components/dialogs/Base/BaseDialog.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface BaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export const BaseDialog = ({ 
  open, 
  onOpenChange, 
  title,
  children 
}: BaseDialogProps) => {
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
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};