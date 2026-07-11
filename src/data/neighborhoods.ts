export type Neighborhood = {
  name: string;
  slug: string;
  image: string;
  tagline: string;
  description: string;
  bestFor: string[];
  propertyTypes: string[];
  lifestyleTags: string[];
  priceRange: string;
};

export const neighborhoods: Neighborhood[] = [
  {
    name: 'Delhi NCR',
    slug: 'delhi-ncr',
    image: '/images/neighborhood-delhi.jpg',
    tagline: 'Where heritage avenues meet contemporary living.',
    description: 'Delhi NCR offers a remarkable range of residential options, from heritage properties in Lutyens\' Delhi to modern high-rises in Gurgaon and Noida. The region combines cultural depth with infrastructure, offering world-class schools, hospitals, dining, and entertainment. Each neighborhood has a distinct character: the quiet elegance of Golf Links, the diplomatic calm of Chanakyapuri, the corporate energy of Gurgaon, or the planned comfort of Noida. For buyers who value access to power, culture, and community, Delhi NCR remains one of India\'s most significant real estate markets.',
    bestFor: ['Families', 'Diplomats', 'Business Leaders', 'Culture Enthusiasts'],
    propertyTypes: ['Villas', 'Apartments', 'Penthouses', 'Builder Floors'],
    lifestyleTags: ['Heritage', 'Fine Dining', 'Art Galleries', 'Green Spaces', 'Metro Connected'],
    priceRange: '₹1.5 Cr — ₹15 Cr+',
  },
  {
    name: 'Mumbai',
    slug: 'mumbai',
    image: '/images/neighborhood-mumbai.jpg',
    tagline: 'The city that never stops, viewed from your living room.',
    description: 'Mumbai\'s real estate market is defined by its geography: sea-facing apartments in Worli, heritage flats in South Mumbai, and sprawling penthouses in Lower Parel and Bandra. The city\'s energy is unmatched in India, and its premium properties offer not just homes but addresses that carry weight. From the art deco buildings of Marine Drive to the glass towers of BKC, Mumbai\'s residential landscape rewards those who value location above all else. The city offers proximity to India\'s financial capital, its entertainment industry, and a food scene that spans every cuisine and budget.',
    bestFor: ['Investors', 'Corporate Professionals', 'Sea View Seekers', 'Urbanites'],
    propertyTypes: ['Apartments', 'Penthouses', 'Sea-Facing Units', 'Luxury Towers'],
    lifestyleTags: ['Sea Views', 'Nightlife', 'Finance Hub', 'Art Deco', 'Street Food'],
    priceRange: '₹2 Cr — ₹25 Cr+',
  },
  {
    name: 'Goa',
    slug: 'goa',
    image: '/images/neighborhood-goa.jpg',
    tagline: 'A slower pace, a wider horizon.',
    description: 'Goa\'s residential market has evolved far beyond holiday homes. Today, the state attracts remote workers, creative professionals, and retirees who want to live near the sea without sacrificing quality of life. Areas like Siolim, Assagao, and Parra offer a quiet, leafy lifestyle with easy access to beaches, restaurants, and an international community. Properties range from restored Portuguese villas to contemporary glass homes. Goa\'s real estate appeal lies in its combination of natural beauty, relaxed regulations for outsiders, and a cultural atmosphere that is hard to replicate elsewhere in India.',
    bestFor: ['Remote Workers', 'Retirees', 'Creative Professionals', 'Second Home Buyers'],
    propertyTypes: ['Villas', 'Portuguese Homes', 'Contemporary Houses', 'Plots'],
    lifestyleTags: ['Beaches', 'Cafes', 'International Community', 'Nature', 'Nightlife'],
    priceRange: '₹80 Lakh — ₹10 Cr+',
  },
  {
    name: 'Bangalore',
    slug: 'bangalore',
    image: '/images/neighborhood-bangalore.jpg',
    tagline: 'Tech corridors and tree-canopied neighborhoods.',
    description: 'Bangalore\'s real estate market is shaped by its role as India\'s technology capital. Premium neighborhoods like Indiranagar, Koramangala, and Whitefield offer a lifestyle that blends urban convenience with green, walkable streets. The city\'s climate, cafe culture, and international airport access make it a natural choice for tech professionals, entrepreneurs, and returning NRIs. Bangalore\'s property market also offers strong rental yields and appreciation potential, particularly in areas near major tech parks. The city continues to grow outward, with new developments in Devanahalli, North Bangalore, and the suburbs offering larger plots and villas at more accessible price points.',
    bestFor: ['Tech Professionals', 'NRIs', 'Entrepreneurs', 'Families'],
    propertyTypes: ['Apartments', 'Villas', 'Duplexes', 'Penthouses', 'Plots'],
    lifestyleTags: ['Cafe Culture', 'Tech Hub', 'Parks', 'International Airport', 'Mild Climate'],
    priceRange: '₹80 Lakh — ₹12 Cr+',
  },
  {
    name: 'Pune',
    slug: 'pune',
    image: '/images/neighborhood-pune.jpg',
    tagline: 'A city that takes its time, and rewards those who do.',
    description: 'Pune has quietly become one of India\'s most livable cities, attracting families, students, and professionals who want quality of life without Mumbai\'s intensity. Neighborhoods like Koregaon Park, Kalyani Nagar, and Hinjewadi offer a range of residential options, from luxury villas to modern apartments. The city\'s real estate market is supported by a strong IT sector, excellent educational institutions, and a cultural scene that includes music, theater, and food. Pune\'s weather, relatively lower property prices compared to Mumbai, and growing infrastructure make it an increasingly popular choice for long-term residents.',
    bestFor: ['Families', 'IT Professionals', 'Students', 'Retirees'],
    propertyTypes: ['Villas', 'Apartments', 'Row Houses', 'Plots'],
    lifestyleTags: ['Education Hub', 'IT Parks', 'Food Scene', 'Parks', 'Cultural Events'],
    priceRange: '₹50 Lakh — ₹6 Cr+',
  },
  {
    name: 'Hyderabad',
    slug: 'hyderabad',
    image: '/images/neighborhood-hyderabad.jpg',
    tagline: 'Old city soul, new city skyline.',
    description: 'Hyderabad offers one of the best value-to-quality ratios in Indian real estate. Premium neighborhoods like Jubilee Hills, Banjara Hills, and HITEC City combine large properties, modern amenities, and a relatively affordable price point compared to Mumbai or Delhi. The city\'s real estate market has been boosted by its growing status as a tech and pharma hub, attracting professionals from across India. Hyderabad\'s food culture, historical sites, and lakeside locations add a quality of life dimension that goes beyond the property itself. For investors, the city offers strong rental demand and steady appreciation in prime areas.',
    bestFor: ['IT Professionals', 'Investors', 'Families', 'Food Enthusiasts'],
    propertyTypes: ['Apartments', 'Villas', 'Penthouses', 'Gated Community Plots'],
    lifestyleTags: ['Tech Hub', 'Lake Views', 'Biryani Capital', 'Historic Sites', 'Affordable Luxury'],
    priceRange: '₹60 Lakh — ₹10 Cr+',
  },
];

export function getAllNeighborhoods(): Neighborhood[] {
  return neighborhoods;
}

export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}