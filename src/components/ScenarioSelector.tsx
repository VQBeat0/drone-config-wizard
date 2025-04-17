
import React from 'react';
import { Shield, Map, Search, Leaf, Building, Bell } from 'lucide-react';
import { Scenario } from '@/lib/droneData';
import { cn } from '@/lib/utils';

type ScenarioSelectorProps = {
  scenarios: Scenario[];
  selectedScenario: string | null;
  onSelectScenario: (id: string) => void;
};

const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  scenarios,
  selectedScenario,
  onSelectScenario,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="h-6 w-6 text-drone-primary" />;
      case 'map':
        return <Map className="h-6 w-6 text-drone-primary" />;
      case 'search':
        return <Search className="h-6 w-6 text-drone-primary" />;
      case 'leaf':
        return <Leaf className="h-6 w-6 text-drone-primary" />;
      case 'building':
        return <Building className="h-6 w-6 text-drone-primary" />;
      case 'alarm':
        return <Bell className="h-6 w-6 text-drone-primary" />; // Changed from Alarm to Bell
      default:
        return <Shield className="h-6 w-6 text-drone-primary" />;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {scenarios.map((scenario) => (
        <div
          key={scenario.id}
          className={cn("scenario-card", selectedScenario === scenario.id && "selected")}
          onClick={() => onSelectScenario(scenario.id)}
        >
          <div className="flex items-start gap-3 mb-2">
            <div className="p-2 rounded-md bg-drone-background">
              {getIcon(scenario.icon)}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{scenario.name}</h3>
              <p className="text-gray-600 text-sm">{scenario.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScenarioSelector;
