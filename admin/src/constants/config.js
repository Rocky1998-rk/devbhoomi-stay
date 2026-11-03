import imgLansdowneRidge from "../assets/destinations/lansdowne-ridge.jpg";
import imgKotdwarGateway from "../assets/destinations/kotdwar-gateway.jpg";
import imgGarhwalPeaks from "../assets/destinations/garhwal-peaks.jpg";

// Global configuration constants for DevBhoomi Stay

export const BRAND_CONFIG = {
  name: "DevBhoomi Stay",
  tagline: "Explore. Stay. Experience Uttarakhand.",
  destinations: ["Lansdowne", "Kotdwar", "Uttarakhand"],
  copyright: "© 2026 DevBhoomi Stay. All rights reserved.",
  locationSummary: "Lansdowne • Kotdwar • Uttarakhand",
  regionCoverage: "Serving travellers across Uttarakhand, India",
  supportEmail: "info@devbhoomistay.com", // Fallback or configurable
};

// WhatsApp Integration Configuration
// If environment variable is set (VITE_WHATSAPP_NUMBER), use it; otherwise fallback to direct WhatsApp web intent
export const WHATSAPP_CONFIG = {
  phoneNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "",
  defaultMessage: "Hi DevBhoomi Stay, I'm looking for a hotel stay in Uttarakhand.",
  getLink: (customMessage) => {
    const phone = import.meta.env.VITE_WHATSAPP_NUMBER || "";
    const msg = encodeURIComponent(customMessage || WHATSAPP_CONFIG.defaultMessage);
    if (phone) {
      return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${msg}`;
    }
    return `https://wa.me/?text=${msg}`;
  },
  getHotelInquiryLink: (hotelName, city) => {
    const text = `Hi DevBhoomi Stay, I would like to inquire about booking a stay at ${hotelName}${city ? ` in ${city}` : ""}.`;
    return WHATSAPP_CONFIG.getLink(text);
  }
};

// Cinematic Hero Background Video URL (Local Himalayan Drone video in public folder)
export const HERO_VIDEO_URL = "/drone-himalayas.mp4";

// Boutique Hotels Page Hero Background Image
export const HOTELS_HERO_IMAGE = "/hotels-hero-bg.jpg";

// High-quality fallback poster & authentic imagery for destinations
export const HERO_POSTER_IMAGE = imgLansdowneRidge;

export const DESTINATIONS_DATA = [
  {
    id: "lansdowne",
    name: "Lansdowne",
    tagline: "Quiet pine forests, peaceful roads and refreshing mountain views.",
    badge: "Most Loved",
    image: imgLansdowneRidge,
    alt: "Pine forest mountain road and misty hill valley in Lansdowne",
    altitude: "1,706 m",
    highlights: ["Pine & Oak Trails", "Tip-in-Top Views", "Colonial Serenity"]
  },
  {
    id: "kotdwar",
    name: "Kotdwar",
    tagline: "A convenient gateway between the plains and the hills.",
    badge: "Gateway City",
    image: imgKotdwarGateway,
    alt: "River valley foothills and green approach to Kotdwar hills",
    altitude: "450 m",
    highlights: ["Sidhbali Temple", "Scenic Riverbed", "Direct Hill Access"]
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    tagline: "Discover stays across one of India's most beautiful mountain regions.",
    badge: "All Regions",
    image: imgGarhwalPeaks,
    alt: "Snow-capped Himalayan peaks and alpine meadows across Uttarakhand",
    altitude: "Himalayan Belt",
    highlights: ["Scenic Valleys", "Handpicked Stays", "Local Guidance"]
  }
];

// Curated verified stays for initial showcase (matching backend Hotel schema)
export const CURATED_HOTELS = [
  {
    _id: "stay_001",
    hotelName: "Pine Crest Heritage Retreat",
    hotelType: "Deluxe Hotel",
    city: "Lansdowne",
    state: "Uttarakhand",
    address: "Near Tip-in-Top Point, Lansdowne, Pauri Garhwal",
    description: "Perched amidst dense pine groves with panoramic views of snow-clad Garhwal peaks and tranquil forest trails.",
    price: 3800,
    rating: 4.8,
    reviewsCount: 42,
    isFeatured: true,
    coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["Mountain View Balcony", "Free Wi-Fi", "In-House Dining", "Bonfire Area", "Free Parking"],
    checkInTime: "12:00 PM",
    checkOutTime: "11:00 AM",
    roomTypes: ["Valley View Deluxe", "Family Suite"]
  },
  {
    _id: "stay_002",
    hotelName: "Garhwal Gateway Inn",
    hotelType: "Budget Hotel",
    city: "Kotdwar",
    state: "Uttarakhand",
    address: "Station Road, Near Khoh River, Kotdwar",
    description: "A welcoming, comfortable transit stay with modern essentials, ample parking, and easy connectivity to hill routes.",
    price: 1850,
    rating: 4.5,
    reviewsCount: 28,
    isFeatured: false,
    coverImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["Free Wi-Fi", "Air Conditioned", "24/7 Front Desk", "Secure Parking", "Room Service"],
    checkInTime: "12:00 PM",
    checkOutTime: "11:00 AM",
    roomTypes: ["Standard Room", "Executive Suite"]
  },
  {
    _id: "stay_003",
    hotelName: "Oakwood Valley Homestay",
    hotelType: "Homestay",
    city: "Lansdowne",
    state: "Uttarakhand",
    address: "Tarkeshwar Road, Upper Lansdowne",
    description: "Authentic Garhwali hospitality with home-cooked mountain meals, private garden terrace, and peaceful nature walks.",
    price: 2600,
    rating: 4.9,
    reviewsCount: 35,
    isFeatured: true,
    coverImage: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["Home Cooked Meals", "Terrace Garden", "Pet Friendly", "Nature Walks", "High Speed Wi-Fi"],
    checkInTime: "01:00 PM",
    checkOutTime: "11:00 AM",
    roomTypes: ["Cozy Wood Cabin", "Garden Cottage"]
  },
  {
    _id: "stay_004",
    hotelName: "The Himalayan Horizon Sanctuary",
    hotelType: "Luxury Hotel",
    city: "Lansdowne",
    state: "Uttarakhand",
    address: "Bhallu Farm Ridge, Lansdowne Forest Range",
    description: "Boutique luxury resort featuring private heated decks, spa therapies, open sky dining, and 360-degree Himalayan vistas.",
    price: 6500,
    rating: 4.9,
    reviewsCount: 54,
    isFeatured: true,
    coverImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["Infinity Mountain Deck", "Spa & Wellness", "Gourmet Restaurant", "Fireplace Lounge", "Concierge"],
    checkInTime: "02:00 PM",
    checkOutTime: "11:00 AM",
    roomTypes: ["Himalayan View Suite", "Private Valley Villa"]
  },
  {
    _id: "stay_005",
    hotelName: "Khoh Riverview Boutique Stay",
    hotelType: "Deluxe Hotel",
    city: "Kotdwar",
    state: "Uttarakhand",
    address: "Badrinath Marg, Riverside Sector, Kotdwar",
    description: "Riverside boutique hotel offering peaceful river breeze, spacious modern rooms, and quick access to Lansdowne road.",
    price: 2950,
    rating: 4.6,
    reviewsCount: 19,
    isFeatured: false,
    coverImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["River View", "Multi-Cuisine Cafe", "Fast Wi-Fi", "Free Parking", "Power Backup"],
    checkInTime: "12:00 PM",
    checkOutTime: "11:00 AM",
    roomTypes: ["Deluxe River View", "Family Suite"]
  },
  {
    _id: "stay_006",
    hotelName: "Misty Pine Cliff Lodge",
    hotelType: "Deluxe Hotel",
    city: "Lansdowne",
    state: "Uttarakhand",
    address: "Old Cantonment Edge, Lansdowne",
    description: "Charming stone and wood lodge situated along the pine cliff line with birdsong mornings and sunset tea verandas.",
    price: 4200,
    rating: 4.7,
    reviewsCount: 31,
    isFeatured: false,
    coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["Sunset Veranda", "Bonfire Evenings", "Tea Lounge", "Breakfast Included", "Forest Trails"],
    checkInTime: "12:00 PM",
    checkOutTime: "11:00 AM",
    roomTypes: ["Pine View Deluxe", "Attic Suite"]
  }
];
