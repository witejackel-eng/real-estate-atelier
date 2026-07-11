export type PropertyType = 'Villa' | 'Apartment' | 'Penthouse' | 'Duplex' | 'Weekend Home' | 'Heritage Home';

export type Property = {
  id: string;
  slug: string;
  title: string;
  location: string;
  city: string;
  price: string;
  priceNumber: number;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: string;
  parking: string;
  possession: string;
  heroImage: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  features: string[];
  amenities: string[];
  neighborhood: string;
  tags: string[];
  featured: boolean;
};

export const properties: Property[] = [
  {
    id: '1',
    slug: 'the-glass-villa-goa',
    title: 'The Glass Villa',
    location: 'Siolim, North Goa',
    city: 'Goa',
    price: '₹4.8 Cr',
    priceNumber: 48000000,
    type: 'Villa',
    bedrooms: 4,
    bathrooms: 4,
    area: '4,200 sq ft',
    parking: '2 Covered + 2 Open',
    possession: 'Ready to Move',
    heroImage: '/images/property-glass-villa-1.jpg',
    gallery: [
      '/images/property-glass-villa-1.jpg',
      '/images/property-glass-villa-2.jpg',
      '/images/property-glass-villa-3.jpg',
    ],
    shortDescription: 'A transparent riverside villa where every room frames the tropical canopy beyond.',
    description: 'Set along the quiet backwaters of Siolim, this four-bedroom villa is designed around the idea of living with the landscape rather than in front of it. Floor-to-ceiling glass walls dissolve the boundary between interior and exterior, while a private pool and landscaped garden extend the living space outward. The open-plan kitchen and living area flow naturally onto a covered veranda, perfect for monsoon afternoons or winter mornings. Built with laterite and local timber, the structure roots itself in Goan craft while maintaining a clean, contemporary line.',
    features: ['Riverside setting', 'Infinity pool', 'Laterite stone walls', 'Open-plan living', 'Private garden', 'Staff quarters'],
    amenities: ['Swimming Pool', 'Landscaped Garden', 'Modular Kitchen', 'AC in all rooms', 'Water filtration system', 'Solar water heating', '24/7 Security', 'Gated community access'],
    neighborhood: 'Siolim offers a quiet, artistic side of Goa with easy access to Morjim, Vagator, and Mapusa markets. The area is known for its cafes, art studios, and slow-paced lifestyle.',
    tags: ['Pool', 'River View', 'Luxury', 'Contemporary'],
    featured: true,
  },
  {
    id: '2',
    slug: 'skyline-penthouse-mumbai',
    title: 'Skyline Penthouse',
    location: 'Lower Parel, Mumbai',
    city: 'Mumbai',
    price: '₹8.2 Cr',
    priceNumber: 82000000,
    type: 'Penthouse',
    bedrooms: 5,
    bathrooms: 5,
    area: '5,800 sq ft',
    parking: '3 Covered',
    possession: 'Ready to Move',
    heroImage: '/images/property-penthouse-1.jpg',
    gallery: [
      '/images/property-penthouse-1.jpg',
      '/images/property-penthouse-2.jpg',
      '/images/property-penthouse-3.jpg',
    ],
    shortDescription: 'A penthouse that turns the Mumbai skyline into a private gallery, visible from every room.',
    description: 'Perched on the 42nd floor of a premium tower in Lower Parel, this five-bedroom penthouse offers panoramic views stretching from the Mahalaxmi Race Course to the Arabian Sea. The double-height living room, Italian marble flooring, and custom millwork create an atmosphere of restrained luxury. A private terrace on the upper level includes an outdoor lounge and a jacuzzi. The building itself offers a clubhouse, gym, and concierge services, making this a residence for those who value both privacy and access.',
    features: ['42nd floor views', 'Double-height living room', 'Private terrace with jacuzzi', 'Italian marble', 'Custom millwork', 'Concierge service'],
    amenities: ['Clubhouse', 'Gymnasium', 'Swimming Pool', 'Jacuzzi', 'Concierge', 'Valet Parking', '24/7 Security', 'Power Backup'],
    neighborhood: 'Lower Parel is one of Mumbai\'s most sought-after residential districts, surrounded by fine dining, cultural venues, and corporate offices. The location offers excellent connectivity to both South Mumbai and the western suburbs.',
    tags: ['Skyline View', 'Penthouse', 'Luxury', 'High-Rise'],
    featured: true,
  },
  {
    id: '3',
    slug: 'garden-house-delhi-ncr',
    title: 'Garden House',
    location: 'Golf Links, New Delhi',
    city: 'Delhi NCR',
    price: '₹2.9 Cr',
    priceNumber: 29000000,
    type: 'Villa',
    bedrooms: 3,
    bathrooms: 3,
    area: '3,100 sq ft',
    parking: '2 Covered',
    possession: 'Ready to Move',
    heroImage: '/images/property-garden-1.jpg',
    gallery: [
      '/images/property-garden-1.jpg',
      '/images/property-garden-2.jpg',
      '/images/property-garden-3.jpg',
    ],
    shortDescription: 'An intimate Lutyens-era-style home wrapped in mature trees and morning quiet.',
    description: 'Tucked behind a canopy of neem and jamun trees in one of New Delhi\'s most established neighborhoods, this three-bedroom home offers a rare sense of calm within the city. The interiors feature high ceilings, wooden flooring, and large windows that fill every room with filtered light. The rear garden, with its brick pathway and seating area, serves as a private retreat. The property has been thoughtfully updated with modern plumbing, electrical systems, and a modular kitchen, while preserving its original architectural character.',
    features: ['Tree-lined street', 'Mature garden', 'High ceilings', 'Wooden flooring', 'Updated systems', 'Lutyens-era character'],
    amenities: ['Garden', 'Modular Kitchen', 'AC in all rooms', 'Water purifier', 'Power Backup', 'Security System', 'Servant Quarter', 'Parking for 2'],
    neighborhood: 'Golf Links is a heritage residential enclave near India Gate, known for its tree-lined avenues, embassies, and proximity to Khan Market and Lodi Gardens. The neighborhood is quiet, secure, and well-connected.',
    tags: ['Heritage', 'Garden', 'Central Delhi', 'Premium'],
    featured: true,
  },
  {
    id: '10',
    slug: 'golf-course-penthouse-gurgaon',
    title: 'Golf Course Penthouse',
    location: 'Golf Course Road, Gurgaon',
    city: 'Delhi NCR',
    price: '₹6.8 Cr',
    priceNumber: 68000000,
    type: 'Penthouse',
    bedrooms: 4,
    bathrooms: 4,
    area: '4,500 sq ft',
    parking: '3 Covered',
    possession: 'Ready to Move',
    heroImage: '/images/property-penthouse-2.jpg',
    gallery: [
      '/images/property-penthouse-2.jpg',
      '/images/property-penthouse-1.jpg',
      '/images/property-penthouse-3.jpg',
    ],
    shortDescription: 'A Gurgaon penthouse overlooking the golf course, built for those who want space without leaving the city.',
    description: 'Located on the upper floors of a premium tower along Golf Course Road, this four-bedroom penthouse combines Gurgaon\'s urban energy with an unusual sense of openness. The living room and master suite face directly onto the golf course, offering green views that feel almost rural despite the central location. The interiors feature marble flooring, a designer kitchen with an island, and floor-to-ceiling windows that fill every room with natural light. A private terrace on the upper level includes a sit-out and a small garden area. The building offers a full suite of amenities including a clubhouse, pool, gym, and 24/7 concierge, making it suitable for both families and professionals who value convenience and quality.',
    features: ['Golf course views', 'Private terrace garden', 'Designer kitchen island', 'Marble flooring', 'Floor-to-ceiling windows', 'Concierge service'],
    amenities: ['Clubhouse', 'Swimming Pool', 'Gymnasium', 'Concierge', 'Kids Play Area', '24/7 Security', 'Power Backup', 'Valet Parking'],
    neighborhood: 'Golf Course Road is Gurgaon\'s most premium residential and commercial corridor, home to top restaurants, international schools, corporate offices, and luxury retail. The area offers excellent connectivity to Delhi via the expressway and to the airport via the Dwarka Expressway.',
    tags: ['Golf View', 'Penthouse', 'Gurgaon', 'Premium'],
    featured: true,
  },
  {
    id: '4',
    slug: 'sea-breeze-apartment-mumbai',
    title: 'Sea Breeze Apartment',
    location: 'Worli Sea Face, Mumbai',
    city: 'Mumbai',
    price: '₹6.1 Cr',
    priceNumber: 61000000,
    type: 'Apartment',
    bedrooms: 4,
    bathrooms: 4,
    area: '3,800 sq ft',
    parking: '2 Covered',
    possession: 'Under Construction',
    heroImage: '/images/property-sea-1.jpg',
    gallery: [
      '/images/property-sea-1.jpg',
      '/images/property-sea-2.jpg',
      '/images/property-sea-3.jpg',
    ],
    shortDescription: 'Wake up to the sound of waves in a sea-facing apartment that balances openness with warmth.',
    description: 'This four-bedroom apartment on Worli Sea Face offers uninterrupted views of the Arabian Sea from its west-facing rooms. The open-plan living and dining area opens onto a wide balcony, ideal for evening gatherings against a sunset backdrop. The kitchen is designed with imported stone countertops and integrated appliances. Each bedroom is en-suite, with the master suite featuring a walk-in closet and a sea-facing bathroom. The building includes a rooftop garden, gym, and children\'s play area.',
    features: ['Sea-facing', 'Wide balcony', 'Walk-in closet', 'Imported stone kitchen', 'En-suite bedrooms', 'Rooftop garden access'],
    amenities: ['Rooftop Garden', 'Gymnasium', 'Children\'s Play Area', 'Lobby with Concierge', '24/7 Security', 'Power Backup', 'Intercom', 'Video Door Phone'],
    neighborhood: 'Worli Sea Face is one of Mumbai\'s most iconic residential stretches, offering sea views, proximity to the Bandra-Worli Sea Link, and easy access to South Mumbai\'s business districts and entertainment venues.',
    tags: ['Sea View', 'Under Construction', 'Luxury', 'Worli'],
    featured: true,
  },
  {
    id: '5',
    slug: 'urban-duplex-bangalore',
    title: 'Urban Duplex',
    location: 'Indiranagar, Bangalore',
    city: 'Bangalore',
    price: '₹3.5 Cr',
    priceNumber: 35000000,
    type: 'Duplex',
    bedrooms: 4,
    bathrooms: 3,
    area: '3,400 sq ft',
    parking: '1 Covered + 1 Open',
    possession: 'Ready to Move',
    heroImage: '/images/property-duplex-1.jpg',
    gallery: [
      '/images/property-duplex-1.jpg',
      '/images/property-duplex-2.jpg',
      '/images/property-duplex-3.jpg',
    ],
    shortDescription: 'A duplex that bridges Bangalore\'s cafe culture with the comfort of a private home.',
    description: 'Located on a quiet tree-lined street in Indiranagar, this four-bedroom duplex combines the character of an older Bangalore neighborhood with modern, well-planned interiors. The ground floor features a living room, dining area, and a kitchen that opens to a small courtyard garden. The upper floor holds the bedrooms, with the master suite opening to a private balcony. The interiors use a warm palette of teak, terracotta, and white, creating a home that feels both current and rooted. The location offers walking access to the best cafes, restaurants, and boutiques in the city.',
    features: ['Courtyard garden', 'Private balcony', 'Teak and terracotta interiors', 'Quiet street', 'Walkable neighborhood', 'Natural light'],
    amenities: ['Courtyard', 'Balcony', 'Modular Kitchen', 'AC in bedrooms', 'Water Purifier', 'Power Backup', 'Car Parking', 'Security System'],
    neighborhood: 'Indiranagar is Bangalore\'s most vibrant residential and lifestyle neighborhood, known for its tree-lined streets, independent cafes, boutique stores, and a strong sense of community. The area is well-connected to major tech corridors.',
    tags: ['Duplex', 'Indiranagar', 'Boutique', 'Walkable'],
    featured: true,
  },
  {
    id: '6',
    slug: 'family-estate-pune',
    title: 'Family Estate',
    location: 'Koregaon Park, Pune',
    city: 'Pune',
    price: '₹2.4 Cr',
    priceNumber: 24000000,
    type: 'Villa',
    bedrooms: 3,
    bathrooms: 3,
    area: '2,800 sq ft',
    parking: '2 Covered',
    possession: 'Ready to Move',
    heroImage: '/images/property-family-1.jpg',
    gallery: [
      '/images/property-family-1.jpg',
      '/images/property-family-2.jpg',
      '/images/property-family-3.jpg',
    ],
    shortDescription: 'A family home in Koregaon Park where children can grow up around trees and open space.',
    description: 'This three-bedroom villa sits on a generous corner plot in Koregaon Park, one of Pune\'s most desirable residential areas. The property features a front lawn, a back garden, and a covered sit-out that connects the living room to the outdoors. The interiors are designed for family life, with an open kitchen, a dedicated play area, and bedrooms sized for comfort rather than spectacle. The neighborhood offers some of Pune\'s best schools, parks, and restaurants within a short drive or walk.',
    features: ['Corner plot', 'Front and back garden', 'Covered sit-out', 'Open kitchen', 'Family-friendly layout', 'Near top schools'],
    amenities: ['Garden', 'Sit-out Area', 'Modular Kitchen', 'AC in bedrooms', 'Water Purifier', 'Power Backup', 'Car Parking for 2', 'Security Gate'],
    neighborhood: 'Koregaon Park is a well-established, leafy neighborhood known for its relaxed pace, green cover, and proximity to Pune\'s best schools, hospitals, restaurants, and the Osho Garden. The area retains a quiet, residential character despite its central location.',
    tags: ['Family', 'Garden', 'Koregaon Park', 'Schools Nearby'],
    featured: true,
  },
  {
    id: '7',
    slug: 'heritage-residence-jaipur',
    title: 'Heritage Residence',
    location: 'C-Scheme, Jaipur',
    city: 'Jaipur',
    price: '₹3.8 Cr',
    priceNumber: 38000000,
    type: 'Heritage Home',
    bedrooms: 5,
    bathrooms: 4,
    area: '5,200 sq ft',
    parking: '3 Covered',
    possession: 'Ready to Move',
    heroImage: '/images/property-heritage-1.jpg',
    gallery: [
      '/images/property-heritage-1.jpg',
      '/images/property-heritage-2.jpg',
      '/images/property-heritage-3.jpg',
    ],
    shortDescription: 'A haveli-inspired home where Rajasthani craft meets modern living in the heart of Jaipur.',
    description: 'Inspired by the architectural language of Jaipur\'s traditional havelis, this five-bedroom residence in C-Scheme blends sandstone facade elements, jali screens, and arched doorways with contemporary interiors. The central courtyard, a hallmark of Rajasthani design, brings natural light and ventilation to every room. The interiors feature hand-block printed textiles, local marble, and custom furniture crafted by Jaipur\'s artisans. The rooftop terrace offers views of the Nahargarh Fort and the city\'s pink skyline.',
    features: ['Central courtyard', 'Sandstone facade', 'Jali screen details', 'Rooftop terrace', 'Artisan-crafted furniture', 'Fort views'],
    amenities: ['Central Courtyard', 'Rooftop Terrace', 'Modular Kitchen', 'AC in all rooms', 'Water Purifier', 'Power Backup', 'Parking for 3', 'Staff Room'],
    neighborhood: 'C-Scheme is one of Jaipur\'s most central and well-planned neighborhoods, close to the old city, MI Road, and the diplomatic enclave. The area combines heritage character with modern infrastructure, including top schools and hospitals.',
    tags: ['Heritage', 'Haveli Style', 'Jaipur', 'Artisan'],
    featured: false,
  },
  {
    id: '8',
    slug: 'high-rise-living-hyderabad',
    title: 'High-Rise Living',
    location: 'Jubilee Hills, Hyderabad',
    city: 'Hyderabad',
    price: '₹5.5 Cr',
    priceNumber: 55000000,
    type: 'Apartment',
    bedrooms: 4,
    bathrooms: 4,
    area: '4,000 sq ft',
    parking: '2 Covered',
    possession: 'Under Construction',
    heroImage: '/images/property-highrise-1.jpg',
    gallery: [
      '/images/property-highrise-1.jpg',
      '/images/property-highrise-2.jpg',
      '/images/property-highrise-3.jpg',
    ],
    shortDescription: 'A high-rise apartment in Jubilee Hills where the city stretches out below like a map.',
    description: 'Located on the upper floors of a premium high-rise in Jubilee Hills, this four-bedroom apartment offers commanding views of Hyderabad\'s skyline, including Hussain Sagar Lake. The interiors are designed with a clean, modern aesthetic, featuring large format tiles, a designer kitchen, and floor-to-ceiling windows in every room. The master suite includes a walk-in wardrobe and a spa-like bathroom with a freestanding tub. The building amenities include a clubhouse, infinity pool, and a co-working space.',
    features: ['High-floor views', 'Lake view', 'Designer kitchen', 'Walk-in wardrobe', 'Freestanding tub', 'Co-working space'],
    amenities: ['Clubhouse', 'Infinity Pool', 'Gymnasium', 'Co-working Space', 'Children\'s Play Area', '24/7 Security', 'Concierge', 'Power Backup'],
    neighborhood: 'Jubilee Hills is Hyderabad\'s premier residential neighborhood, known for its wide roads, green cover, proximity to IT hubs, and some of the city\'s finest restaurants and entertainment venues. The area offers a balance of quiet residential living and urban convenience.',
    tags: ['High-Rise', 'Lake View', 'Jubilee Hills', 'Modern'],
    featured: false,
  },
  {
    id: '9',
    slug: 'coastal-retreat-alibaug',
    title: 'Coastal Retreat',
    location: 'Awas, Alibaug',
    city: 'Alibaug',
    price: '₹1.9 Cr',
    priceNumber: 19000000,
    type: 'Weekend Home',
    bedrooms: 3,
    bathrooms: 2,
    area: '2,200 sq ft',
    parking: '1 Covered + 2 Open',
    possession: 'Ready to Move',
    heroImage: '/images/property-coastal-1.jpg',
    gallery: [
      '/images/property-coastal-1.jpg',
      '/images/property-coastal-2.jpg',
      '/images/property-coastal-3.jpg',
    ],
    shortDescription: 'A weekend home where the sound of waves replaces the sound of notifications.',
    description: 'This three-bedroom weekend home in Awas, Alibaug, is designed for those who want to disconnect without going without comfort. The property sits on a quiet lane, a short walk from the beach, and features an open living area that extends onto a covered deck and a small garden. The interiors use natural materials, coastal colors, and simple, comfortable furniture. The kitchen is fully equipped for extended stays, and the bedrooms are arranged for privacy. The property includes a mango tree in the garden and a rooftop area for stargazing.',
    features: ['Near beach', 'Covered deck', 'Mango tree', 'Rooftop area', 'Natural materials', 'Fully equipped kitchen'],
    amenities: ['Garden', 'Deck Area', 'Rooftop Access', 'Fully Equipped Kitchen', 'AC in bedrooms', 'Water Tank', 'Parking', 'Security Grills'],
    neighborhood: 'Awas is a quiet coastal village in Alibaug, known for its clean beaches, casuarina groves, and a growing community of weekend homeowners from Mumbai and Pune. The area is accessible by road and ferry, making it convenient for regular weekend getaways.',
    tags: ['Weekend Home', 'Beach', 'Alibaug', 'Coastal'],
    featured: false,
  },
];

export function getAllProperties(): Property[] {
  return properties;
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getSimilarProperties(currentSlug: string, limit: number = 3): Property[] {
  const current = getPropertyBySlug(currentSlug);
  if (!current) return properties.slice(0, limit);
  return properties
    .filter((p) => p.slug !== currentSlug && (p.city === current.city || p.type === current.type))
    .slice(0, limit);
}

export function filterProperties(filters: {
  city?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  search?: string;
  sort?: 'price-asc' | 'price-desc' | 'newest';
}): Property[] {
  let result = [...properties];

  if (filters.city) {
    result = result.filter((p) => p.city === filters.city);
  }
  if (filters.type) {
    result = result.filter((p) => p.type === filters.type);
  }
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.priceNumber >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.priceNumber <= filters.maxPrice!);
  }
  if (filters.bedrooms !== undefined) {
    result = result.filter((p) => p.bedrooms >= filters.bedrooms!);
  }
  if (filters.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.location.toLowerCase().includes(s) ||
        p.city.toLowerCase().includes(s) ||
        p.shortDescription.toLowerCase().includes(s)
    );
  }

  if (filters.sort === 'price-asc') {
    result.sort((a, b) => a.priceNumber - b.priceNumber);
  } else if (filters.sort === 'price-desc') {
    result.sort((a, b) => b.priceNumber - a.priceNumber);
  }

  return result;
}

export const cities = [...new Set(properties.map((p) => p.city))];
export const propertyTypes = [...new Set(properties.map((p) => p.type))];