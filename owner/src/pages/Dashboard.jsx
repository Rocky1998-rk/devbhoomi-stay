import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import OwnerHeroBanner from "../components/OwnerHeroBanner";
import OwnerKpiCards from "../components/OwnerKpiCards";
import OccupancyRevenueChart from "../components/OccupancyRevenueChart";
import TodaysOperations from "../components/TodaysOperations";
import QuickActions from "../components/QuickActions";
import RecentBookingsTable from "../components/RecentBookingsTable";
import RoomOccupancyDonut from "../components/RoomOccupancyDonut";
import RevenueSummaryCard from "../components/RevenueSummaryCard";

// Modals
import NewBookingModal from "../components/modals/NewBookingModal";
import CheckInGuestModal from "../components/modals/CheckInGuestModal";
import BlockRoomModal from "../components/modals/BlockRoomModal";
import UpdatePricingModal from "../components/modals/UpdatePricingModal";
import BookingDetailsModal from "../components/modals/BookingDetailsModal";

const Dashboard = ({ onMenuClick: propMenuClick }) => {
  const outletCtx = useOutletContext() || {};
  const onMenuClick = propMenuClick || outletCtx.onMenuClick;
  // Modal states
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isBlockRoomOpen, setIsBlockRoomOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleBookingCreated = (newBooking) => {
    // Booking registered notification or table refresh
    alert(`Walk-In Booking ${newBooking.id} registered for ${newBooking.guestName}!`);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FC] font-['Inter',_sans-serif]">
      {/* 1. Panoramic Mountain Hero Banner */}
      <OwnerHeroBanner onMenuClick={onMenuClick} />

      {/* 2. Main Dashboard Content Grid with balanced symmetrical padding matching reference image */}
      <div className="px-3 sm:px-2 py-3.5 space-y-3.5 w-full">
        {/* KPI Cards: Row 1 (5 Cards) + Row 2 (4 Cards) */}
        <OwnerKpiCards />

        {/* 1. Full-Width Occupancy & Revenue Trend Chart (Horizontal across full width) */}
        <div className="w-full">
          <OccupancyRevenueChart />
        </div>

        {/* 2. Side-by-Side: Today's Operations (50%) & Quick Actions (50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* Today's Operations */}
          <TodaysOperations
            onSelectOperation={(opId) => {
              if (opId === "checkin") setIsCheckInOpen(true);
              if (opId === "walkin") setIsNewBookingOpen(true);
            }}
          />

          {/* Quick Actions */}
          <QuickActions
            onNewBooking={() => setIsNewBookingOpen(true)}
            onCheckInGuest={() => setIsCheckInOpen(true)}
            onBlockRoom={() => setIsBlockRoomOpen(true)}
            onUpdatePricing={() => setIsPricingOpen(true)}
          />
        </div>

        {/* 3. Full-Width Horizontal Recent Bookings Table (No scrollbars, clean and spacious) */}
        <div className="w-full">
          <RecentBookingsTable
            onViewBooking={(booking) => setSelectedBooking(booking)}
          />
        </div>

        {/* 4. Side-by-Side: Room Occupancy Donut (50%) & Revenue Summary (50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          <RoomOccupancyDonut />
          <RevenueSummaryCard />
        </div>
      </div>

      {/* Interactive Quick Action Modals */}
      <NewBookingModal
        isOpen={isNewBookingOpen}
        onClose={() => setIsNewBookingOpen(false)}
        onBookingCreated={handleBookingCreated}
      />

      <CheckInGuestModal
        isOpen={isCheckInOpen}
        onClose={() => setIsCheckInOpen(false)}
      />

      <BlockRoomModal
        isOpen={isBlockRoomOpen}
        onClose={() => setIsBlockRoomOpen(false)}
      />

      <UpdatePricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />

      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
};

export default Dashboard;
