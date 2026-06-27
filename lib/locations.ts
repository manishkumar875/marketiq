export interface LocationNode {
  country: string;
  states: { state: string; cities: string[] }[];
}

export const LOCATIONS: LocationNode[] = [
  {
    country: "United States",
    states: [
      { state: "California", cities: ["Los Angeles", "San Francisco", "San Diego"] },
      { state: "New York", cities: ["New York City", "Buffalo", "Albany"] },
      { state: "Texas", cities: ["Austin", "Dallas", "Houston"] },
    ],
  },
  {
    country: "United Kingdom",
    states: [
      { state: "England", cities: ["London", "Manchester", "Birmingham"] },
      { state: "Scotland", cities: ["Edinburgh", "Glasgow"] },
    ],
  },
  {
    country: "India",
    states: [
      { state: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
      { state: "Karnataka", cities: ["Bengaluru", "Mysuru"] },
      { state: "Delhi", cities: ["New Delhi"] },
    ],
  },
  {
    country: "Germany",
    states: [
      { state: "Bavaria", cities: ["Munich", "Nuremberg"] },
      { state: "Berlin", cities: ["Berlin"] },
    ],
  },
  {
    country: "Australia",
    states: [
      { state: "New South Wales", cities: ["Sydney", "Newcastle"] },
      { state: "Victoria", cities: ["Melbourne", "Geelong"] },
    ],
  },
  {
    country: "Brazil",
    states: [
      { state: "São Paulo", cities: ["São Paulo City", "Campinas"] },
      { state: "Rio de Janeiro", cities: ["Rio de Janeiro City", "Niterói"] },
    ],
  },
];

export const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Portuguese",
  "Hindi",
  "Mandarin",
  "Japanese",
];
