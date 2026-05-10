
export type Tier = 'New-Gen' | 'Trendsetter' | 'Icon' | 'Muse';
export type TicketType = 'Standard' | 'Priority' | 'VVIP';

export interface Voucher {
  id: string;
  title: string;
  brand: string;
  discount: string;
  code: string;
  expiry: string;
  claimed: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  tier: Tier;
  points: number;
  qrCode: string;
  ticketType: TicketType;
  vouchers: Voucher[];
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
