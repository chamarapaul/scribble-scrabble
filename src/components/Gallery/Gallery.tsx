// src/components/Gallery/Gallery.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { BreadcrumbNav } from '../BreadcrumbNav';
import { Footer } from '../Footer';
import { DeleteDialog } from '../dialogs/Gallery/DeleteDialog';
import { PreviewDialog } from '../dialogs/Gallery/PreviewDialog';
import { SavedDrawing } from '@/types/shared';
import { formatFriendlyDate } from '@/lib/formatDate';

interface DownloadError extends Error {
  name: string;
}

const Gallery = () => {
  const [drawings, setDrawings] = useState<SavedDrawing[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawingToDelete, setDrawingToDelete] = useState<SavedDrawing | null>(null);
  const [previewDrawing, setPreviewDrawing] = useState<SavedDrawing | null>(null);

  useEffect(() => {
    loadDrawings();
  }, []);

  const loadDrawings = () => {
    try {
      setLoading(true);
      const savedDrawings = localStorage.getItem('scribble-drawings');
      if (savedDrawings) {
        setDrawings(JSON.parse(savedDrawings));
      }
    } catch (error) {
      console.error('Error loading drawings:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDrawing = () => {
    if (!drawingToDelete) return;

    try {
      const updatedDrawings = drawings.filter(drawing => drawing.id !== drawingToDelete.id);
      localStorage.setItem('scribble-drawings', JSON.stringify(updatedDrawings));
      setDrawings(updatedDrawings);
      setDrawingToDelete(null);
    } catch (error) {
      console.error('Error deleting drawing:', error);
    }
  };

  const handleDownload = async (drawing: SavedDrawing, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Simple mobile detection - could be enhanced if needed
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    try {
      if (isMobile && navigator.share) {
        // Mobile experience with share sheet
        const response = await fetch(drawing.dataUrl);
        const blob = await response.blob();
        const file = new File([blob], `scribble-${drawing.id}.png`, { type: 'image/png' });
        
        try {
          await navigator.share({
            files: [file],
            title: 'Share Drawing',
            text: 'Check out my drawing from Scribble Scrabble!'
          });
        } catch (error) {
          // If share is cancelled, do nothing
          console.log('Share cancelled or failed');
        }
      } else {
        // Desktop experience - simple download
        const link = document.createElement('a');
        link.href = drawing.dataUrl;
        link.download = `scribble-${drawing.id}.png`;
        link.click();
      }
    } catch (error) {
      console.error('Error handling download:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <BreadcrumbNav currentPage="Gallery" />
        <div className="flex items-center justify-center h-[calc(100vh-57px)]">
          <div className="text-xl text-gray-700 font-fredoka">Loading your masterpieces...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BreadcrumbNav currentPage="Gallery" />

      <main className="container mx-auto px-4 py-8 flex-1">
        {drawings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-700 font-fredoka mb-4">No drawings saved yet!</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg bg-gray-800 hover:bg-gray-900 transition-colors font-fredoka"
            >
              Start Drawing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {drawings.map((drawing) => (
              <div
                key={drawing.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setPreviewDrawing(drawing)}
              >
                <div className="aspect-square relative">
                  <img
                    src={drawing.dataUrl}
                    alt={drawing.title || 'Drawing'}
                    className="w-full h-full object-contain bg-white p-2"
                  />
                </div>
                <div className="p-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-fredoka">
                      {formatFriendlyDate(drawing.timestamp)}
                    </span>
                    <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDrawingToDelete(drawing);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-5 h-5 text-gray-800" />
                      </button>
                      <button
                        onClick={(e) => handleDownload(drawing, e)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Download"
                      >
                        <FontAwesomeIcon icon={faDownload} className="w-5 h-5 text-gray-800" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <DeleteDialog
        open={!!drawingToDelete}
        onOpenChange={() => setDrawingToDelete(null)}
        onConfirm={deleteDrawing}
      />

      <PreviewDialog
        open={!!previewDrawing}
        onOpenChange={(open: boolean) => !open && setPreviewDrawing(null)}
        drawing={previewDrawing}
        drawings={drawings}
        onDelete={(id: string) => {
          setPreviewDrawing(null);
          setDrawingToDelete(drawings.find(d => d.id === id) || null);
        }}
        onNavigate={setPreviewDrawing}
        onDownload={handleDownload}
      />

      <Footer />
    </div>
  );
};

export default Gallery;