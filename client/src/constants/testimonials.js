import imgLansdowneRidge from "../assets/destinations/lansdowne-ridge.jpg";
import imgKotdwarGateway from "../assets/destinations/kotdwar-gateway.jpg";
import imgPineTrails from "../assets/destinations/pine-trails.jpg";
import imgTipInTop from "../assets/destinations/tip-in-top.jpg";
import imgCottageEscape from "../assets/destinations/cottage-escape.jpg";
import imgGarhwalPeaks from "../assets/destinations/garhwal-peaks.jpg";
import imgMountainResort from "../assets/destinations/mountain-resort.jpg";
import imgVerifiedStay from "../assets/destinations/verified-stay.jpg";

/**
 * Guest Reviews / Testimonials data layer.
 *
 * The section is fully data-driven: pass any array of review objects and it
 * renders. Demo content below is layout/sample data only.
 *
 * To connect a real backend:
 *   <TestimonialsSection data={reviews} />
 * normalizeTestimonials() maps an API payload onto the exact fields the
 * components consume, with safe fallbacks for missing values.
 */

// Carousel behaviour (autoplay is the primary interaction; arrows are optional)
export const TESTIMONIALS_CONFIG = {
  autoplayInterval: 4500, // ms between automatic slide changes
  swipeThreshold: 45, // px horizontal travel required to register a swipe
};

/**
 * Review shape (also the API contract):
 * {
 *   id, guestName, initials, location, hotelName, rating,
 *   review, stayDate, image, verified, propertyImage, propertyImageAlt
 * }
 *
 * `rating` supports one decimal (5, 4.9, 4.8, 4.7, 4.5) and is rendered as
 * an exact proportional star fill — never rounded up to a misleading full star.
 */
export const TESTIMONIALS_DATA = [
  {
    id: "review_001",
    guestName: "Rocky Mehta",
    initials: "RM",
    location: "Lansdowne",
    hotelName: "Pine Crest Heritage Retreat",
    rating: 5,
    review:
      "Everything felt simple from the moment we found the property. The stay was peaceful, the room was exactly as shown in the photos, and the WhatsApp support made the booking process really easy. They also suggested a short morning walk up to Tip-in-Top, which turned out to be the best part of our trip.",
    stayDate: "Stayed in August 2026",
    image: null,
    verified: true,
    verifiedStay: true,
    propertyImage: imgLansdowneRidge,
    propertyImageAlt: "Pine ridge morning view from a heritage stay in Lansdowne",
  },
  {
    id: "review_002",
    guestName: "Ananya Deshmukh",
    initials: "AD",
    location: "Mussoorie",
    hotelName: "Mall Road Heritage Homestay",
    rating: 4.5,
    review:
      "The family hosting us made us feel at home rather than like guests. Breakfast was simple but very fresh, and they arranged a taxi at short notice when we had to change our plans. Only note — the hill road down is narrow, so keep some buffer time.",
    stayDate: "Stayed in July 2026",
    image: null,
    verified: true,
    verifiedStay: true,
    propertyImage: imgCottageEscape,
    propertyImageAlt: "Cottage balcony with valley views in Mussoorie",
  },
  {
    id: "review_003",
    guestName: "Imran Qureshi",
    initials: "IQ",
    location: "Kotdwar",
    hotelName: "Garhwal Gateway Inn",
    rating: 4.5,
    review:
      "Clean rooms and a comfortable bed after a long drive from Delhi. The Wi-Fi was slow in the evening, though the staff got it sorted by morning. Parking is right outside the building and check-in took less than five minutes.",
    stayDate: "Stayed recently",
    image: null,
    verified: true,
    verifiedStay: true,
    propertyImage: imgKotdwarGateway,
    propertyImageAlt: "Foothill gateway stay near Kotdwar",
  },
  {
    id: "review_004",
    guestName: "Sneha Iyer",
    initials: "SI",
    location: "Rishikesh",
    hotelName: "Ganga Riverside Cottage",
    rating: 5,
    review:
      "I messaged on WhatsApp on a Sunday evening and had confirmation within minutes, which was a real relief. The cottage itself is quiet, a short walk from the river path, and the evening tea they sent up was genuinely lovely.",
    stayDate: "Stayed in June 2026",
    image: null,
    verified: true,
    verifiedStay: true,
    propertyImage: imgPineTrails,
    propertyImageAlt: "Riverside cottage garden in Rishikesh",
  },
  {
    id: "review_005",
    guestName: "Karthik Nair",
    initials: "KN",
    location: "Dhanaulti",
    hotelName: "Skyline Pine View Resort",
    rating: 4.8,
    review:
      "We went for two nights with my parents and it worked well for everyone. The rooms were warm, the balcony view stayed clear even when the clouds came in, and the team called ahead to check our preference for early breakfast. We will come back in winter.",
    stayDate: "Stayed in May 2026",
    image: null,
    verified: true,
    verifiedStay: true,
    propertyImage: imgTipInTop,
    propertyImageAlt: "Mountain view from a pine balcony in Dhanaulti",
  },
  {
    id: "review_006",
    guestName: "Priya Rawat",
    initials: "PR",
    location: "Nainital",
    hotelName: "Khurpatal Garden Homestay",
    rating: 5,
    review:
      "It is a homestay rather than a hotel, and that is exactly why we liked it. Meals were home-cooked Kumaoni food, and we spent most of the evening on the terrace. Ask them to keep a taxi on call for the Mall Road — it saves a lot of backtracking.",
    stayDate: "Stayed recently",
    image: null,
    verified: true,
    verifiedStay: true,
    propertyImage: imgVerifiedStay,
    propertyImageAlt: "Family homestay garden overlooking Nainital",
  },
  {
    id: "review_007",
    guestName: "Manish Aggarwal",
    initials: "MA",
    location: "Kanatal",
    hotelName: "Kanatal Valley View Cottage",
    rating: 4.7,
    review:
      "Good location for the sunrise viewpoint and the room was clean, with the photos matching what we actually saw. Breakfast is served at a fixed 8 am, so plan around it if you want an early walk. Staff is helpful and unhurried.",
    stayDate: "Stayed in March 2026",
    image: null,
    verified: true,
    verifiedStay: true,
    propertyImage: imgGarhwalPeaks,
    propertyImageAlt: "Himalayan valley stay near Kanatal",
  },
  {
    id: "review_008",
    guestName: "Aditi Sharma",
    initials: "AS",
    location: "Chakrata",
    hotelName: "Chakrata Riverside Homestay",
    rating: 4.5,
    review:
      "We stopped here on our way up and ended up staying two nights. The room faced the river, so mornings were quiet. The coordinator shared the tariff directly on WhatsApp and there was nothing extra added at checkout.",
    stayDate: "Stayed in September 2026",
    image: null,
    verified: true,
    verifiedStay: true,
    propertyImage: imgMountainResort,
    propertyImageAlt: "Riverside homestay near Chakrata",
  },
];

/**
 * Trust summary figures.
 * These are the project's current placeholder aggregates — swap in live values
 * from the reviews API before launch rather than inventing new claims.
 */
export const GUEST_TRUST_SUMMARY = {
  label: "Trusted by travellers exploring Uttarakhand",
  supportLabel: "Chat with us on WhatsApp",
  supportMessage:
    "Hi DevBhoomi Stay, I have a few questions before booking a stay in Uttarakhand.",
  isPlaceholder: true,
  stats: [
    {
      id: "guest_rating",
      icon: "rating",
      countTo: 4.8,
      decimals: 1,
      suffix: "/5",
      label: "Guest Rating",
    },
    {
      id: "stay_experiences",
      icon: "stays",
      countTo: 500,
      decimals: 0,
      suffix: "+",
      label: "Stay Experiences",
    },
    {
      id: "verified_properties",
      icon: "verified",
      countTo: 100,
      decimals: 0,
      suffix: "%",
      label: "Verified Properties",
    },
  ],
};

const deriveInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "G";

/**
 * Maps any review payload (API response or demo constants) onto the exact shape
 * the testimonial components expect. Legacy field names are accepted as aliases
 * so an existing backend contract keeps working.
 */
export const normalizeTestimonials = (list = []) =>
  (Array.isArray(list) ? list : [])
    .filter(Boolean)
    .map((item, index) => {
      const guestName = item.guestName ?? item.name ?? "DevBhoomi Guest";
      const location = item.location ?? item.destination ?? "Uttarakhand";
      const hotelName = item.hotelName ?? item.property ?? "";
      const rating = Number(item.rating);

      return {
        id: item.id ?? `review_${index + 1}`,
        guestName,
        initials: item.initials ?? deriveInitials(guestName),
        location,
        hotelName,
        rating: Number.isFinite(rating) ? Math.min(5, Math.max(0, rating)) : 5,
        review: item.review ?? "",
        stayDate: item.stayDate ?? "Stayed recently",
        image: item.image ?? null,
        verified: item.verified !== false,
        verifiedStay: item.verifiedStay !== false,
        propertyImage: item.propertyImage ?? null,
        propertyImageAlt:
          item.propertyImageAlt ??
          `View from ${hotelName || "a verified stay"} in ${location}`,
      };
    });
