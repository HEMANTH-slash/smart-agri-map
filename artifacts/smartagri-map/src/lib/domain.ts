export const categories = ["Crop Disease", "Pest Attack", "Water Shortage", "Soil Problem", "Crop Damage"] as const;
export const statuses = ["Reported", "In Progress", "Resolved"] as const;
export type ProblemType = typeof categories[number];
export type ReportStatus = typeof statuses[number];
export type Role = "Farmer" | "Officer" | "Admin";
export interface Report {
  id: string; farmerName: string; farmerEmail: string; problemType: ProblemType; description: string;
  locationName: string; latitude: number; longitude: number; image?: string; date: string;
  status: ReportStatus; remarks: string; createdAt: string;
}
export interface User { email: string; role: Role; name: string }
export const accounts = [
  { email: "farmer@demo.com", password: "farmer123", role: "Farmer" as const, name: "Lakshmi Reddy" },
  { email: "officer@demo.com", password: "officer123", role: "Officer" as const, name: "Ravi Kumar" },
  { email: "admin@demo.com", password: "admin123", role: "Admin" as const, name: "Ananya Rao" },
];
export function getAccountAccess(): Record<string, boolean> {
  try {
    const stored = JSON.parse(localStorage.getItem("smartagri.account-access") || "{}") as Record<string, unknown>;
    return Object.fromEntries(accounts.map(account => [account.email, stored[account.email] !== false]));
  } catch {
    return Object.fromEntries(accounts.map(account => [account.email, true]));
  }
}
export function setAccountEnabled(email: string, enabled: boolean) {
  const access = getAccountAccess();
  if (email in access) localStorage.setItem("smartagri.account-access", JSON.stringify({ ...access, [email]: enabled }));
}
const seeds: Omit<Report, "id" | "createdAt">[] = [
  { farmerName:"Srinivas Reddy",farmerEmail:"farmer@demo.com",problemType:"Crop Disease",description:"Yellowing leaves and dark spots spreading across the groundnut crop. The affected patch is growing after recent rains.",locationName:"Rajampet, Kadapa",latitude:14.195,longitude:79.159,image:"",date:"2025-06-16",status:"Reported",remarks:""},
  { farmerName:"Lakshmi Reddy",farmerEmail:"farmer@demo.com",problemType:"Water Shortage",description:"Borewell has run dry and the paddy field needs urgent irrigation support before the next planting window.",locationName:"Kadapa",latitude:14.467,longitude:78.824,date:"2025-06-14",status:"In Progress",remarks:"Field officer assigned. Site visit planned for tomorrow."},
  { farmerName:"Ramesh Naidu",farmerEmail:"farmer@demo.com",problemType:"Pest Attack",description:"Fall armyworm damage visible on maize leaves across two acres. Need advice on safe control measures.",locationName:"Anantapur",latitude:14.681,longitude:77.601,date:"2025-06-12",status:"Resolved",remarks:"Agriculture officer visited and recommended a safe treatment."},
  { farmerName:"M. Prasad",farmerEmail:"farmer@demo.com",problemType:"Soil Problem",description:"Soil has become saline and crop growth is patchy. Requesting a soil health assessment.",locationName:"Kurnool",latitude:15.828,longitude:78.037,date:"2025-06-11",status:"Reported",remarks:""},
  { farmerName:"Sujatha",farmerEmail:"farmer@demo.com",problemType:"Crop Damage",description:"Strong winds flattened a section of the banana crop. Seeking guidance on recovery and compensation.",locationName:"Tirupati",latitude:13.628,longitude:79.419,date:"2025-06-09",status:"In Progress",remarks:"Local horticulture team notified."},
  { farmerName:"Venkatesh",farmerEmail:"farmer@demo.com",problemType:"Crop Disease",description:"Tomato plants showing wilt symptoms despite regular watering. Need diagnosis before disease spreads.",locationName:"Hyderabad",latitude:17.385,longitude:78.486,date:"2025-06-07",status:"Resolved",remarks:"Soil-borne fungal issue confirmed; treatment shared."},
  { farmerName:"Lakshmi Reddy",farmerEmail:"farmer@demo.com",problemType:"Pest Attack",description:"Small insects damaging chilli flowers and reducing fruit set. Please advise on pollinator-safe treatment.",locationName:"Rajampet, Kadapa",latitude:14.177,longitude:79.183,date:"2025-06-18",status:"Reported",remarks:""},
  { farmerName:"Kiran Kumar",farmerEmail:"farmer@demo.com",problemType:"Water Shortage",description:"Canal water has not reached our village for ten days; groundnut crop is under stress.",locationName:"Kurnool",latitude:15.79,longitude:78.01,date:"2025-06-19",status:"Reported",remarks:""},
  { farmerName:"S. Narayana",farmerEmail:"farmer@demo.com",problemType:"Soil Problem",description:"Need a soil test and nutrient recommendation for the upcoming paddy season.",locationName:"Tirupati",latitude:13.59,longitude:79.36,date:"2025-06-20",status:"In Progress",remarks:"Sample collection coordinated with extension worker."},
  { farmerName:"Pavani",farmerEmail:"farmer@demo.com",problemType:"Crop Damage",description:"Heavy rain damaged young cotton seedlings in the low-lying part of the field.",locationName:"Anantapur",latitude:14.72,longitude:77.58,date:"2025-06-21",status:"Resolved",remarks:"Drainage guidance provided; replacement seed support approved."},
];
export function getReports(): Report[] {
  try { const stored = localStorage.getItem("smartagri.reports"); if (stored) return JSON.parse(stored) as Report[]; } catch {}
  const data = seeds.map((r,i)=>({...r,date:new Date(Date.now()-(i*86400000)).toISOString().slice(0,10),id:`SA-${String(2401+i)}`,createdAt:new Date(Date.now()-(i*86400000)).toISOString()}));
  localStorage.setItem("smartagri.reports",JSON.stringify(data)); return data;
}
export function saveReports(reports: Report[]) { localStorage.setItem("smartagri.reports",JSON.stringify(reports)); }
export const categoryColor: Record<ProblemType,string> = {"Crop Disease":"#c4493d","Pest Attack":"#d77a32","Water Shortage":"#3289b4","Soil Problem":"#4f8756","Crop Damage":"#845db2"};
