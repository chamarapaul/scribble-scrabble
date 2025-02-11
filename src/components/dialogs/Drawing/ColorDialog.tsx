// src/components/dialogs/Drawing/ColorDialog.tsx
'use client';

import { BaseDialog } from '../Base/BaseDialog';
import { COLOR_STORIES, RAINBOW_STORY } from '@/constants/colors';

interface ColorDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onColorSelect: (color: string) => void;
    onRainbowToggle?: () => void;
    rainbowMode?: boolean;
}

export const ColorDialog = ({ open, onOpenChange, onColorSelect, onRainbowToggle, rainbowMode }: ColorDialogProps) => {
    return (
        <BaseDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Color Stories"
        >
            <div className="overflow-y-auto max-h-[60vh]">
                <div className="space-y-4">
                    {COLOR_STORIES.map((colorStory) => (
                        <div
                            key={colorStory.name}
                            className="flex items-start gap-4 p-2 rounded-lg transition-colors"
                        >
                            {/* Color Sample */}
                            <button
                                onClick={() => {
                                    onColorSelect(colorStory.color);
                                    onOpenChange(false);
                                }}
                                className="flex-none w-10 h-10 rounded-full transition-transform hover:scale-110"
                                style={{
                                    backgroundColor: colorStory.color,
                                    border: '2px solid white',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                                title={`Use ${colorStory.name}`}
                            />

                            {/* Color Info */}
                            <div className="flex-grow">
                                <h3 className="font-fredoka text-lg text-gray-800 mb-1">
                                    {colorStory.name}
                                </h3>
                                <p className="font-fredoka text-gray-700 mb-2">
                                    {colorStory.story}
                                </p>

                                {/* Color Pairings */}
                                <div className="flex items-center gap-2">
                                    <span className="font-fredoka text-sm text-gray-500">Perfect with:</span>
                                    <div className="flex gap-1">
                                        {colorStory.pairsWith.map((pairName) => {
                                            const pairStory = COLOR_STORIES.find(s => s.name === pairName);
                                            if (!pairStory) return null;

                                            return (
                                                <button
                                                    key={pairName}
                                                    onClick={() => {
                                                        onColorSelect(pairStory.color);
                                                        onOpenChange(false);
                                                    }}
                                                    className="w-6 h-6 rounded-full transition-transform hover:scale-110"
                                                    style={{
                                                        backgroundColor: pairStory.color,
                                                        border: '2px solid white',
                                                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                                    }}
                                                    title={`Use ${pairName}`}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Rainbow Mode Special Feature */}
                    <div className="flex items-start gap-4 md:p-4 p-2 rounded-lg transition-colors">
                        <button
                            onClick={() => {
                                onRainbowToggle?.();
                                onOpenChange(false);
                            }}
                            className="flex-none w-10 h-10 rounded-full transition-transform hover:scale-110"
                            style={{
                                background: RAINBOW_STORY.color,
                                border: '2px solid white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                            title={rainbowMode ? 'Disable Rainbow Mode' : 'Enable Rainbow Mode'}
                        />

                        <div className="flex-grow">
                            <h3 className="font-fredoka text-lg text-gray-800 mb-1">
                                {RAINBOW_STORY.name}
                            </h3>
                            <p className="font-fredoka text-gray-700">
                                {RAINBOW_STORY.story}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </BaseDialog>
    );
};