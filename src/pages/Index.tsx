
import React, { useState } from 'react';
import { 
  scenarios, 
  droneModels, 
  payloads, 
  batteries, 
  additionalEquipment, 
  DroneConfiguration
} from '@/lib/droneData';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ScenarioSelector from '@/components/ScenarioSelector';
import ConfigurationStep from '@/components/ConfigurationStep';
import PriceCalculator from '@/components/PriceCalculator';
import RequestForm from '@/components/RequestForm';
import ConfigSummary from '@/components/ConfigSummary';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Configuration state
  const [configuration, setConfiguration] = useState<Partial<DroneConfiguration>>({});
  
  // UI state
  const [step, setStep] = useState(0);
  const [requestFormOpen, setRequestFormOpen] = useState(false);
  
  // Load simulation
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handlers
  const handleSelectScenario = (id: string) => {
    setConfiguration(prev => ({ ...prev, scenario: id }));
    
    // Auto-advance to next step if this is the current step
    if (step === 0) {
      setStep(1);
    }
  };
  
  const handleSelectDrone = (id: string) => {
    // Selecting a new drone might make current selections incompatible
    // Reset payload, battery, and additional equipment if changing drone
    if (id !== configuration.droneModel) {
      setConfiguration(prev => ({ 
        ...prev, 
        droneModel: id,
        payload: undefined,
        battery: undefined,
        additionalEquipment: []
      }));
    } else {
      setConfiguration(prev => ({ ...prev, droneModel: id }));
    }
    
    // Auto-advance to next step if this is the current step
    if (step === 1) {
      setStep(2);
    }
  };
  
  const handleSelectPayload = (id: string) => {
    setConfiguration(prev => ({ ...prev, payload: id }));
    
    // Auto-advance to next step if this is the current step
    if (step === 2) {
      setStep(3);
    }
  };
  
  const handleSelectBattery = (id: string) => {
    setConfiguration(prev => ({ ...prev, battery: id }));
    
    // Auto-advance to next step if this is the current step
    if (step === 3) {
      setStep(4);
    }
  };
  
  const handleToggleEquipment = (id: string, checked: boolean) => {
    setConfiguration(prev => {
      const equipment = prev.additionalEquipment || [];
      
      if (checked) {
        return { ...prev, additionalEquipment: [...equipment, id] };
      } else {
        return { ...prev, additionalEquipment: equipment.filter(e => e !== id) };
      }
    });
  };
  
  const handleCalculateRequest = () => {
    setRequestFormOpen(true);
  };
  
  // Check if form is complete (all required fields are filled)
  const isFormComplete = Boolean(
    configuration.scenario &&
    configuration.droneModel &&
    configuration.payload &&
    configuration.battery
  );
  
  // Filter equipment based on compatibility with selected drone
  const compatibleEquipment = configuration.droneModel
    ? additionalEquipment.filter(item => 
        item.compatibleDrones.includes(configuration.droneModel as string)
      )
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-drone-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-drone-background">
      <header className="bg-white border-b">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-drone-text">Конфигуратор БАС</h1>
          <p className="text-muted-foreground">Подберите оптимальную конфигурацию дрона для ваших задач</p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Scenario Selection */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Выберите сценарий применения</h2>
              <ScenarioSelector
                scenarios={scenarios}
                selectedScenario={configuration.scenario || null}
                onSelectScenario={handleSelectScenario}
              />
            </div>

            {/* Steps 2-4: Configuration */}
            {(step >= 1 || configuration.scenario) && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Конфигурация дрона</h2>
                
                {/* Summary of current configuration */}
                <ConfigSummary configuration={configuration} />
                
                {/* Drone Selection */}
                <ConfigurationStep
                  title="Выберите модель дрона"
                  description="Подберите платформу, оптимальную для ваших задач"
                  options={configuration.scenario 
                    ? droneModels.map(drone => ({
                        id: drone.id,
                        name: drone.name,
                        description: drone.description,
                        price: drone.basePrice,
                        disabled: !drone.scenarios.includes(configuration.scenario as string)
                      }))
                    : droneModels.map(drone => ({
                        id: drone.id,
                        name: drone.name,
                        description: drone.description,
                        price: drone.basePrice
                      }))
                  }
                  selectedOption={configuration.droneModel || null}
                  onSelectOption={handleSelectDrone}
                  stepIndex={0}
                />
                
                {/* Payload Selection */}
                {(step >= 2 || configuration.droneModel) && (
                  <div className="mt-6">
                    <ConfigurationStep
                      title="Выберите полезную нагрузку"
                      description="Определите тип сенсора или камеры для ваших задач"
                      options={payloads.map(payload => ({
                        id: payload.id,
                        name: payload.name,
                        description: payload.description,
                        price: payload.price,
                        compatibleDrones: payload.compatibleDrones
                      }))}
                      selectedOption={configuration.payload || null}
                      onSelectOption={handleSelectPayload}
                      stepIndex={1}
                      currentDroneId={configuration.droneModel}
                    />
                  </div>
                )}
                
                {/* Battery Selection */}
                {(step >= 3 || configuration.payload) && (
                  <div className="mt-6">
                    <ConfigurationStep
                      title="Выберите аккумулятор"
                      description="Подберите аккумулятор для обеспечения необходимого времени полета"
                      options={batteries.map(battery => ({
                        id: battery.id,
                        name: battery.name,
                        description: battery.description,
                        price: battery.price,
                        compatibleDrones: battery.compatibleDrones
                      }))}
                      selectedOption={configuration.battery || null}
                      onSelectOption={handleSelectBattery}
                      stepIndex={2}
                      currentDroneId={configuration.droneModel}
                    />
                  </div>
                )}
                
                {/* Additional Equipment */}
                {(step >= 4 || configuration.battery) && (
                  <div className="mt-6 config-step" style={{ '--step-index': 3 } as React.CSSProperties}>
                    <div className="bg-white border rounded-lg overflow-hidden">
                      <div className="p-4 border-b">
                        <h3 className="font-semibold">Дополнительное оборудование</h3>
                        <p className="text-sm text-muted-foreground">Выберите дополнительные компоненты и аксессуары</p>
                      </div>
                      
                      <div className="p-4">
                        <ScrollArea className="h-[300px] pr-4">
                          <div className="space-y-4">
                            {compatibleEquipment.map((equipment) => (
                              <div key={equipment.id} className="flex items-start space-x-3 border p-3 rounded-md">
                                <Checkbox
                                  id={equipment.id}
                                  checked={configuration.additionalEquipment?.includes(equipment.id) || false}
                                  onCheckedChange={(checked) => handleToggleEquipment(equipment.id, checked as boolean)}
                                />
                                <div className="flex-1">
                                  <Label htmlFor={equipment.id} className="font-medium cursor-pointer">
                                    {equipment.name}
                                    <span className="ml-2 text-sm text-drone-primary font-medium">
                                      {new Intl.NumberFormat('ru-RU').format(equipment.price)} ₽
                                    </span>
                                  </Label>
                                  <p className="text-sm text-muted-foreground">{equipment.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                      
                      <div className="p-4 border-t flex justify-end">
                        <Button onClick={() => setStep(5)} disabled={!isFormComplete}>
                          Завершить конфигурацию
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Price Calculator Sidebar */}
          <div>
            <PriceCalculator
              configuration={configuration}
              onCalculateRequest={handleCalculateRequest}
              isFormComplete={isFormComplete}
            />
          </div>
        </div>
      </main>
      
      {/* Request Form Dialog */}
      <RequestForm
        open={requestFormOpen}
        onClose={() => setRequestFormOpen(false)}
        configuration={configuration}
      />
    </div>
  );
};

export default Index;
