
export type Tier = 'Fan' | 'Expert' | 'Icon' | 'Muse';

export interface UserProfile {
  id: string;
  name: string;
  tier: Tier;
  points: number;
  qrCode: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'Stamp' | 'Vote' | 'Social' | 'CheckIn';
  isCompleted: boolean;
  location?: { lat: number; lng: number };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Apparel' | 'Cosmetic' | 'Goods' | 'Travel';
  runwayLook?: boolean;
}

export interface EventLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
  type: 'Stage' | 'Booth' | 'Entrance' | 'Shop';
}
