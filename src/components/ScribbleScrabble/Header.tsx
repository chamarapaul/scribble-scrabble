// src/components/ScribbleScrabble/Header.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUndo, 
  faRedo, 
  faTrashCan, 
  faSave,
  faImages,
  faBook,
  faCircleInfo, 
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface HeaderProps {
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onSave: () => void;
  onColorInfo: () => void;
  onInfo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  hasContent: boolean;
}

interface ActionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  title: string;
  icon: typeof faUndo;
  isLink?: boolean;
  href?: string;
}

const ActionButton = ({ onClick, disabled, title, icon, isLink, href }: ActionButtonProps) => {
  const iconClass = "w-5 h-5";
  const buttonClass = "p-2 rounded-lg transition-colors no-select";
  const activeButtonClass = "text-gray-800 hover:bg-gray-100 active:bg-gray-200";
  const disabledButtonClass = "text-gray-300 cursor-not-allowed";
  const className = `${buttonClass} ${disabled ? disabledButtonClass : activeButtonClass}`;

  if (isLink && href) {
    return (
      <Link href={href} className={className} title={title}>
        <FontAwesomeIcon icon={icon} className={iconClass} />
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={className}
      title={title}
    >
      <FontAwesomeIcon icon={icon} className={iconClass} />
    </button>
  );
};

const Divider = () => (
  <div className="w-px h-5 md:h-6 bg-gray-200 mx-1" />
);

const ActionGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    {children}
  </div>
);

export const Header = ({
  onUndo,
  onRedo,
  onClear,
  onSave,
  onColorInfo,
  onInfo,
  canUndo,
  canRedo,
}: HeaderProps) => {
  const actions = [
    { onClick: onUndo, disabled: !canUndo, title: "Undo", icon: faUndo },
    { onClick: onRedo, disabled: !canRedo, title: "Redo", icon: faRedo },
    { onClick: onClear, title: "Clear Canvas", icon: faTrashCan },
    null, // Divider
    { onClick: onSave, title: "Save Drawing", icon: faSave },
    { isLink: true, href: "/gallery", title: "View Gallery", icon: faImages },
    null, // Divider
    { onClick: onColorInfo, title: "Color Stories", icon: faBook },
    { onClick: onInfo, title: "Help", icon: faCircleInfo },
  ];

  const renderActions = () => (
    <ActionGroup>
      {actions.map((action, index) => 
        action === null ? (
          <Divider key={`divider-${index}`} />
        ) : (
          <ActionButton key={action.title} {...action} />
        )
      )}
    </ActionGroup>
  );
  
  return (
    <div className="bg-white border-b drawing-ui no-select">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="px-4 py-2">
          <h1 className="text-2xl font-semibold text-gray-800 scribble-title text-center">
            It&apos;s Scribble Scrabble Time!
          </h1>
        </div>
        <div className="flex items-center justify-center px-4 py-2">
          {renderActions()}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between items-center px-4 py-2">
        <h1 className="text-2xl font-semibold text-gray-800 scribble-title">
          It&apos;s Scribble Scrabble Time!
        </h1>
        {renderActions()}
      </div>
    </div>
  );
};