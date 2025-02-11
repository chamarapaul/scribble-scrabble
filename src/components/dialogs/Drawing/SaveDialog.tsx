// src/components/dialogs/Drawing/SaveDialog.tsx
'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface SaveDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const SaveDialog = ({ open, onOpenChange }: SaveDialogProps) => {
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
                        Drawing Saved!
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
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
                </div>
            </DialogContent>
        </Dialog>
    );
};