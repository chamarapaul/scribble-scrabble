// src/components/dialogs/Drawing/SaveDialog.tsx
'use client';

import { BaseDialog } from '../Base/BaseDialog';
import Link from 'next/link';

interface SaveDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const SaveDialog = ({ open, onOpenChange }: SaveDialogProps) => {
    return (
        <BaseDialog 
            open={open} 
            onOpenChange={onOpenChange} 
            title="Drawing Saved!"
        >
            <p className="text-lg text-gray-700 font-fredoka">
                Your masterpiece has been saved to your gallery! What would you like to do next?
            </p>

            <div className="flex flex-col gap-3">
                <Link
                    href="/gallery"
                    className="flex justify-center w-full px-6 py-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors font-fredoka text-lg"
                    onClick={() => onOpenChange(false)}
                >
                    View Gallery
                </Link>

                <button
                    onClick={() => onOpenChange(false)}
                    className="w-full px-6 py-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-fredoka text-lg"
                >
                    Keep Drawing
                </button>
            </div>
        </BaseDialog>
    );
};