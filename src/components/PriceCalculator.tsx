
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DroneConfiguration, calculateTotalPrice, isConfigurationStandard, droneModels, payloads, batteries, additionalEquipment } from '@/lib/droneData';

type PriceCalculatorProps = {
  configuration: Partial<DroneConfiguration>;
  onCalculateRequest: () => void;
  isFormComplete: boolean;
};

const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  configuration,
  onCalculateRequest,
  isFormComplete,
}) => {
  const totalPrice = calculateTotalPrice(configuration);
  const isStandard = isConfigurationStandard(configuration);

  // Get names of selected components
  const getModelName = () => {
    if (!configuration.droneModel) return "Не выбрано";
    return droneModels.find(d => d.id === configuration.droneModel)?.name || "Не выбрано";
  };

  const getPayloadName = () => {
    if (!configuration.payload) return "Не выбрано";
    return payloads.find(p => p.id === configuration.payload)?.name || "Не выбрано";
  };

  const getBatteryName = () => {
    if (!configuration.battery) return "Не выбрано";
    return batteries.find(b => b.id === configuration.battery)?.name || "Не выбрано";
  };

  const getAdditionalEquipmentNames = () => {
    if (!configuration.additionalEquipment || configuration.additionalEquipment.length === 0) {
      return "Не выбрано";
    }
    
    return configuration.additionalEquipment
      .map(id => additionalEquipment.find(e => e.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Ваша конфигурация</CardTitle>
        <CardDescription>Итоговая стоимость комплекта</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Модель дрона:</span>
            <span className="font-medium">{getModelName()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Полезная нагрузка:</span>
            <span className="font-medium">{getPayloadName()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Аккумулятор:</span>
            <span className="font-medium">{getBatteryName()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Доп. оборудование:</span>
            <span className="font-medium">{getAdditionalEquipmentNames()}</span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between">
            <span className="font-semibold">Итоговая стоимость:</span>
            <span className="font-bold text-lg text-drone-primary">
              {new Intl.NumberFormat('ru-RU').format(totalPrice)} ₽
            </span>
          </div>
          
          {!isStandard && totalPrice > 0 && (
            <p className="text-xs text-drone-warning mt-1">
              * Требуется дополнительный анализ специалиста, окончательная стоимость будет отражена в ТКП
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={onCalculateRequest}
          disabled={!isFormComplete}
        >
          Рассчитать решение
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PriceCalculator;
