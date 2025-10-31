export type Listing = {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  guests: number;
  coordinates: [number, number];
  imageUrl: string;
  description: string;
  rating: number;
  tags: string[];
};

export const listings: Listing[] = [
  {
    id: '1',
    title: 'Skyline Loft',
    location: 'New York, USA',
    pricePerNight: 420,
    guests: 4,
    coordinates: [-74.0059, 40.7128],
    imageUrl:
      'https://images.unsplash.com/photo-1533106418989-88406c7cc8e1?auto=format&fit=crop&w=1200&q=80',
    description:
      'Watch the city that never sleeps from a glass-walled penthouse with private terrace.',
    rating: 4.9,
    tags: ['Loft', 'Cityscape', 'Family friendly']
  },
  {
    id: '2',
    title: 'Santorini Sun Cave',
    location: 'Santorini, Greece',
    pricePerNight: 520,
    guests: 2,
    coordinates: [25.431, 36.3932],
    imageUrl:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    description:
      'Perched on volcanic cliffs with a sunset plunge pool overlooking the caldera.',
    rating: 4.95,
    tags: ['Romantic', 'Pool', 'Sunset views']
  },
  {
    id: '3',
    title: 'Amazon Glasshouse',
    location: 'Manaus, Brazil',
    pricePerNight: 310,
    guests: 3,
    coordinates: [-60.0217, -3.119],
    imageUrl:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    description:
      'Immerse in the rainforest canopy with panoramic views and eco-friendly amenities.',
    rating: 4.8,
    tags: ['Adventure', 'Eco stay', 'Rainforest']
  },
  {
    id: '4',
    title: 'Tokyo Neon Flat',
    location: 'Tokyo, Japan',
    pricePerNight: 390,
    guests: 2,
    coordinates: [139.6917, 35.6895],
    imageUrl:
      'https://images.unsplash.com/photo-1491884662610-dfcd28f30cf5?auto=format&fit=crop&w=1200&q=80',
    description:
      'A high-tech apartment above Shibuya Crossing with cinematic skyline views.',
    rating: 4.87,
    tags: ['City', 'Nightlife', 'Tech']
  },
  {
    id: '5',
    title: 'Norwegian Aurora Cabin',
    location: 'Tromsø, Norway',
    pricePerNight: 450,
    guests: 5,
    coordinates: [18.9553, 69.6492],
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    description:
      'Glazed cabin with in-floor heating and unobstructed aurora borealis views.',
    rating: 4.92,
    tags: ['Northern lights', 'Family', 'Snow']
  }
];
