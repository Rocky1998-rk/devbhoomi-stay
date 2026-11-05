import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import OwnerHeroBanner from "../components/OwnerHeroBanner";
import AddHotelModal from "../components/modals/AddHotelModal";
import {
  FiEye,
  FiEdit3,
  FiPlus,
  FiExternalLink,
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe,
  FiCalendar,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiCamera,
  FiCheck,
  FiCoffee,
  FiShield,
  FiClock,
  FiWifi,
  FiTv,
  FiTag,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";

/* SVG Custom Bed Icon */
const BedIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
  </svg>
);

/* SVG Layers / Categories Icon */
const LayersIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

/* SVG Users Capacity Icon */
const UsersCapacityIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/* SVG Building / Floors Icon */
const BuildingFloorsIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01M12 6h.01M12 10h.01M12 14h.01" />
  </svg>
);

const hotelImages = [
  {
    id: 1,
    title: "Hotel Front & Exterior",
    category: "Front Exterior",
    url: "/images/hotel-front.jpg",
    fallback: "/images/destinations/mountain-resort.jpg",
  },
  {
    id: 2,
    title: "Deluxe Bedroom Suite",
    category: "Deluxe Room",
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    fallback: "/images/destinations/cottage-escape.jpg",
  },
  {
    id: 3,
    title: "Executive Suite Room",
    category: "Suite Room",
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    fallback: "/images/destinations/tip-in-top.jpg",
  },
  {
    id: 4,
    title: "Hotel Ground & Garden Lawn",
    category: "Ground & Garden",
    url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
    fallback: "/images/destinations/verified-stay.jpg",
  },
  {
    id: 5,
    title: "Pine Forest & Valley View",
    category: "Forest View",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    fallback: "/images/destinations/pine-trails.jpg",
  },
  {
    id: 6,
    title: "Modern Luxury Washroom",
    category: "Washroom",
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    title: "Private Mountain View Balcony",
    category: "Balcony View",
    url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80",
    fallback: "/images/destinations/lansdowne-ridge.jpg",
  },
  {
    id: 8,
    title: "In-House Dining Restaurant",
    category: "Dining Restaurant",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    fallback: "/images/destinations/garhwal-peaks.jpg",
  },
  {
    id: 9,
    title: "Evening Bonfire & Lawn Sit-out",
    category: "Bonfire Ground",
    url: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80",
    fallback: "/hotels-hero-bg.jpg",
  },
  {
    id: 10,
    title: "Reception & Guest Lobby",
    category: "Lobby & Reception",
    url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    fallback: "/images/destinations/mountain-resort.jpg",
  },
];

const MyHotel = () => {
  const outletCtx = useOutletContext() || {};
  const { selectedHotel } = useAuth();

  const [hotelData, setHotelData] = useState({
    name: selectedHotel?.name || "The Pine Retreat",
    hotelType: "Boutique Hotel",
    city: "Lansdowne",
    state: "Uttarakhand",
    country: "India",
    pincode: "246155",
    address: "Bhulia Basti, Lansdowne, Pauri Garhwal, Uttarakhand - 246155",
    googleMapsUrl: "https://maps.google.com/?q=29.8377,78.6871",
    phone: "+91 98765 43210",
    email: "pine@devbhoomistay.com",
    website: "https://www.devbhoomistay.com",
    checkInTime: "12:00 PM",
    checkOutTime: "11:00 AM",
    description:
      "Nestled amidst whispering pine forests with breathtaking views of the Garhwal Himalayas. The Pine Retreat offers boutique luxury, authentic Garhwali hospitality, warm bonfires, and stargazing from private balconies.",
    totalRooms: "12",
    roomCategories: "4",
    guestCapacity: "2 – 6",
    floors: "2",
    rating: "4.6",
    reviewsCount: 128,
    policies: {
      checkInOutPolicy:
        "Standard check-in starts at 12:00 PM and check-out is by 11:00 AM. Government ID verification is required for all adult guests.",
      cancellationPolicy:
        "Free cancellation up to 48 hours before check-in date. Cancellations within 48 hours forfeit the 25% advance token deposit.",
      quietHoursPolicy:
        "Quiet hours are observed between 10:00 PM – 07:00 AM. Evening bonfires are held in the designated lawn area weather permitting.",
    },
    amenities: [
      "High-Speed WiFi",
      "Free Parking",
      "Mountain View",
      "24x7 Hot Water / Geyser",
      "Bonfire & Barbecue",
      "Lawn & Garden",
      "In-House Kitchen",
      "Room Service",
      "Power Backup",
      "Caretaker On-Site",
    ],
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % hotelImages.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + hotelImages.length) % hotelImages.length
    );
  };

  const handleSaveHotelData = (updatedData) => {
    setHotelData((prev) => ({
      ...prev,
      ...updatedData,
      name: updatedData.name || updatedData.hotelName || prev.name,
      hotelName: updatedData.name || updatedData.hotelName || prev.name,
    }));
  };

  return (
    <div className="min-h-screen bg-[#F4F6FC] font-['Inter',_sans-serif]">
      {/* 1. Top Panoramic Mountain Hero Banner (Matching Reference Image) */}
      <OwnerHeroBanner onMenuClick={outletCtx.onMenuClick} />

      {/* 2. Main Content Container */}
      <div className="px-3 sm:px-2 py-3 space-y-3.5 w-full">
        {/* Page Header: Title + Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-1.5">
          <div>
            <h1 className="text-[20px] sm:text-[22px] font-bold text-[#17233D] tracking-tight">
              My Hotel – Property Profile
            </h1>
            <p className="text-[11.5px] text-[#64748B] mt-0.5">
              Manage your hotel details, photos, amenities and operational information.
            </p>
          </div>

          {/* Action Buttons: View on Website, Add Hotel (User Requested), Edit Profile */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* <button
              onClick={() => window.open("/", "_blank")}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-[#E2E8F0] text-[#1E293B] font-semibold text-xs flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
            >
              <FiEye className="w-4 h-4 text-[#64748B]" />
              <span>View on Website</span>
              <FiExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
            </button> */}

            {/* Added "+ Add Hotel" button as explicitly requested by user */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#0E4D3C] hover:bg-[#072B22] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add Hotel</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#3B6EF5] hover:bg-[#2563EB] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <FiEdit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* 3. Middle Section: Gallery Card (Left) + Hotel Overview Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-stretch">
          {/* Left Column (5 Cols): Main Image + Thumbnails */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-3 sm:p-2 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
            {/* Main Interactive Photo Display */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 group shadow-2xs">
              <img
                src={hotelImages[activeImageIndex].url}
                alt={hotelImages[activeImageIndex].title}
                onError={(e) => {
                  if (e.target.dataset.triedFallback !== "true") {
                    e.target.dataset.triedFallback = "true";
                    e.target.src =
                      hotelImages[activeImageIndex].fallback ||
                      "/images/hotel-front.jpg";
                  }
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />

              {/* "Active" Status Badge (Top-Right) */}
              <span className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-[#16A36A] text-white text-[11px] font-bold shadow-xs">
                Active
              </span>

              {/* Photo Counter & Category Pill (Bottom-Left) */}
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 flex-wrap max-w-[85%]">
                <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-xs shrink-0">
                  <FiCamera className="w-3.5 h-3.5" />
                  <span>
                    {activeImageIndex + 1} / {hotelImages.length}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-xs truncate">
                  <FiTag className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">
                    {hotelImages[activeImageIndex].title}
                  </span>
                </span>
              </div>

              {/* Left / Right Carousel Controls */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1E293B] shadow-md flex items-center justify-center transition-all cursor-pointer opacity-80 hover:opacity-100"
                aria-label="Previous photo"
              >
                <FiChevronLeft className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1E293B] shadow-md flex items-center justify-center transition-all cursor-pointer opacity-80 hover:opacity-100"
                aria-label="Next photo"
              >
                <FiChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Thumbnails Row (4 images + 1 "+6" more overlay) */}
            <div className="grid grid-cols-5 gap-2 mt-2.5">
              {hotelImages.slice(0, 4).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  title={item.title}
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "ring-2 ring-[#3B6EF5] ring-offset-1 shadow-xs"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    onError={(e) => {
                      if (e.target.dataset.triedFallback !== "true") {
                        e.target.dataset.triedFallback = "true";
                        e.target.src = item.fallback;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-0.5 px-0.5 text-[8.5px] text-white truncate text-center font-medium">
                    {item.category}
                  </div>
                </button>
              ))}

              {/* 5th Thumbnail with "+6" Dark Overlay */}
              <button
                onClick={() =>
                  setActiveImageIndex(
                    activeImageIndex >= 4
                      ? (activeImageIndex + 1) % hotelImages.length
                      : 4
                  )
                }
                title="View all 10 hotel photos"
                className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 transition-all cursor-pointer group"
              >
                <img
                  src={hotelImages[4].url}
                  alt={hotelImages[4].title}
                  onError={(e) => {
                    if (e.target.dataset.triedFallback !== "true") {
                      e.target.dataset.triedFallback = "true";
                      e.target.src = hotelImages[4].fallback;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-[#111C35]/85 text-white flex flex-col items-center justify-center font-bold text-xs">
                  <span>+{hotelImages.length - 4}</span>
                  <span className="text-[8.5px] font-medium text-slate-300">
                    More
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column (7 Cols): Hotel Title, Address, Reviews, Contacts, 4 Metric Cards */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-3.5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
            <div>
              {/* Hotel Name + Category Badge */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-[20px] sm:text-[22px] font-extrabold text-[#17233D] tracking-tight">
                  {hotelData.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFF3E5] text-[#D97706] text-[11px] font-bold border border-[#FDE68A]/60 whitespace-nowrap">
                  {hotelData.hotelType}
                </span>
              </div>

              {/* Physical Address Line */}
              <div className="flex items-center gap-1.5 text-xs text-[#475569] font-medium mt-1.5">
                <FiMapPin className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                <span>{hotelData.address}</span>
              </div>

              {/* Star Ratings & Review Count */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex items-center text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-[#17233D] text-xs">
                  {hotelData.rating}
                </span>
                <span className="text-xs text-[#64748B]">
                  ({hotelData.reviewsCount} Reviews)
                </span>
              </div>
            </div>

            {/* 2-Column Contact Info & Check-In Timings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 py-3.5 border-y border-[#F1F5F9] my-2 text-xs">
              {/* Left Contacts */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#475569]">
                  <FiPhone className="w-3.5 h-3.5 text-[#3B6EF5] shrink-0" />
                  <span className="font-semibold text-[#17233D]">
                    {hotelData.phone}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#475569]">
                  <FiMail className="w-3.5 h-3.5 text-[#3B6EF5] shrink-0" />
                  <span className="font-medium text-[#475569]">
                    {hotelData.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiGlobe className="w-3.5 h-3.5 text-[#3B6EF5] shrink-0" />
                  <a
                    href={hotelData.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#3B6EF5] hover:underline flex items-center gap-1"
                  >
                    <span>{hotelData.website.replace(/^https?:\/\//, "")}</span>
                    <FiExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Right Timings */}
              <div className="space-y-2.5 sm:pl-2">
                <div className="flex items-center gap-2 text-[#475569]">
                  <FiCalendar className="w-3.5 h-3.5 text-[#3B6EF5] shrink-0" />
                  <span className="text-[#64748B]">Check-In :</span>
                  <span className="font-bold text-[#17233D]">
                    {hotelData.checkInTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#475569]">
                  <FiLogOut className="w-3.5 h-3.5 text-[#3B6EF5] shrink-0" />
                  <span className="text-[#64748B]">Check-Out :</span>
                  <span className="font-bold text-[#17233D]">
                    {hotelData.checkOutTime}
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Quick Stat Metric Cards (Exact from reference image) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 mt-2">
              {/* 1. Total Rooms */}
              <div
                title="Total Rooms: 12"
                className="rounded-xl px-2 sm:px-2.5 py-2 border border-[#E2E8F0] bg-slate-50/70 flex items-center gap-2 min-w-0 overflow-hidden shadow-2xs"
              >
                <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-lg bg-[#EFF4FF] text-[#3B6EF5] flex items-center justify-center shrink-0">
                  <BedIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] sm:text-[16px] font-extrabold text-[#17233D] leading-none">
                    {hotelData.totalRooms}
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] text-[#64748B] font-medium leading-[1.15] mt-0.5 truncate">
                    Total Rooms
                  </div>
                </div>
              </div>

              {/* 2. Room Categories */}
              <div
                title={`Room Categories: ${hotelData.roomCategories}`}
                className="rounded-xl px-2 sm:px-2.5 py-2 border border-[#E2E8F0] bg-slate-50/70 flex items-center gap-2 min-w-0 overflow-hidden shadow-2xs"
              >
                <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-lg bg-[#F1EDFF] text-[#805AD5] flex items-center justify-center shrink-0">
                  <LayersIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] sm:text-[16px] font-extrabold text-[#17233D] leading-none">
                    {hotelData.roomCategories}
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] text-[#64748B] font-medium leading-[1.15] mt-0.5 truncate">
                    <span className="hidden xl:inline">Room </span>Categories
                  </div>
                </div>
              </div>

              {/* 3. Guest Capacity */}
              <div
                title={`Guest Capacity: ${hotelData.guestCapacity} Guests`}
                className="rounded-xl px-2 sm:px-2.5 py-2 border border-[#E2E8F0] bg-slate-50/70 flex items-center gap-2 min-w-0 overflow-hidden shadow-2xs"
              >
                <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-lg bg-[#E8F8F0] text-[#16A36A] flex items-center justify-center shrink-0">
                  <UsersCapacityIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] sm:text-[16px] font-extrabold text-[#17233D] leading-none">
                    {hotelData.guestCapacity}
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] text-[#64748B] font-medium leading-[1.15] mt-0.5 truncate">
                    <span className="hidden xl:inline">Guest </span>Capacity
                  </div>
                </div>
              </div>

              {/* 4. Floors */}
              <div
                title={`Total Floors: ${hotelData.floors}`}
                className="rounded-xl px-2 sm:px-2.5 py-2 border border-[#E2E8F0] bg-slate-50/70 flex items-center gap-2 min-w-0 overflow-hidden shadow-2xs"
              >
                <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shrink-0">
                  <BuildingFloorsIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] sm:text-[16px] font-extrabold text-[#17233D] leading-none">
                    {hotelData.floors}
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] text-[#64748B] font-medium leading-[1.15] mt-0.5 truncate">
                    Floors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Horizontal Navigation Tabs Capsule Bar */}
        <div className="bg-white rounded-2xl p-1.5 border border-[#E2E8F0] shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: "basic", label: "Basic Details", icon: BuildingFloorsIcon },
            { id: "amenities", label: "Amenities", icon: FiCoffee },
            { id: "photos", label: "Photos & Gallery", icon: FiCamera },
            { id: "policies", label: "Policies", icon: FiShield },
            { id: "location", label: "Location", icon: FiMapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#3B6EF5] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#17233D] hover:bg-slate-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 5. Tab Content: Basic Details (Exact Match to Reference Image) */}
        {activeTab === "basic" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch text-xs">
            {/* Card 1 (7 Cols): Hotel Information */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-3 mb-2 border-b border-[#F1F5F9]">
                  <BuildingFloorsIcon className="w-4.5 h-4.5 text-[#3B6EF5]" />
                  <h3 className="font-bold text-[14.5px] text-[#17233D]">
                    Hotel Information
                  </h3>
                </div>

                <div className="divide-y divide-[#F1F5F9]">
                  <div className="py-2.5 flex flex-col sm:flex-row sm:items-center">
                    <span className="w-36 font-semibold text-[#64748B] shrink-0">
                      Hotel Name
                    </span>
                    <span className="font-bold text-[#17233D]">
                      {hotelData.name}
                    </span>
                  </div>

                  <div className="py-2.5 flex flex-col sm:flex-row sm:items-center">
                    <span className="w-36 font-semibold text-[#64748B] shrink-0">
                      Property Type
                    </span>
                    <span className="font-semibold text-[#17233D]">
                      {hotelData.hotelType}
                    </span>
                  </div>

                  <div className="py-2.5 flex flex-col sm:flex-row sm:items-start">
                    <span className="w-36 font-semibold text-[#64748B] shrink-0 mt-0.5">
                      Description
                    </span>
                    <span className="text-[#334155] leading-relaxed font-normal">
                      {hotelData.description}
                    </span>
                  </div>

                  <div className="py-2.5 flex flex-col sm:flex-row sm:items-center">
                    <span className="w-36 font-semibold text-[#64748B] shrink-0">
                      City
                    </span>
                    <span className="font-semibold text-[#17233D]">
                      {hotelData.city}
                    </span>
                  </div>

                  <div className="py-2.5 flex flex-col sm:flex-row sm:items-center">
                    <span className="w-36 font-semibold text-[#64748B] shrink-0">
                      State
                    </span>
                    <span className="font-semibold text-[#17233D]">
                      {hotelData.state}
                    </span>
                  </div>

                  <div className="py-2.5 flex flex-col sm:flex-row sm:items-start">
                    <span className="w-36 font-semibold text-[#64748B] shrink-0 mt-0.5">
                      Address
                    </span>
                    <span className="text-[#334155] font-medium leading-relaxed">
                      {hotelData.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 (5 Cols): Operational Details */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-3 mb-2 border-b border-[#F1F5F9]">
                  <FiCalendar className="w-4.5 h-4.5 text-[#3B6EF5]" />
                  <h3 className="font-bold text-[14.5px] text-[#17233D]">
                    Operational Details
                  </h3>
                </div>

                <div className="divide-y divide-[#F1F5F9]">
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-semibold text-[#64748B]">
                      Check-In Time
                    </span>
                    <span className="font-bold text-[#17233D]">
                      {hotelData.checkInTime}
                    </span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-semibold text-[#64748B]">
                      Check-Out Time
                    </span>
                    <span className="font-bold text-[#17233D]">
                      {hotelData.checkOutTime}
                    </span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-semibold text-[#64748B]">
                      Contact Phone
                    </span>
                    <span className="font-semibold text-[#17233D]">
                      {hotelData.phone}
                    </span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-semibold text-[#64748B]">Email</span>
                    <span className="font-medium text-[#475569]">
                      {hotelData.email}
                    </span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-semibold text-[#64748B]">Website</span>
                    <a
                      href={hotelData.website}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#3B6EF5] hover:underline flex items-center gap-1"
                    >
                      <span>
                        {hotelData.website.replace(/^https?:\/\//, "")}
                      </span>
                      <FiExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Amenities */}
        {activeTab === "amenities" && (
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <h3 className="font-bold text-sm text-[#17233D] flex items-center gap-2">
                <FiCoffee className="text-[#3B6EF5] w-4 h-4" />
                <span>Featured Property Amenities & Guest Facilities</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-bold text-[#3B6EF5] hover:underline cursor-pointer"
              >
                + Edit Amenities
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {hotelData.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-[#E2E8F0] bg-slate-50/50 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#EFF4FF] text-[#3B6EF5] flex items-center justify-center shrink-0">
                    <FiCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#17233D]">{item}</div>
                    <div className="text-[10.5px] text-[#16A36A] font-semibold mt-0.5">
                      Available
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Photos & Gallery */}
        {activeTab === "photos" && (
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div>
                <h3 className="font-bold text-sm text-[#17233D] flex items-center gap-2">
                  <FiCamera className="text-[#3B6EF5] w-4 h-4" />
                  <span>Hotel Photo Showcase ({hotelImages.length} Photos)</span>
                </h3>
                <p className="text-[#64748B] text-[11px] mt-0.5">
                  High-resolution photography displayed on guest listings and WhatsApp brochures.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-[#3B6EF5] text-white font-bold text-xs hover:bg-[#2563EB] transition-colors cursor-pointer"
              >
                + Add Photos
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {hotelImages.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`group relative rounded-xl overflow-hidden aspect-[16/11] bg-slate-100 border border-slate-200 cursor-pointer ${
                    activeImageIndex === idx ? "ring-2 ring-[#3B6EF5]" : ""
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    onError={(e) => {
                      if (e.target.dataset.triedFallback !== "true") {
                        e.target.dataset.triedFallback = "true";
                        e.target.src = item.fallback;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-white text-[9.5px] font-bold">
                    {item.category}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 text-white">
                    <div className="text-[11px] font-bold leading-tight truncate">
                      {item.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Policies */}
        {activeTab === "policies" && (
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <h3 className="font-bold text-sm text-[#17233D] flex items-center gap-2">
                <FiShield className="text-[#0E4D3C] w-4 h-4" />
                <span>Guest Rules & Booking Policies</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-bold text-[#0E4D3C] hover:underline cursor-pointer"
              >
                + Edit Policies
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <h4 className="font-bold text-[#17233D] text-[13px]">
                  Check-In & Check-Out
                </h4>
                <p className="text-slate-600 leading-relaxed text-[11.5px]">
                  {hotelData.policies?.checkInOutPolicy ||
                    "Standard check-in starts at 12:00 PM and check-out is by 11:00 AM. Government ID verification is required for all adult guests."}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <h4 className="font-bold text-[#17233D] text-[13px]">
                  Cancellation Policy
                </h4>
                <p className="text-slate-600 leading-relaxed text-[11.5px]">
                  {hotelData.policies?.cancellationPolicy ||
                    "Free cancellation up to 48 hours before check-in date. Cancellations within 48 hours forfeit the 25% advance token deposit."}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <h4 className="font-bold text-[#17233D] text-[13px]">
                  Quiet Hours & Bonfires
                </h4>
                <p className="text-slate-600 leading-relaxed text-[11.5px]">
                  {hotelData.policies?.quietHoursPolicy ||
                    "Quiet hours are observed between 10:00 PM – 07:00 AM. Evening bonfires are held in the designated lawn area weather permitting."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Location */}
        {activeTab === "location" && (
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs text-xs space-y-4">
            <div className="border-b border-[#F1F5F9] pb-3">
              <h3 className="font-bold text-sm text-[#17233D] flex items-center gap-2">
                <FiMapPin className="text-[#3B6EF5] w-4 h-4" />
                <span>Location, Landmarks & Surroundings</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="font-bold text-[#17233D] block text-xs mb-1">
                    Physical Address
                  </span>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {hotelData.address}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="font-bold text-[#17233D] block text-xs mb-2">
                    Nearby Attractions & Distances
                  </span>
                  <div className="space-y-2 text-slate-600">
                    <div className="flex justify-between">
                      <span>Lansdowne Main Gandhi Chowk</span>
                      <span className="font-bold text-[#17233D]">1.2 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tip-in-Top Scenic Viewpoint</span>
                      <span className="font-bold text-[#17233D]">2.5 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bhulla Tal (Boating Lake)</span>
                      <span className="font-bold text-[#17233D]">3.2 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kotdwar Railway Station</span>
                      <span className="font-bold text-[#17233D]">40 km</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Preview Card */}
              <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[16/10] bg-slate-100 relative group flex items-center justify-center">
                <img
                  src="/images/destinations/tip-in-top.jpg"
                  alt="Surrounding Map"
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-102 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-4">
                  <FiMapPin className="w-8 h-8 text-amber-400 mb-1.5 animate-bounce-subtle" />
                  <span className="font-bold text-sm">{hotelData.name}</span>
                  <span className="text-[11px] text-white/90 mt-0.5">
                    Lansdowne, Pauri Garhwal
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. Comprehensive Add / Edit Hotel Modal (Wider Width max-w-4xl, Less Rounded rounded-2xl) */}
      <AddHotelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={hotelData}
        onSave={handleSaveHotelData}
      />
    </div>
  );
};

export default MyHotel;
