import { useState } from "react";
import HimalayanGreetingBanner from "../../components/admin/HimalayanGreetingBanner";
import RevenueOverview from "../../components/admin/RevenueOverview";
import BookingStatusChart from "../../components/admin/BookingStatusChart";
import WhatsAppFunnel from "../../components/admin/WhatsAppFunnel";
import TodaysArrivalsTable from "../../components/admin/TodaysArrivalsTable";
import RecentBookingsTable from "../../components/admin/RecentBookingsTable";
import BookingDetailsModal from "../../components/admin/BookingDetailsModal";

const Dashboard = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <div className="font-['Inter']">
      {/* 1. Hero Panoramic Banner with Greeting & Overlapping KPI Cards */}
      <HimalayanGreetingBanner />

      {/* 2. Main Analytics & Tables Container (Aligned with Cards) */}
      <div className="px-2 sm:px-2.5 lg:px-2 mt-5 space-y-5 md:space-y-6">
        {/* Three-Panel Analytics Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Revenue Overview (Bar Chart) */}
          <div className="md:col-span-12 xl:col-span-6">
            <RevenueOverview />
          </div>

          {/* Booking Status (Donut Chart) */}
          <div className="md:col-span-6 xl:col-span-3">
            <BookingStatusChart />
          </div>

          {/* WhatsApp Funnel (Stages) */}
          <div className="md:col-span-6 xl:col-span-3">
            <WhatsAppFunnel />
          </div>
        </div>

        {/* Operational Tables (Today's Arrivals & Recent Bookings - Full Width Horizontal Layout) */}
        <div className="space-y-5 md:space-y-6">
          <TodaysArrivalsTable onSelectBooking={setSelectedBooking} />
          <RecentBookingsTable onSelectBooking={setSelectedBooking} />
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;