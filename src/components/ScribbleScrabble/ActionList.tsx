// src/components/ScribbleScrabble/ActionList.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface Action {
  icon: IconDefinition;
  iconColor: string;
  label: string;
}

interface ActionListProps {
  actions: Action[];
}

export const ActionList = ({ actions }: ActionListProps) => {
  return (
    <ul className="space-y-4">
      {actions.map((action, index) => (
        <li key={index} className="flex items-center gap-3 text-gray-700">
          <span className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm">
            <FontAwesomeIcon 
              icon={action.icon} 
              className="w-5 h-5"
              style={{ color: action.iconColor }}
            />
          </span>
          <span className="font-fredoka flex-1">
            {action.label}
          </span>
        </li>
      ))}
    </ul>
  );
};