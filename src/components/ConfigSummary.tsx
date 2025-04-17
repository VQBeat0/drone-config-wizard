
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DroneConfiguration, droneModels, payloads, batteries, additionalEquipment, scenarios } from '@/lib/droneData';
import DroneImage from './DroneImage';

type ConfigSummaryProps = {
  configuration: Partial<DroneConfiguration>;
};

const ConfigSummary: React.FC<ConfigSummaryProps> = ({ configuration }) => {
  if (!configuration.droneModel) {
    return null;
  }

  const drone = droneModels.find(d => d.id === configuration.droneModel);
  const payload = configuration.payload ? payloads.find(p => p.id === configuration.payload) : null;
  const battery = configuration.battery ? batteries.find(b => b.id === configuration.battery) : null;
  const selectedEquipments = configuration.additionalEquipment
    ? configuration.additionalEquipment.map(id => additionalEquipment.find(e => e.id === id))
    : [];
  const scenario = configuration.scenario ? scenarios.find(s => s.id === configuration.scenario) : null;

  if (!drone) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{drone.name}</CardTitle>
        <CardDescription>
          {scenario ? `Оптимальное решение для задач: ${scenario.name}` : "Ваша конфигурация"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DroneImage drone={drone} />
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{drone.description}</p>
          
          <div className="space-y-2">
            <h4 className="font-medium">Технические характеристики:</h4>
            <ul className="text-sm space-y-1">
              <li>Время полета: до {drone.flightTime} минут</li>
              <li>Максимальная скорость: {drone.maxSpeed} км/ч</li>
              <li>Дальность полета: до {drone.range} км</li>
              {payload && (
                <li>Полезная нагрузка: {payload.name} ({payload.description})</li>
              )}
              {battery && (
                <li>Аккумулятор: {battery.name} (Емкость: {battery.capacity} мАч)</li>
              )}
            </ul>
          </div>
          
          {selectedEquipments.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Дополнительное оборудование:</h4>
              <ul className="text-sm space-y-1">
                {selectedEquipments.map(equipment => equipment && (
                  <li key={equipment.id}>{equipment.name}: {equipment.description}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigSummary;
