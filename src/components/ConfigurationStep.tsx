
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Option = {
  id: string;
  name: string;
  description: string;
  price?: number;
  compatibleDrones?: string[];
  disabled?: boolean;
};

type ConfigurationStepProps = {
  title: string;
  description: string;
  options: Option[];
  selectedOption: string | null;
  onSelectOption: (id: string) => void;
  stepIndex: number;
  currentDroneId?: string;
};

const ConfigurationStep: React.FC<ConfigurationStepProps> = ({
  title,
  description,
  options,
  selectedOption,
  onSelectOption,
  stepIndex,
  currentDroneId,
}) => {
  const filteredOptions = currentDroneId
    ? options.filter(option => !option.compatibleDrones || option.compatibleDrones.includes(currentDroneId))
    : options;

  return (
    <Card className="config-step" style={{ '--step-index': stepIndex } as React.CSSProperties}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedOption || ''} onValueChange={onSelectOption}>
          <div className="grid gap-4">
            {filteredOptions.map((option) => {
              const isDisabled = option.disabled || (currentDroneId && option.compatibleDrones && !option.compatibleDrones.includes(currentDroneId));
              
              return (
                <Label
                  key={option.id}
                  htmlFor={option.id}
                  className={cn(
                    "flex flex-col space-y-1 rounded-md border-2 p-4 cursor-pointer hover:bg-muted transition-colors",
                    selectedOption === option.id ? "border-drone-primary bg-drone-background" : "border-muted",
                    isDisabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={option.id} id={option.id} disabled={isDisabled} />
                        <span className="font-medium">{option.name}</span>
                        {option.price && (
                          <span className="text-sm ml-2 text-drone-primary font-medium">
                            {new Intl.NumberFormat('ru-RU').format(option.price)} ₽
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    {selectedOption === option.id && (
                      <Check className="h-5 w-5 text-drone-primary shrink-0" />
                    )}
                  </div>
                </Label>
              );
            })}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ConfigurationStep;
