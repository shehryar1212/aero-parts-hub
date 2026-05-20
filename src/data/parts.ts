export type Condition = "New" | "Overhauled" | "Serviceable";

export interface Part {
  id: string;
  partNumber: string;
  name: string;
  description: string;
  category: string;
  manufacturer: string;
  condition: Condition;
  quantity: number;
  price: number;
  compatibility: string[];
  image: string;
}

export const CATEGORIES = [
  "Engine",
  "Avionics",
  "Landing Gear",
  "Hydraulics",
  "Electrical",
  "Airframe",
  "Cabin",
  "Fuel System",
] as const;

export const CONDITIONS: Condition[] = ["New", "Overhauled", "Serviceable"];

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export const PARTS: Part[] = [
  {
    id: "p1", partNumber: "CFM56-7B-FB-2204", name: "CFM56-7B Fan Blade",
    description: "Titanium wide-chord fan blade for CFM56-7B engines used on Boeing 737NG aircraft. Inspected per CMM 72-21-28.",
    category: "Engine", manufacturer: "CFM International", condition: "Overhauled",
    quantity: 8, price: 18450,
    compatibility: ["Boeing 737-700", "Boeing 737-800", "Boeing 737-900"],
    image: img("photo-1569629743817-70d8db6c323b"),
  },
  {
    id: "p2", partNumber: "HON-GTCP131-9B", name: "APU GTCP131-9B Starter",
    description: "Auxiliary Power Unit pneumatic starter assembly. FAA 8130-3 tagged with full traceability.",
    category: "Engine", manufacturer: "Honeywell", condition: "Serviceable",
    quantity: 3, price: 32500,
    compatibility: ["Airbus A320 Family", "Boeing 737NG"],
    image: img("photo-1540962351504-03099e0a754b"),
  },
  {
    id: "p3", partNumber: "COL-G7000-PFD", name: "Pro Line 21 Primary Flight Display",
    description: "6x8 inch active matrix LCD primary flight display unit for Pro Line 21 avionics suite.",
    category: "Avionics", manufacturer: "Collins Aerospace", condition: "New",
    quantity: 12, price: 14200,
    compatibility: ["Bombardier CRJ700", "Bombardier CRJ900", "Embraer ERJ-145"],
    image: img("photo-1583573636289-c9f6f5f4ae12"),
  },
  {
    id: "p4", partNumber: "MSL-A320-MLG-04", name: "A320 Main Landing Gear Shock Strut",
    description: "Main landing gear shock absorber strut, fully overhauled per Messier-Bugatti-Dowty CMM.",
    category: "Landing Gear", manufacturer: "Safran Landing Systems", condition: "Overhauled",
    quantity: 2, price: 86400,
    compatibility: ["Airbus A319", "Airbus A320", "Airbus A321"],
    image: img("photo-1474302770737-173ee21bab63"),
  },
  {
    id: "p5", partNumber: "PARK-HYD-3030-22", name: "Hydraulic Pump Assembly 3000psi",
    description: "Engine-driven hydraulic pump, 3000 PSI rated for primary flight controls.",
    category: "Hydraulics", manufacturer: "Parker Hannifin", condition: "New",
    quantity: 6, price: 9450,
    compatibility: ["Boeing 757", "Boeing 767"],
    image: img("photo-1581093588401-fbb62a02f120"),
  },
  {
    id: "p6", partNumber: "GAR-NAV4500-WAAS", name: "GNS 4500 WAAS Nav/Comm",
    description: "Certified TSO GPS/Nav/Comm transceiver with WAAS capability for IFR operations.",
    category: "Avionics", manufacturer: "Garmin", condition: "New",
    quantity: 18, price: 7800,
    compatibility: ["Cessna 172", "Piper PA-28", "Cirrus SR22"],
    image: img("photo-1559136555-9303baea8ebd"),
  },
  {
    id: "p7", partNumber: "B737-WS-LE-117", name: "737 Wing Leading Edge Slat",
    description: "Wing leading edge slat panel, NDT inspected, ready for installation.",
    category: "Airframe", manufacturer: "Boeing", condition: "Serviceable",
    quantity: 4, price: 24500,
    compatibility: ["Boeing 737-800"],
    image: img("photo-1436491865332-7a61a109cc05"),
  },
  {
    id: "p8", partNumber: "GE-CF6-80C2-HPT", name: "CF6-80C2 HP Turbine Blade Set",
    description: "Complete set of high-pressure turbine blades, single-crystal alloy, overhauled.",
    category: "Engine", manufacturer: "GE Aviation", condition: "Overhauled",
    quantity: 1, price: 142000,
    compatibility: ["Boeing 747-400", "Boeing 767-300"],
    image: img("photo-1542296332-2e4473faf563"),
  },
  {
    id: "p9", partNumber: "ZOD-PAX-SEAT-22F", name: "Economy Passenger Seat 3-Abreast",
    description: "Triple-seat economy class passenger seat assembly with 16g restraint system.",
    category: "Cabin", manufacturer: "Zodiac Aerospace", condition: "Serviceable",
    quantity: 24, price: 3200,
    compatibility: ["Airbus A320", "Boeing 737"],
    image: img("photo-1542296332-2e4473faf563"),
  },
  {
    id: "p10", partNumber: "EAT-FUEL-NOZ-V2500", name: "V2500 Fuel Nozzle Assembly",
    description: "Engine combustor fuel nozzle, overhauled and flow-tested to IAE specifications.",
    category: "Fuel System", manufacturer: "Eaton Aerospace", condition: "Overhauled",
    quantity: 14, price: 5600,
    compatibility: ["Airbus A320 (V2500)", "MD-90"],
    image: img("photo-1597149961419-cdcd81fa8f78"),
  },
  {
    id: "p11", partNumber: "TFE731-2C-IGN", name: "TFE731 Ignition Exciter Unit",
    description: "Dual-output ignition exciter for TFE731 turbofan engines.",
    category: "Electrical", manufacturer: "Honeywell", condition: "New",
    quantity: 9, price: 4180,
    compatibility: ["Learjet 35", "Hawker 800", "Falcon 50"],
    image: img("photo-1559136555-9303baea8ebd"),
  },
  {
    id: "p12", partNumber: "AMETEK-PITOT-7113", name: "Pitot-Static Probe Heated",
    description: "Heated pitot-static probe with ice protection and integral drain.",
    category: "Avionics", manufacturer: "Ametek", condition: "New",
    quantity: 22, price: 2950,
    compatibility: ["Embraer E170", "Embraer E190"],
    image: img("photo-1521587760476-6c12a4b040da"),
  },
  {
    id: "p13", partNumber: "A350-WLG-TIRE-46x18", name: "A350 Main Wheel Tire 46x18",
    description: "Radial main landing gear tire, 32-ply rated, Michelin Air X.",
    category: "Landing Gear", manufacturer: "Michelin", condition: "New",
    quantity: 16, price: 6850,
    compatibility: ["Airbus A350-900", "Airbus A350-1000"],
    image: img("photo-1474302770737-173ee21bab63"),
  },
  {
    id: "p14", partNumber: "LIE-OXY-MASK-CC", name: "Crew Oxygen Mask Quick-Don",
    description: "Crew quick-donning oxygen mask with integrated microphone and demand regulator.",
    category: "Cabin", manufacturer: "Liebherr Aerospace", condition: "New",
    quantity: 30, price: 1450,
    compatibility: ["Airbus A330", "Boeing 777"],
    image: img("photo-1583500178690-f7fd39c0e0f0"),
  },
  {
    id: "p15", partNumber: "EAT-HYD-RES-A330", name: "A330 Green System Hydraulic Reservoir",
    description: "Pressurized hydraulic reservoir for Green hydraulic system, A330 family.",
    category: "Hydraulics", manufacturer: "Eaton Aerospace", condition: "Overhauled",
    quantity: 2, price: 11750,
    compatibility: ["Airbus A330-200", "Airbus A330-300"],
    image: img("photo-1581093588401-fbb62a02f120"),
  },
  {
    id: "p16", partNumber: "ROC-BAT-NICAD-24V", name: "Aircraft Battery 24V NiCad",
    description: "Nickel-Cadmium main aircraft battery, 24V 40Ah, FAA-PMA approved.",
    category: "Electrical", manufacturer: "Saft", condition: "New",
    quantity: 7, price: 3950,
    compatibility: ["Bombardier Q400", "ATR 72"],
    image: img("photo-1605640840605-14ac1855827b"),
  },
  {
    id: "p17", partNumber: "B777-CARGO-DR-ACT", name: "777 Cargo Door Actuator",
    description: "Electromechanical cargo door actuator with position feedback.",
    category: "Airframe", manufacturer: "Moog Inc.", condition: "Overhauled",
    quantity: 3, price: 18900,
    compatibility: ["Boeing 777-200", "Boeing 777-300ER"],
    image: img("photo-1436491865332-7a61a109cc05"),
  },
  {
    id: "p18", partNumber: "PW1100G-FAN-HUB", name: "PW1100G Fan Hub Assembly",
    description: "Geared turbofan fan hub assembly with integral spinner mount.",
    category: "Engine", manufacturer: "Pratt & Whitney", condition: "New",
    quantity: 1, price: 215000,
    compatibility: ["Airbus A320neo"],
    image: img("photo-1569629743817-70d8db6c323b"),
  },
];
