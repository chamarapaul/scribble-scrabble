// src/components/BreadcrumbNav.tsx
'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface BreadcrumbNavProps {
  currentPage: string;
}

export const BreadcrumbNav = ({ currentPage }: BreadcrumbNavProps) => {
  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-white border-b">
      <div className="flex items-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-800"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
          <span className="font-fredoka font-medium">Back to Drawing</span>
        </Link>
        <span className="text-gray-800 font-fredoka mx-2">/</span>
        <span className="text-gray-800 font-fredoka font-semibold text-lg mx-1">{currentPage}</span>
      </div>
    </nav>
  );
};