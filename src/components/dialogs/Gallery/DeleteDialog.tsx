// src/components/dialogs/Gallery/DeleteDialog.tsx
'use client';

import { BaseDialog } from '@/components/dialogs/Base/BaseDialog';

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteDialog = ({ open, onOpenChange, onConfirm }: DeleteDialogProps) => {
  return (
    <BaseDialog open={open} onOpenChange={onOpenChange} title={'Delete Drawing?'}>
      <div className="space-y-6">
        <p className="text-lg text-gray-700 font-fredoka">
          Are you sure you want to delete this drawing? This can&apos;t be undone.
        </p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full px-6 py-4 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors font-fredoka text-lg"
          >
            Delete Drawing
          </button>
          
          <button
            onClick={() => onOpenChange(false)}
            className="w-full px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-fredoka text-lg"
          >
            Keep Drawing
          </button>
        </div>
      </div>
    </BaseDialog>
  );
};