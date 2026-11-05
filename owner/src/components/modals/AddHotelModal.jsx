import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiImage,
  FiTag,
  FiEye,
  FiX,
  FiHome,
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe,
  FiClock,
  FiCamera,
  FiCheck,
  FiPlus,
  FiShield,
  FiCoffee,
  FiStar,
  FiLayers,
  FiUsers,
  FiCompass,
  FiCheckCircle,
  FiArrowRight,
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiWifi,
  FiTv,
  FiSun,
  FiDroplet,
  FiBell,
  FiZap,
  FiMoon,
  FiRefreshCw,
  FiInfo,
  FiChevronDown,
} from "react-icons/fi";

/* SVG Custom Bed Icon Matching Reference Design */
const BedIcon = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 4v16" />
    <path d="M2 13h20" />
    <path d="M22 10v10" />
    <path d="M2 9h10a2 2 0 0 1 2 2v2" />
    <circle cx="7" cy="6.5" r="1.5" />
  </svg>
);

/* SVG Layers / Categories Icon */
const LayersIcon = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
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
const UsersCapacityIcon = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
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
const BuildingFloorsIcon = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01M12 6h.01M12 10h.01M12 14h.01" />
  </svg>
);

/* Standard Amenities with Category Icons */
const standardAmenities = [
  { id: "wifi", label: "High-Speed WiFi", icon: FiWifi },
  { id: "parking", label: "Free Parking", icon: FiHome },
  { id: "mountain_view", label: "Mountain View", icon: FiSun },
  { id: "geyser", label: "24x7 Hot Water / Geyser", icon: FiDroplet },
  { id: "bonfire", label: "Bonfire & Barbecue", icon: FiSun },
  { id: "garden", label: "Lawn & Garden", icon: FiCoffee },
  { id: "kitchen", label: "In-House Kitchen", icon: FiCoffee },
  { id: "room_service", label: "Room Service", icon: FiBell },
  { id: "power_backup", label: "Power Backup", icon: FiZap },
  { id: "caretaker", label: "Caretaker On-Site", icon: FiShield },
  { id: "smart_tv", label: "Smart TV", icon: FiTv },
  { id: "electric_kettle", label: "Electric Kettle", icon: FiCoffee },
];

/* Default Gallery Images */
const defaultGalleryImages = [
  {
    id: 1,
    title: "Hotel Front & Exterior",
    url: "/images/hotel-front.jpg",
  },
  {
    id: 2,
    title: "Deluxe Bedroom Suite",
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Executive Suite Room",
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Hotel Ground & Garden",
    url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Pine Forest View",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "Modern Washroom",
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    title: "Mountain Balcony",
    url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    title: "Dining Restaurant",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    title: "Outdoor Bonfire",
    url: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600&q=80",
  },
];

const wizardSteps = [
  {
    id: 1,
    title: "Basic Information",
    subtext: "Hotel name, type, description",
    icon: FiHome,
  },
  {
    id: 2,
    title: "Property Details",
    subtext: "Rooms, capacity, floors",
    icon: BedIcon,
  },
  {
    id: 3,
    title: "Contact & Address",
    subtext: "Phone, email, website, address",
    icon: FiPhone,
  },
  {
    id: 4,
    title: "Images & Media",
    subtext: "Cover image & gallery",
    icon: FiImage,
  },
  {
    id: 5,
    title: "Amenities",
    subtext: "Facilities & services",
    icon: FiTag,
  },
  {
    id: 6,
    title: "Policies",
    subtext: "Check-in/out, cancellation, etc.",
    icon: FiShield,
  },
  {
    id: 7,
    title: "Location",
    subtext: "Latitude, longitude & map",
    icon: FiMapPin,
  },
  {
    id: 8,
    title: "Review & Publish",
    subtext: "Preview and add hotel",
    icon: FiEye,
  },
];

const AddHotelModal = ({ isOpen, onClose, initialData, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const [formData, setFormData] = useState({
    name: initialData?.name || initialData?.hotelName || "The Pine Retreat",
    hotelType: initialData?.hotelType || "Boutique Hotel",
    description:
      initialData?.description ||
      "Nestled amidst whispering pine forests with breathtaking views of the Garhwal Himalayas. The Pine Retreat offers boutique luxury, authentic Garhwali hospitality, warm bonfires, and stargazing from private balconies.",
    rating: initialData?.rating || "4.6",
    reviewsCount: initialData?.reviewsCount || "128",
    totalRooms: initialData?.totalRooms || "12",
    roomCategories: initialData?.roomCategories || "4",
    guestCapacity: initialData?.guestCapacity || "2 – 6",
    floors: initialData?.floors || "2",
    phone: initialData?.phone || "+91 98765 43210",
    email: initialData?.email || "pine@devbhoomistay.com",
    website: initialData?.website || "https://www.devbhoomistay.com",
    address:
      initialData?.address ||
      "Bhulia Basti, Near Tip-in-Top Point",
    city: initialData?.city || "Lansdowne",
    state: initialData?.state || "Uttarakhand",
    country: initialData?.country || "India",
    pincode: initialData?.pincode || "246155",
    coverImage: initialData?.coverImage || "/images/hotel-front.jpg",
    images: initialData?.images || defaultGalleryImages.map((g) => g.url),
    amenities:
      initialData?.amenities ||
      standardAmenities.slice(0, 10).map((a) => a.label),
    checkInOutPolicy:
      initialData?.policies?.checkInOutPolicy ||
      "Standard check-in starts at 12:00 PM and check-out is by 11:00 AM. Government ID verification is required for all adult guests.",
    cancellationPolicy:
      initialData?.policies?.cancellationPolicy ||
      "Free cancellation up to 48 hours before check-in date. Cancellations within 48 hours forfeit the 25% advance token deposit.",
    quietHoursPolicy:
      initialData?.policies?.quietHoursPolicy ||
      "Quiet hours are observed between 10:00 PM – 07:00 AM. Evening bonfires are held in the designated lawn area weather permitting.",
    latitude: initialData?.latitude || 29.8377,
    longitude: initialData?.longitude || 78.6871,
    googleMapsUrl:
      initialData?.googleMapsUrl ||
      "https://maps.google.com/?q=29.8377,78.6871",
    isActive: true,
  });

  const [customAmenity, setCustomAmenity] = useState("");
  const [amenitiesList, setAmenitiesList] = useState(standardAmenities);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        name: initialData.name || initialData.hotelName || prev.name,
      }));
    }
  }, [initialData]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Smooth open & close animation sync
  useEffect(() => {
    let timer;
    if (isOpen) {
      setMounted(true);
      timer = setTimeout(() => {
        setAnimateIn(true);
      }, 20);
    } else {
      setAnimateIn(false);
      timer = setTimeout(() => {
        setMounted(false);
      }, 260);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 240);
  };

  // Escape key handler with smooth close transition
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!mounted) return null;

  const toggleAmenity = (label) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(label);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== label)
          : [...prev.amenities, label],
      };
    });
  };

  const handleAddCustomAmenity = () => {
    if (!customAmenity.trim()) return;
    const label = customAmenity.trim();
    if (!amenitiesList.some((a) => a.label.toLowerCase() === label.toLowerCase())) {
      setAmenitiesList((prev) => [
        ...prev,
        { id: `custom_${Date.now()}`, label, icon: FiCoffee },
      ]);
    }
    if (!formData.amenities.includes(label)) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, label],
      }));
    }
    setCustomAmenity("");
  };

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setSuccess(true);
    const payload = {
      ...formData,
      hotelName: formData.name,
      totalRooms: Number(formData.totalRooms) || 12,
      roomCategories: Number(formData.roomCategories) || 4,
      floors: Number(formData.floors) || 2,
      rating: Number(formData.rating) || 4.6,
      reviewsCount: Number(formData.reviewsCount) || 128,
      policies: {
        checkInOutPolicy: formData.checkInOutPolicy,
        cancellationPolicy: formData.cancellationPolicy,
        quietHoursPolicy: formData.quietHoursPolicy,
      },
    };

    if (onSave) {
      onSave(payload);
    }

    setTimeout(() => {
      setSuccess(false);
      handleClose();
      setTimeout(() => setCurrentStep(1), 300);
    }, 1000);
  };

  const modalContent = (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-3 bg-black/60 font-['Inter',_sans-serif] transition-all duration-250 ease-out ${
        animateIn
          ? "opacity-100 backdrop-blur-xs"
          : "opacity-0 backdrop-blur-none pointer-events-none"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Modal Card with Smooth Scale & Fade Transition */}
      <div
        className={`bg-white rounded-2xl w-full max-w-5xl h-[93vh] max-h-[820px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-xs transition-all duration-250 ease-out transform ${
          animateIn
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-3"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-slate-100 bg-[#F8FAFC] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EFF4FF] text-[#3B6EF5] flex items-center justify-center font-bold shrink-0 border border-[#BFDBFE]">
              <FiHome className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-[17px] font-extrabold text-[#17233D] tracking-tight leading-tight">
                Add New Hotel
              </h2>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Create a new hotel listing with complete details, amenities, policies and location!
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#17233D] hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body: 2 Columns (Left Stepper Timeline + Right Active Step Form) */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar Timeline Stepper (Exact from Reference Image) */}
          <div className="w-52 sm:w-60 bg-[#FAFCFF] border-r border-slate-200/80 p-3 flex flex-col justify-between shrink-0 overflow-y-auto no-scrollbar">
            <div className="space-y-1 relative">
              {/* Perfectly Centered Continuous Vertical Line running through center of badges (center is at 22px) */}
              <div className="absolute left-[22px] top-[22px] bottom-[22px] w-[1.5px] -translate-x-1/2 bg-slate-200 z-0 pointer-events-none" />

              {wizardSteps.map((step) => {
                const isActive = currentStep === step.id;
                const IconComponent = step.icon;

                return (
                  <div key={step.id} className="relative">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-full text-left p-2 rounded-xl transition-all cursor-pointer flex items-center gap-2.5 relative z-10 ${
                        isActive
                          ? "bg-[#EFF4FF] border border-[#BFDBFE] shadow-2xs before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3.5px] before:bg-[#3B6EF5] before:rounded-r"
                          : "hover:bg-slate-100/70"
                      }`}
                    >
                      {/* Step Badge: Shows NUMBER when active, otherwise shows ICON */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all relative z-10 ${
                          isActive
                            ? "bg-[#3B6EF5] text-white shadow-xs"
                            : "bg-white border border-slate-200 text-[#17233D] shadow-2xs"
                        }`}
                      >
                        {isActive ? (
                          <span>{step.id}</span>
                        ) : (
                          <IconComponent className="w-3.5 h-3.5 text-[#17233D]" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-[12px] font-bold leading-tight truncate flex items-center gap-1.5 ${
                            isActive ? "text-[#1E40AF]" : "text-[#17233D]"
                          }`}
                        >
                          <span className="font-extrabold">{step.id}</span>
                          <span>{step.title}</span>
                        </div>
                        <div className="text-[10px] text-[#64748B] truncate mt-0.5">
                          {step.subtext}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Form Area (Active Step Content) */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 no-scrollbar">
              {success && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-xl flex items-center gap-2 shadow-2xs">
                  <FiCheck className="w-4 h-4 text-emerald-600" />
                  <span>Hotel details saved successfully! Publishing property...</span>
                </div>
              )}

              {/* ================= STEP 1: Basic Information ================= */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#3B6EF5] flex items-center justify-center">
                      <FiHome className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#17233D]">
                      Basic Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#17233D] font-bold mb-1">
                        Hotel Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-[#17233D] font-medium focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] text-xs"
                        placeholder="The Pine Retreat"
                      />
                    </div>

                    <div>
                      <label className="block text-[#17233D] font-bold mb-1">
                        Hotel Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.hotelType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hotelType: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-[#17233D] font-medium focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] text-xs cursor-pointer bg-white"
                      >
                        <option value="Boutique Hotel">Boutique Hotel</option>
                        <option value="Deluxe Hotel">Deluxe Hotel</option>
                        <option value="Luxury Hotel">Luxury Hotel</option>
                        <option value="Homestay">Homestay</option>
                        <option value="Resort">Resort</option>
                        <option value="Budget Hotel">Budget Hotel</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#17233D] font-bold mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2.5}
                      maxLength={500}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[#17233D] font-medium focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] text-xs leading-relaxed outline-none shadow-2xs resize-none"
                      placeholder="Nestled amidst whispering pine forests with breathtaking views..."
                    />
                    <div className="text-right text-[10.5px] text-[#64748B] mt-0.5">
                      {formData.description.length} / 500
                    </div>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 shadow-2xs">
                    <div className="font-bold text-[#17233D] flex items-center gap-1.5 text-xs">
                      <FiStar className="text-amber-500 w-3.5 h-3.5 fill-amber-500" />
                      <span>Rating & Reviews (Optional)</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#64748B] font-semibold mb-1 text-[11px]">
                          Rating
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          value={formData.rating}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              rating: e.target.value,
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold text-xs"
                          placeholder="4.6"
                        />
                      </div>

                      <div>
                        <label className="block text-[#64748B] font-semibold mb-1 text-[11px]">
                          Reviews Count
                        </label>
                        <input
                          type="number"
                          value={formData.reviewsCount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              reviewsCount: e.target.value,
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold text-xs"
                          placeholder="128"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= STEP 2: Property Details ================= */}
              {currentStep === 2 && (
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#3B6EF5] flex items-center justify-center border border-blue-100 shadow-2xs">
                      <BuildingFloorsIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#17233D] leading-none">
                        Property Details
                      </h3>
                      <p className="text-[10px] text-[#64748B] mt-0.5">
                        Configure room capacity, categories and layout structure.
                      </p>
                    </div>
                  </div>

                  {/* 1 Input Per Line (Full Width Rows with Compact w-11 h-11 Icon Cards) */}
                  <div className="space-y-3">
                    {/* 1. Total Rooms */}
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#EFF5FF] border border-[#DBEAFE]/80 text-[#2563EB] flex items-center justify-center shrink-0 shadow-2xs">
                        <BedIcon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="block text-[#17233D] font-bold text-xs mb-1">
                          Total Rooms <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={formData.totalRooms}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              totalRooms: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold text-[#17233D] focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] text-xs bg-white outline-none shadow-2xs"
                          placeholder="12"
                        />
                      </div>
                    </div>

                    {/* 2. Room Categories */}
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#EFF5FF] border border-[#DBEAFE]/80 text-[#2563EB] flex items-center justify-center shrink-0 shadow-2xs">
                        <LayersIcon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="block text-[#17233D] font-bold text-xs mb-1">
                          Room Categories <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={formData.roomCategories}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              roomCategories: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold text-[#17233D] focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] text-xs bg-white outline-none shadow-2xs"
                          placeholder="4"
                        />
                      </div>
                    </div>

                    {/* 3. Guest Capacity */}
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#EFF5FF] border border-[#DBEAFE]/80 text-[#2563EB] flex items-center justify-center shrink-0 shadow-2xs">
                        <UsersCapacityIcon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="block text-[#17233D] font-bold text-xs mb-1">
                          Guest Capacity <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.guestCapacity}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                guestCapacity: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2 pr-9 rounded-xl border border-slate-200 font-bold text-[#17233D] focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] text-xs bg-white outline-none appearance-none cursor-pointer shadow-2xs"
                          >
                            <option value="2 – 6">2 – 6</option>
                            <option value="1 – 4">1 – 4</option>
                            <option value="2 – 8">2 – 8</option>
                            <option value="4 – 10">4 – 10</option>
                            <option value="1 – 2">1 – 2</option>
                          </select>
                          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* 4. Floors */}
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#EFF5FF] border border-[#DBEAFE]/80 text-[#2563EB] flex items-center justify-center shrink-0 shadow-2xs">
                        <BuildingFloorsIcon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="block text-[#17233D] font-bold text-xs mb-1">
                          Floors <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={formData.floors}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              floors: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold text-[#17233D] focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] text-xs bg-white outline-none shadow-2xs"
                          placeholder="2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Information callout */}
                  <div className="p-2.5 rounded-xl bg-[#EFF6FF]/80 border border-[#BFDBFE]/70 text-[#1E40AF] text-[11px] flex items-center gap-2 shadow-2xs">
                    <FiInfo className="w-4 h-4 shrink-0 text-[#3B6EF5]" />
                    <span className="leading-tight">
                      Guest Capacity is the number of guests per room (e.g. 2 – 6).
                    </span>
                  </div>
                </div>
              )}

              {/* ================= STEP 3: Contact & Address ================= */}
              {currentStep === 3 && (
                <div className="space-y-4 sm:space-y-5">
                  {/* Step Header */}
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#3B6EF5] flex items-center justify-center border border-blue-100 shadow-2xs">
                      <FiPhone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#17233D] leading-none">
                        Contact & Address
                      </h3>
                      <p className="text-[10.5px] text-[#64748B] mt-0.5">
                        Official property contact lines and verified postal address.
                      </p>
                    </div>
                  </div>

                  {/* Section 1: Contact Lines (Phone, Email, Website) */}
                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone with flag badge and clean phone value */}
                      <div>
                        <label className="block text-[#17233D] font-bold text-xs mb-1.5 flex items-center gap-1.5">
                          <FiPhone className="text-[#3B6EF5] w-3.5 h-3.5" />
                          <span>Official Phone</span>
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#3B6EF5]/20 focus-within:border-[#3B6EF5] bg-white shadow-2xs transition-all">
                          <div className="px-3 py-2.5 bg-slate-50 border-r border-slate-200 flex items-center gap-1.5 shrink-0 text-xs font-bold text-[#17233D]">
                            <span className="text-sm leading-none">🇮🇳</span>
                            <span>+91</span>
                          </div>
                          <input
                            type="tel"
                            required
                            value={formData.phone ? formData.phone.replace(/^\+91\s*/, "") : ""}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/^\+91\s*/, "").trim();
                              setFormData({ ...formData, phone: raw ? `+91 ${raw}` : "" });
                            }}
                            className="flex-1 px-3 py-2.5 font-bold text-[#17233D] text-xs outline-none bg-transparent"
                            placeholder="98765 43210"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[#17233D] font-bold text-xs mb-1.5 flex items-center gap-1.5">
                          <FiMail className="text-[#3B6EF5] w-3.5 h-3.5" />
                          <span>Official Email</span>
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[#17233D] font-bold text-xs bg-white outline-none focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] transition-all shadow-2xs"
                          placeholder="pine@devbhoomistay.com"
                        />
                      </div>
                    </div>

                    {/* Official Website */}
                    <div>
                      <label className="block text-[#17233D] font-bold text-xs mb-1.5 flex items-center gap-1.5">
                        <FiGlobe className="text-[#3B6EF5] w-3.5 h-3.5" />
                        <span>Official Website</span>
                        <span className="text-slate-400 font-normal text-[11px]">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            website: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[#17233D] font-bold text-xs bg-white outline-none focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] transition-all shadow-2xs"
                        placeholder="https://www.devbhoomistay.com"
                      />
                    </div>
                  </div>

                  {/* Section 2: Property Address Details */}
                  <div className="pt-3 border-t border-slate-100 space-y-3.5">
                    <div className="font-bold text-[#17233D] flex items-center gap-2 text-xs">
                      <div className="w-5 h-5 rounded-md bg-blue-50 text-[#3B6EF5] flex items-center justify-center">
                        <FiMapPin className="w-3.5 h-3.5" />
                      </div>
                      <span>Address Details</span>
                    </div>

                    {/* Street Address */}
                    <div>
                      <label className="block text-[#17233D] font-bold text-xs mb-1.5">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[#17233D] font-bold text-xs bg-white outline-none focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] transition-all shadow-2xs"
                        placeholder="Bhulia Basti, Near Tip-in-Top Point, Lansdowne"
                      />
                    </div>

                    {/* City & State (2 Columns with generous spacing) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#17233D] font-bold text-xs mb-1.5">
                          City <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.city}
                            onChange={(e) =>
                              setFormData({ ...formData, city: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 pr-8 rounded-xl border border-slate-200 text-[#17233D] font-bold text-xs bg-white outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] shadow-2xs"
                          >
                            <option value="Lansdowne">Lansdowne</option>
                            <option value="Kotdwar">Kotdwar</option>
                            <option value="Pauri">Pauri</option>
                            <option value="Rishikesh">Rishikesh</option>
                            <option value="Mussoorie">Mussoorie</option>
                            <option value="Nainital">Nainital</option>
                          </select>
                          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#17233D] font-bold text-xs mb-1.5">
                          State <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.state}
                            onChange={(e) =>
                              setFormData({ ...formData, state: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 pr-8 rounded-xl border border-slate-200 text-[#17233D] font-bold text-xs bg-white outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] shadow-2xs"
                          >
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                          </select>
                          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Country & Pincode (2 Columns with generous spacing) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#17233D] font-bold text-xs mb-1.5">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.country}
                            onChange={(e) =>
                              setFormData({ ...formData, country: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 pr-8 rounded-xl border border-slate-200 text-[#17233D] font-bold text-xs bg-white outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] shadow-2xs"
                          >
                            <option value="India">India</option>
                          </select>
                          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#17233D] font-bold text-xs mb-1.5">
                          Pincode <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.pincode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pincode: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[#17233D] font-bold text-xs bg-white outline-none focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] shadow-2xs"
                          placeholder="246155"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= STEP 4: Images & Media ================= */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#3B6EF5] flex items-center justify-center">
                      <FiCamera className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#17233D]">
                      Images & Media
                    </h3>
                  </div>

                  {/* Cover Image Showcase */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[#17233D] font-bold">
                        Cover Image <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[10.5px] text-slate-500">
                        Primary image shown in search results
                      </span>
                    </div>

                    <div className="relative rounded-xl overflow-hidden aspect-[16/8] bg-slate-900 group shadow-md border border-slate-200">
                      <img
                        src={formData.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                        <button
                          type="button"
                          className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white text-slate-700 shadow-sm flex items-center justify-center cursor-pointer"
                          title="Change Cover"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          className="w-7 h-7 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-sm flex items-center justify-center cursor-pointer"
                          title="Remove Cover"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Gallery Grid */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <label className="block text-[#17233D] font-bold">
                        Hotel Gallery ({formData.images.length} Images)
                      </label>
                      <button
                        type="button"
                        className="px-3 py-1 rounded-lg border border-[#3B6EF5] text-[#3B6EF5] hover:bg-blue-50 font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <FiPlus className="w-3.5 h-3.5" />
                        <span>Add Images</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {/* Plus Upload placeholder */}
                      <button
                        type="button"
                        className="aspect-[4/3] rounded-lg border-2 border-dashed border-blue-300 hover:border-[#3B6EF5] bg-blue-50/40 hover:bg-blue-50/80 flex items-center justify-center text-[#3B6EF5] cursor-pointer transition-colors"
                      >
                        <FiPlus className="w-5 h-5" />
                      </button>

                      {/* Thumbnails */}
                      {formData.images.slice(0, 9).map((url, idx) => (
                        <div
                          key={idx}
                          className="aspect-[4/3] rounded-lg overflow-hidden relative group bg-slate-100 border border-slate-200"
                        >
                          <img
                            src={url}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ================= STEP 5: Amenities ================= */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#3B6EF5] flex items-center justify-center">
                        <FiCoffee className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#17233D]">
                          Amenities
                        </h3>
                        <p className="text-[10.5px] text-[#64748B]">
                          Select available amenities at your property.
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#3B6EF5] font-bold text-[11px] border border-blue-200">
                      {formData.amenities.length} Selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {amenitiesList.map((item) => {
                      const isChecked = formData.amenities.includes(item.label);
                      const Icon = item.icon || FiCoffee;
                      return (
                        <button
                          key={item.id || item.label}
                          type="button"
                          onClick={() => toggleAmenity(item.label)}
                          className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                            isChecked
                              ? "bg-[#EFF4FF] border-[#3B6EF5] text-[#1D4ED8] font-bold shadow-2xs"
                              : "bg-white border-slate-200 text-[#475569] hover:bg-slate-50"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                              isChecked
                                ? "bg-[#3B6EF5] text-white"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>

                          <span className="text-[11px] leading-tight line-clamp-1">
                            {item.label}
                          </span>

                          {isChecked && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#3B6EF5] text-white flex items-center justify-center text-[9px]">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}

                    {/* Add Custom Amenity Button */}
                    <div className="p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-1 text-slate-500 hover:border-[#3B6EF5] hover:text-[#3B6EF5] cursor-pointer">
                      <FiPlus className="w-4 h-4" />
                      <span className="text-[11px] font-semibold">
                        Add Custom Amenity
                      </span>
                    </div>
                  </div>

                  {/* Add Custom Amenity Input */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <input
                      type="text"
                      value={customAmenity}
                      onChange={(e) => setCustomAmenity(e.target.value)}
                      placeholder="Add another amenity (e.g. Heated Pool, Yoga Shala)..."
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5]"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomAmenity}
                      className="px-4 py-1.5 rounded-lg bg-[#3B6EF5] text-white font-bold text-xs hover:bg-[#2563EB] cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 6: Policies ================= */}
              {currentStep === 6 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#3B6EF5] flex items-center justify-center border border-blue-100 shadow-2xs">
                      <FiShield className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#17233D] leading-none">
                        Policies
                      </h3>
                      <p className="text-[10px] text-[#64748B] mt-0.5">
                        Establish clear guest rules, cancellation terms and quiet hours.
                      </p>
                    </div>
                  </div>

                  {/* 2 Inputs Per Row: Check-In/Out Policy & Cancellation Policy */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#17233D] font-bold text-xs mb-1 flex items-center gap-1.5">
                        <FiClock className="text-[#3B6EF5] w-3.5 h-3.5" />
                        <span>Check-In / Out Policy</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={formData.checkInOutPolicy}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            checkInOutPolicy: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-[#17233D] font-medium text-xs leading-relaxed focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] outline-none shadow-2xs resize-none"
                        placeholder="Standard check-in starts at 12:00 PM and check-out is by 11:00 AM..."
                      />
                    </div>

                    <div>
                      <label className="block text-[#17233D] font-bold text-xs mb-1 flex items-center gap-1.5">
                        <FiRefreshCw className="text-[#3B6EF5] w-3.5 h-3.5" />
                        <span>Cancellation Policy</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={formData.cancellationPolicy}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cancellationPolicy: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-[#17233D] font-medium text-xs leading-relaxed focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] outline-none shadow-2xs resize-none"
                        placeholder="Free cancellation up to 48 hours before check-in date..."
                      />
                    </div>
                  </div>

                  {/* Quiet Hours Policy */}
                  <div>
                    <label className="block text-[#17233D] font-bold text-xs mb-1 flex items-center gap-1.5">
                      <FiMoon className="text-[#3B6EF5] w-3.5 h-3.5" />
                      <span>Quiet Hours Policy</span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.quietHoursPolicy}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quietHoursPolicy: e.target.value,
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-[#17233D] font-medium text-xs leading-relaxed focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] outline-none shadow-2xs resize-none"
                      placeholder="Quiet hours are observed between 10:00 PM – 07:00 AM..."
                    />
                  </div>
                </div>
              )}

              {/* ================= STEP 7: Location ================= */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#3B6EF5] flex items-center justify-center border border-blue-100 shadow-2xs">
                      <FiMapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#17233D] leading-none">
                        Location
                      </h3>
                      <p className="text-[10.5px] text-[#64748B] mt-0.5">
                        Set coordinates and Google Maps pin for directions and map integration.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[#17233D] font-bold text-xs mb-1">
                        Latitude <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <FiCompass className="absolute left-3.5 w-4 h-4 text-[#3B6EF5] pointer-events-none" />
                        <input
                          type="number"
                          step="0.0001"
                          value={formData.latitude}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              latitude: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-[#17233D] font-bold text-xs bg-white outline-none focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] shadow-2xs"
                          placeholder="29.8377"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#17233D] font-bold text-xs mb-1">
                        Longitude <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <FiGlobe className="absolute left-3.5 w-4 h-4 text-[#3B6EF5] pointer-events-none" />
                        <input
                          type="number"
                          step="0.0001"
                          value={formData.longitude}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitude: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-[#17233D] font-bold text-xs bg-white outline-none focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] shadow-2xs"
                          placeholder="78.6871"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#17233D] font-bold text-xs mb-1">
                      Google Maps URL <span className="text-slate-400 font-normal text-[11px]">(Optional)</span>
                    </label>
                    <div className="relative flex items-center">
                      <FiMapPin className="absolute left-3.5 w-4 h-4 text-[#3B6EF5] pointer-events-none" />
                      <input
                        type="url"
                        value={formData.googleMapsUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            googleMapsUrl: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-[#17233D] font-bold text-xs bg-white outline-none focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] shadow-2xs"
                        placeholder="https://maps.google.com/?q=29.8377,78.6871"
                      />
                    </div>
                  </div>

                  {/* Stylized Google Map Preview */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-[#17233D] font-bold text-xs">
                      Map Preview
                    </label>
                    <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs bg-[#E8F0E6]">
                      {/* Stylized Mountain Terrain Map Background */}
                      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                      {/* Rivers & contour lines */}
                      <svg
                        className="absolute inset-0 w-full h-full opacity-35"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M-20 60 Q 80 140 180 80 T 380 120 T 580 90"
                          fill="none"
                          stroke="#93C5FD"
                          strokeWidth="8"
                        />
                        <path
                          d="M-10 120 Q 90 40 220 90 T 420 70 T 600 130"
                          fill="none"
                          stroke="#86EFAC"
                          strokeWidth="24"
                          opacity="0.3"
                        />
                      </svg>

                      {/* Map Pin with Ripple Marker */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="relative">
                          <div className="w-9 h-9 rounded-full bg-red-500/20 animate-ping absolute inset-0" />
                          <div className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg relative z-10 border-2 border-white">
                            <FiMapPin className="w-5 h-5 fill-white" />
                          </div>
                        </div>

                        <div className="mt-1.5 px-3 py-1 bg-white/95 backdrop-blur-xs rounded-lg shadow-md border border-slate-200/80 text-[11px] font-bold text-[#17233D] whitespace-nowrap flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                          <span>{formData.name || "The Pine Retreat"}, {formData.city || "Lansdowne"}</span>
                        </div>
                      </div>

                      {/* Watermark Branding */}
                      <div className="absolute bottom-2 left-3 flex items-center gap-1 px-2 py-0.5 rounded bg-white/80 backdrop-blur-2xs text-[10px] text-slate-600 font-bold border border-slate-200">
                        <span className="text-[#4285F4]">G</span>
                        <span className="text-[#EA4335]">o</span>
                        <span className="text-[#FBBC05]">o</span>
                        <span className="text-[#4285F4]">g</span>
                        <span className="text-[#34A853]">l</span>
                        <span className="text-[#EA4335]">e</span>
                      </div>

                      {/* Zoom Controls */}
                      <div className="absolute bottom-2 right-3 flex flex-col rounded-lg bg-white/90 shadow-xs border border-slate-200 overflow-hidden text-xs">
                        <button
                          type="button"
                          className="px-2 py-1 font-bold text-slate-700 hover:bg-slate-100 border-b border-slate-200"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 font-bold text-slate-700 hover:bg-slate-100"
                        >
                          −
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= STEP 8: Review & Publish ================= */}
              {currentStep === 8 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#3B6EF5] flex items-center justify-center">
                      <FiCheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#17233D]">
                        Review & Publish
                      </h3>
                      <p className="text-[10.5px] text-[#64748B]">
                        Review all details before adding the hotel.
                      </p>
                    </div>
                  </div>

                  {/* Summary Hotel Card from Reference Image */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
                    <div className="flex gap-3.5 items-center">
                      <div className="w-24 h-18 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-2xs">
                        <img
                          src={formData.coverImage}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-extrabold text-[#17233D] leading-tight truncate">
                            {formData.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full bg-[#FFF3E5] text-[#D97706] text-[10px] font-bold border border-[#FDE68A]/60">
                            {formData.hotelType}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-amber-500 mt-1">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <FiStar key={i} className="w-3 h-3 fill-amber-400" />
                            ))}
                          </div>
                          <span className="font-bold text-[#17233D]">
                            {formData.rating}
                          </span>
                          <span className="text-[#64748B]">
                            ({formData.reviewsCount} Reviews)
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-[#64748B] mt-1 truncate">
                          <FiMapPin className="w-3 h-3 shrink-0" />
                          <span>
                            {formData.city}, {formData.state}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 4 Mini Stat Badges with matching category icons */}
                    <div className="grid grid-cols-4 gap-2.5 pt-2 border-t border-slate-100">
                      <div className="p-2.5 rounded-xl bg-[#EFF5FF] border border-[#BFDBFE]/70 text-center flex flex-col items-center">
                        <BedIcon className="w-4 h-4 text-[#2563EB] mb-1" />
                        <div className="font-extrabold text-[#17233D] text-xs leading-none">
                          {formData.totalRooms}
                        </div>
                        <div className="text-[9.5px] text-[#64748B] font-medium mt-0.5">
                          Rooms
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#FAF5FF] border border-[#E9D5FF] text-center flex flex-col items-center">
                        <LayersIcon className="w-4 h-4 text-[#7C3AED] mb-1" />
                        <div className="font-extrabold text-[#17233D] text-xs leading-none">
                          {formData.roomCategories}
                        </div>
                        <div className="text-[9.5px] text-[#64748B] font-medium mt-0.5">
                          Categories
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-center flex flex-col items-center">
                        <UsersCapacityIcon className="w-4 h-4 text-[#16A36A] mb-1" />
                        <div className="font-extrabold text-[#17233D] text-xs leading-none">
                          {formData.guestCapacity}
                        </div>
                        <div className="text-[9.5px] text-[#64748B] font-medium mt-0.5">
                          Capacity
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] text-center flex flex-col items-center">
                        <BuildingFloorsIcon className="w-4 h-4 text-[#4F46E5] mb-1" />
                        <div className="font-extrabold text-[#17233D] text-xs leading-none">
                          {formData.floors}
                        </div>
                        <div className="text-[9.5px] text-[#64748B] font-medium mt-0.5">
                          Floors
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* What will be published & Status Toggle Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    {/* Checklist */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                      <div className="font-bold text-[#17233D] text-xs">
                        What will be published?
                      </div>
                      <div className="space-y-1.5 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <FiCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Hotel details, contact & address</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <FiCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Images gallery and cover photo</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <FiCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Amenities and policies</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <FiCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Location (lat/long & Google Maps)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <FiCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Rating & reviews (if added)</span>
                        </div>
                      </div>
                    </div>

                    {/* Active Status Card */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                            🏨
                          </div>
                          <div>
                            <div className="font-bold text-[#17233D] text-xs">
                              Hotel Listing
                            </div>
                            <div className="text-[10px] text-[#64748B]">
                              (Visible on platform)
                            </div>
                          </div>
                        </div>

                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                          Active
                        </span>
                      </div>

                      <p className="text-[10.5px] text-slate-500 leading-relaxed mt-2">
                        Your hotel will be verified and made accessible for guest bookings and WhatsApp inquiries immediately.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Bar (Exact from Reference Image) */}
            <div className="p-3.5 sm:px-6 border-t border-slate-200 bg-[#FAFCFF] flex items-center justify-between shrink-0">
              {/* Left Button: Cancel on Step 1, Back on Steps 2-8 */}
              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <FiArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              )}

              {/* Right Button: Save & Next on Steps 1-7, Add Hotel on Step 8 */}
              {currentStep < 8 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2 rounded-lg bg-[#3B6EF5] hover:bg-[#2563EB] text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <span>Save & Next</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-lg bg-[#16A36A] hover:bg-[#15803D] text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:shadow-lg"
                >
                  <FiCheck className="w-4 h-4 stroke-[2.5]" />
                  <span>Add Hotel</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modalContent, document.body);
};

export default AddHotelModal;
