export type EnquiryStatus = "New" | "In Progress" | "Quoted" | "Closed";

export interface Enquiry {
  id: string;
  partNumber: string;
  customerName: string;
  email: string;
  company: string;
  date: string;
  status: EnquiryStatus;
}

export const ENQUIRIES: Enquiry[] = [
  { id: "e1", partNumber: "CFM56-7B-FB-2204", customerName: "Marcus Chen", email: "m.chen@pacific-air.com", company: "Pacific Air", date: "2026-05-18", status: "New" },
  { id: "e2", partNumber: "HON-GTCP131-9B", customerName: "Priya Anand", email: "priya@skybridge-mro.in", company: "SkyBridge MRO", date: "2026-05-17", status: "Quoted" },
  { id: "e3", partNumber: "COL-G7000-PFD", customerName: "Hannes Müller", email: "h.mueller@lufthansa-technik.de", company: "Lufthansa Technik", date: "2026-05-17", status: "In Progress" },
  { id: "e4", partNumber: "MSL-A320-MLG-04", customerName: "Aisha Bello", email: "abello@africanwings.ng", company: "African Wings", date: "2026-05-16", status: "New" },
  { id: "e5", partNumber: "PARK-HYD-3030-22", customerName: "Tomás Pereira", email: "tomas@latamcargo.cl", company: "LATAM Cargo", date: "2026-05-15", status: "Quoted" },
  { id: "e6", partNumber: "B737-WS-LE-117", customerName: "Karen Stewart", email: "kstewart@southstar.com", company: "SouthStar Aviation", date: "2026-05-15", status: "Closed" },
  { id: "e7", partNumber: "GE-CF6-80C2-HPT", customerName: "Rajat Singh", email: "rsingh@indigo-mro.in", company: "IndiGo MRO", date: "2026-05-14", status: "In Progress" },
  { id: "e8", partNumber: "GAR-NAV4500-WAAS", customerName: "Eric Lindgren", email: "eric@nordicflight.se", company: "Nordic Flight Services", date: "2026-05-13", status: "Quoted" },
  { id: "e9", partNumber: "PW1100G-FAN-HUB", customerName: "Mei Tanaka", email: "mtanaka@haneda-tech.jp", company: "Haneda Technical", date: "2026-05-12", status: "New" },
  { id: "e10", partNumber: "A350-WLG-TIRE-46x18", customerName: "Carlos Reyes", email: "creyes@aeromexico-tech.mx", company: "Aeromexico Tech", date: "2026-05-11", status: "Closed" },
];
