
export type Scenario = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type DroneModel = {
  id: string;
  name: string;
  description: string;
  image: string;
  basePrice: number;
  flightTime: number;
  maxSpeed: number;
  range: number;
  scenarios: string[];
};

export type PayloadType = {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  compatibleDrones: string[];
};

export type BatteryType = {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  weight: number;
  compatibleDrones: string[];
};

export type AdditionalEquipment = {
  id: string;
  name: string;
  description: string;
  price: number;
  compatibleDrones: string[];
};

export const scenarios: Scenario[] = [
  {
    id: "security",
    name: "Охрана",
    description: "Наблюдение, патрулирование и охрана территорий",
    icon: "shield",
  },
  {
    id: "geodesy",
    name: "Геодезия",
    description: "Картографирование, создание 3D-моделей местности",
    icon: "map",
  },
  {
    id: "inspection",
    name: "Инспекция",
    description: "Обследование и мониторинг объектов инфраструктуры",
    icon: "search",
  },
  {
    id: "agriculture",
    name: "Сельское хозяйство",
    description: "Мониторинг полей, опрыскивание и анализ посевов",
    icon: "leaf",
  },
  {
    id: "construction",
    name: "Строительство",
    description: "Мониторинг строительных площадок, контроль хода работ",
    icon: "building",
  },
  {
    id: "emergency",
    name: "Чрезвычайные ситуации",
    description: "Поиск и спасение, оценка ущерба, планирование операций",
    icon: "alarm",
  },
];

export const droneModels: DroneModel[] = [
  {
    id: "quad-scout",
    name: "Квадрокоптер Scout",
    description: "Компактный и легкий дрон для простых задач наблюдения и мониторинга",
    image: "/placeholder.svg",
    basePrice: 150000,
    flightTime: 25,
    maxSpeed: 60,
    range: 5,
    scenarios: ["security", "inspection"],
  },
  {
    id: "quad-surveyor",
    name: "Квадрокоптер Surveyor",
    description: "Профессиональная модель для геодезических съемок и точного картографирования",
    image: "/placeholder.svg",
    basePrice: 350000,
    flightTime: 35,
    maxSpeed: 50,
    range: 7,
    scenarios: ["geodesy", "construction", "agriculture"],
  },
  {
    id: "quad-inspector",
    name: "Квадрокоптер Inspector",
    description: "Специализированная модель для инспекции объектов инфраструктуры",
    image: "/placeholder.svg",
    basePrice: 280000,
    flightTime: 30,
    maxSpeed: 55,
    range: 6,
    scenarios: ["inspection", "construction"],
  },
  {
    id: "hex-carrier",
    name: "Гексакоптер Carrier",
    description: "Мощный гексакоптер для перевозки тяжелых грузов и оборудования",
    image: "/placeholder.svg",
    basePrice: 450000,
    flightTime: 40,
    maxSpeed: 45,
    range: 8,
    scenarios: ["agriculture", "emergency"],
  },
  {
    id: "octo-commander",
    name: "Октокоптер Commander",
    description: "Высокопроизводительный октокоптер для сложных и критически важных операций",
    image: "/placeholder.svg",
    basePrice: 680000,
    flightTime: 45,
    maxSpeed: 40,
    range: 10,
    scenarios: ["emergency", "security", "inspection"],
  },
];

export const payloads: PayloadType[] = [
  {
    id: "camera-4k",
    name: "Камера 4K",
    description: "Стандартная 4K камера для съемки высокого качества",
    price: 45000,
    weight: 250,
    compatibleDrones: ["quad-scout", "quad-surveyor", "quad-inspector", "hex-carrier", "octo-commander"],
  },
  {
    id: "camera-thermal",
    name: "Тепловизионная камера",
    description: "Тепловизор для ночного наблюдения и поиска источников тепла",
    price: 120000,
    weight: 350,
    compatibleDrones: ["quad-inspector", "hex-carrier", "octo-commander"],
  },
  {
    id: "lidar",
    name: "LiDAR сканер",
    description: "Лазерный сканер для создания точных 3D-моделей местности",
    price: 180000,
    weight: 500,
    compatibleDrones: ["quad-surveyor", "hex-carrier", "octo-commander"],
  },
  {
    id: "multispectral",
    name: "Мультиспектральная камера",
    description: "Камера для анализа состояния растительности в различных спектрах",
    price: 150000,
    weight: 400,
    compatibleDrones: ["quad-surveyor", "hex-carrier", "octo-commander"],
  },
  {
    id: "speaker",
    name: "Громкоговоритель",
    description: "Система оповещения для передачи информации с воздуха",
    price: 25000,
    weight: 300,
    compatibleDrones: ["hex-carrier", "octo-commander"],
  },
];

export const batteries: BatteryType[] = [
  {
    id: "battery-standard",
    name: "Стандартный аккумулятор",
    description: "Базовый аккумулятор для небольших полетных заданий",
    price: 15000,
    capacity: 5000,
    weight: 400,
    compatibleDrones: ["quad-scout", "quad-surveyor", "quad-inspector"],
  },
  {
    id: "battery-extended",
    name: "Увеличенный аккумулятор",
    description: "Аккумулятор повышенной емкости для длительных полетов",
    price: 25000,
    capacity: 7500,
    weight: 600,
    compatibleDrones: ["quad-scout", "quad-surveyor", "quad-inspector", "hex-carrier"],
  },
  {
    id: "battery-pro",
    name: "Профессиональный аккумулятор",
    description: "Высокопроизводительный аккумулятор для интенсивного использования",
    price: 40000,
    capacity: 10000,
    weight: 800,
    compatibleDrones: ["hex-carrier", "octo-commander"],
  },
];

export const additionalEquipment: AdditionalEquipment[] = [
  {
    id: "case",
    name: "Транспортировочный кейс",
    description: "Защитный кейс для безопасной транспортировки дрона",
    price: 20000,
    compatibleDrones: ["quad-scout", "quad-surveyor", "quad-inspector", "hex-carrier", "octo-commander"],
  },
  {
    id: "spare-propellers",
    name: "Запасные пропеллеры",
    description: "Набор запасных пропеллеров для быстрой замены в полевых условиях",
    price: 8000,
    compatibleDrones: ["quad-scout", "quad-surveyor", "quad-inspector", "hex-carrier", "octo-commander"],
  },
  {
    id: "controller-pro",
    name: "Профессиональный пульт управления",
    description: "Расширенный пульт с дополнительными функциями и увеличенной дальностью",
    price: 35000,
    compatibleDrones: ["quad-surveyor", "hex-carrier", "octo-commander"],
  },
  {
    id: "ground-station",
    name: "Наземная станция управления",
    description: "Комплект оборудования для профессионального управления дроном",
    price: 120000,
    compatibleDrones: ["hex-carrier", "octo-commander"],
  },
  {
    id: "training",
    name: "Обучение оператора",
    description: "Курс обучения для оператора дрона (16 часов)",
    price: 45000,
    compatibleDrones: ["quad-scout", "quad-surveyor", "quad-inspector", "hex-carrier", "octo-commander"],
  },
];

export type DroneConfiguration = {
  scenario: string;
  droneModel: string;
  payload: string;
  battery: string;
  additionalEquipment: string[];
};

export function calculateTotalPrice(config: Partial<DroneConfiguration>): number {
  let total = 0;
  
  // Add drone base price
  if (config.droneModel) {
    const drone = droneModels.find(d => d.id === config.droneModel);
    if (drone) {
      total += drone.basePrice;
    }
  }
  
  // Add payload price
  if (config.payload) {
    const payload = payloads.find(p => p.id === config.payload);
    if (payload) {
      total += payload.price;
    }
  }
  
  // Add battery price
  if (config.battery) {
    const battery = batteries.find(b => b.id === config.battery);
    if (battery) {
      total += battery.price;
    }
  }
  
  // Add additional equipment prices
  if (config.additionalEquipment && config.additionalEquipment.length > 0) {
    config.additionalEquipment.forEach(eqId => {
      const equipment = additionalEquipment.find(e => e.id === eqId);
      if (equipment) {
        total += equipment.price;
      }
    });
  }
  
  return total;
}

export function isConfigurationStandard(config: Partial<DroneConfiguration>): boolean {
  // Check if the configuration matches common combinations
  // This is a simplified implementation
  if (!config.scenario || !config.droneModel || !config.payload || !config.battery) {
    return false;
  }
  
  // Example of standard combinations (can be expanded)
  const standardCombinations = [
    {
      scenario: "security",
      droneModel: "quad-scout",
      payload: "camera-4k",
      battery: "battery-standard"
    },
    {
      scenario: "geodesy",
      droneModel: "quad-surveyor",
      payload: "lidar",
      battery: "battery-extended"
    },
    {
      scenario: "inspection",
      droneModel: "quad-inspector",
      payload: "camera-4k",
      battery: "battery-standard"
    },
    {
      scenario: "agriculture",
      droneModel: "quad-surveyor",
      payload: "multispectral",
      battery: "battery-extended"
    }
  ];
  
  return standardCombinations.some(combo => 
    combo.scenario === config.scenario &&
    combo.droneModel === config.droneModel &&
    combo.payload === config.payload &&
    combo.battery === config.battery
  );
}
