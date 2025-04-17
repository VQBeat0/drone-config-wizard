
import React from 'react';
import { Compass, Battery, Zap, Cpu } from 'lucide-react';
import { DroneModel } from '@/lib/droneData';

type DroneImageProps = {
  drone: DroneModel;
};

const DroneImage: React.FC<DroneImageProps> = ({ drone }) => {
  return (
    <div className="relative w-full h-60 bg-drone-background rounded-lg overflow-hidden flex items-center justify-center mb-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={drone.image}
          alt={drone.name}
          className="w-48 h-48 object-contain"
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent p-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-white">
          <div className="drone-feature text-white">
            <Battery className="h-4 w-4" />
            <span>До {drone.flightTime} мин полета</span>
          </div>
          <div className="drone-feature text-white">
            <Zap className="h-4 w-4" />
            <span>До {drone.maxSpeed} км/ч</span>
          </div>
          <div className="drone-feature text-white">
            <Compass className="h-4 w-4" />
            <span>До {drone.range} км дальность</span>
          </div>
          <div className="drone-feature text-white">
            <Cpu className="h-4 w-4" />
            <span>Автопилот</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneImage;
