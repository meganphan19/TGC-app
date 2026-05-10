import { UserProfile, Mission, Product, EventLocation } from './types';

export const MOCK_USER: UserProfile = {
  id: 'TGC-2026-XQ9',
  name: 'Megan Phan',
  tier: 'Expert',
  points: 1250,
  qrCode: 'tgc-user-megan-phan-2026',
};

export const MOCK_MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'Main Stage Check-in',
    description: 'Arrive at the Main Stage for the opening show.',
    points: 100,
    type: 'CheckIn',
    isCompleted: true,
    location: { lat: 10.7769, lng: 106.7009 },
  },
  {
    id: 'm2',
    title: 'Vote for Top Model',
    description: 'Use the app to vote for your favorite runway look.',
    points: 50,
    type: 'Vote',
    isCompleted: false,
  },
  {
    id: 'm3',
    title: 'Sponsor Booth Stamp',
    description: 'Visit the Shiseido booth and scan the QR code.',
    points: 150,
    type: 'Stamp',
    isCompleted: false,
    location: { lat: 10.7765, lng: 106.7012 },
  },
  {
    id: 'm4',
    title: 'Share the Look',
    description: 'Post a photo with #TGCVietnam2026 on Instagram.',
    points: 200,
    type: 'Social',
    isCompleted: false,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'TGC Tokyo-Chic Bomber',
    price: 85,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400',
    category: 'Apparel',
    runwayLook: true,
  },
  {
    id: 'p2',
    name: 'Silk Glow Foundation',
    price: 45,
    image: 'https://images.unsplash.com/photo-1522335789183-b15222c6332d?auto=format&fit=crop&q=80&w=400',
    category: 'Cosmetic',
    runwayLook: true,
  },
  {
    id: 'p3',
    name: 'TGC Event Tote Bag',
    price: 25,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400',
    category: 'Goods',
  },
  {
    id: 'p4',
    name: 'Experience Tokyo Tour',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=400',
    category: 'Travel',
  },
];

export const MOCK_LOCATIONS: EventLocation[] = [
  {
    id: 'loc1',
    name: 'Main Stage',
    lat: 10.7769,
    lng: 106.7009,
    description: 'The heart of TGC Vietnam. Fashion shows happen here.',
    type: 'Stage',
  },
  {
    id: 'loc2',
    name: 'Official Merchandise',
    lat: 10.7772,
    lng: 106.7015,
    description: 'Exclusive TGC Vietnam goods.',
    type: 'Shop',
  },
  {
    id: 'loc3',
    name: 'TGC Beauty Zone',
    lat: 10.7765,
    lng: 106.7012,
    description: 'Sponsor booths and interactive beauty experience.',
    type: 'Booth',
  },
];
