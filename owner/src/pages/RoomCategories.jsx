import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import OwnerHeroBanner from "../components/OwnerHeroBanner";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiMoreVertical,
  FiUsers,
  FiChevronDown,
  FiX,
  FiCheck,
  FiTrash2,
  FiCopy,
  FiImage,
} from "react-icons/fi";

/* SVG Custom Bed Icon Matching Reference Design */
const BedIcon = ({ className = "w-4 h-4" }) => (
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

const initialRoomCategories = [
  {
    id: "cat-1",
    name: "Deluxe Room",
    subtitle: "Spacious room with valley view",
    capacity: 2,
    bedType: "King Bed",
    rooms: 4,
    status: "Active",
    basePrice: "₹ 3,200",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    fallback: "/images/destinations/cottage-escape.jpg",
  },
  {
    id: "cat-2",
    name: "Family Suite",
    subtitle: "Ideal for families",
    capacity: 4,
    bedType: "King + Sofa",
    rooms: 2,
    status: "Active",
    basePrice: "₹ 5,500",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    fallback: "/images/destinations/mountain-resort.jpg",
  },
  {
    id: "cat-3",
    name: "Cottage",
    subtitle: "Private cottage with garden",
    capacity: 3,
    bedType: "Queen Bed",
    rooms: 3,
    status: "Active",
    basePrice: "₹ 4,800",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    fallback: "/images/destinations/tip-in-top.jpg",
  },
  {
    id: "cat-4",
    name: "Super Deluxe",
    subtitle: "Premium room with balcony",
    capacity: 2,
    bedType: "King Bed",
    rooms: 3,
    status: "Inactive",
    basePrice: "₹ 3,900",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80",
    fallback: "/images/hotel-front.jpg",
  },
];

const RoomCategories = () => {
  const outletCtx = useOutletContext() || {};
  const [categories, setCategories] = useState(initialRoomCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [modalForm, setModalForm] = useState({
    name: "",
    subtitle: "",
    capacity: 2,
    bedType: "King Bed",
    rooms: 2,
    status: "Active",
    basePrice: "₹ 3,500",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
  });

  // Filter Categories
  const filteredCategories = categories.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.bedType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || cat.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Open Modal for Add
  const handleOpenAdd = () => {
    setEditingId(null);
    setModalForm({
      name: "",
      subtitle: "",
      capacity: 2,
      bedType: "King Bed",
      rooms: 2,
      status: "Active",
      basePrice: "₹ 3,500",
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    });
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  // Open Modal for Edit
  const handleOpenEdit = (cat) => {
    setEditingId(cat.id);
    setModalForm({
      name: cat.name,
      subtitle: cat.subtitle,
      capacity: cat.capacity,
      bedType: cat.bedType,
      rooms: cat.rooms,
      status: cat.status,
      basePrice: cat.basePrice || "₹ 3,500",
      image: cat.image,
    });
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  // Save Add / Edit
  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!modalForm.name.trim()) return;

    if (editingId) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, ...modalForm } : c))
      );
    } else {
      const newCategory = {
        id: `cat-${Date.now()}`,
        ...modalForm,
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    setIsModalOpen(false);
  };

  // Toggle Status
  const handleToggleStatus = (id) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c
      )
    );
    setActiveMenuId(null);
  };

  // Duplicate Category
  const handleDuplicate = (cat) => {
    const copy = {
      ...cat,
      id: `cat-${Date.now()}`,
      name: `${cat.name} (Copy)`,
    };
    setCategories((prev) => [...prev, copy]);
    setActiveMenuId(null);
  };

  // Delete Category
  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setActiveMenuId(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FC] font-['Inter',_sans-serif]">
      {/* 1. Top Panoramic Himalayan Mountain Hero Banner */}
      <OwnerHeroBanner onMenuClick={outletCtx.onMenuClick} />

      {/* 2. Main Page Container */}
      <div className="px-3 sm:px-2 py-4 space-y-4 w-full text-xs">
        {/* Header: Title + Action Button (Exact from Reference Image) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-xl sm:text-[22px] font-extrabold text-[#17233D] tracking-tight">
            Room Categories
          </h1>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-[#3B6EF5] hover:bg-[#2563EB] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <FiPlus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Category</span>
          </button>
        </div>

        {/* 3. Filter Bar: Search Input + Status Filter Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Category Box */}
          <div className="relative w-full sm:w-80">
            <FiSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search category..."
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-white font-medium text-xs text-[#17233D] placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] shadow-2xs transition-all"
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative self-start sm:self-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 pr-8 rounded-xl border border-slate-200/90 bg-white font-bold text-xs text-[#17233D] shadow-2xs cursor-pointer outline-none appearance-none focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] transition-all"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <FiChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 4. List Type Room Categories Table (Exact Layout from Reference Image) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-slate-100 bg-[#FAFCFF] text-[#17233D]">
                  <th className="py-3 px-5 font-bold text-xs">Category</th>
                  <th className="py-3 px-4 font-bold text-xs">Capacity</th>
                  <th className="py-3 px-4 font-bold text-xs">Bed Type</th>
                  <th className="py-3 px-4 font-bold text-xs">Rooms</th>
                  <th className="py-3 px-4 font-bold text-xs">Status</th>
                  <th className="py-3 px-5 font-bold text-xs text-right">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#F8FAFC] transition-colors group"
                    >
                      {/* 1. Category (Image + Name + Subtitle) */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-11 sm:w-16 sm:h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 bg-slate-100 shadow-2xs">
                            <img
                              src={item.image}
                              alt={item.name}
                              onError={(e) => {
                                if (item.fallback) e.target.src = item.fallback;
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-xs sm:text-[13px] text-[#17233D] leading-tight truncate">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-slate-400 font-normal mt-0.5 truncate max-w-[220px] sm:max-w-[280px]">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Capacity (Users Icon + Number) */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-[#17233D]">
                          <FiUsers className="w-4 h-4 text-[#17233D] stroke-[2.2]" />
                          <span>{item.capacity}</span>
                        </div>
                      </td>

                      {/* 3. Bed Type (Bed Icon + Type Name) */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-[#17233D]">
                          <BedIcon className="w-4 h-4 text-[#17233D]" />
                          <span>{item.bedType}</span>
                        </div>
                      </td>

                      {/* 4. Rooms (Total count) */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-bold text-xs text-[#17233D]">
                          {item.rooms}
                        </span>
                      </td>

                      {/* 5. Status (Active / Inactive Badge) */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {item.status === "Active" ? (
                          <span className="px-3 py-1 rounded-lg bg-[#E8F8F0] text-[#16A36A] font-bold text-xs inline-block">
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-lg bg-[#FEE2E2] text-[#DC2626] font-bold text-xs inline-block">
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* 6. Action (Edit Icon + 3 Dots Menu) */}
                      <td className="py-3.5 px-5 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5 relative">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#3B6EF5] hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Edit Category"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>

                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveMenuId(
                                  activeMenuId === item.id ? null : item.id
                                )
                              }
                              className="p-1.5 rounded-lg text-slate-500 hover:text-[#17233D] hover:bg-slate-100 transition-colors cursor-pointer"
                              title="More Options"
                            >
                              <FiMoreVertical className="w-4 h-4" />
                            </button>

                            {/* Dropdown Menu */}
                            {activeMenuId === item.id && (
                              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-in fade-in zoom-in-95 duration-100 text-left">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEdit(item)}
                                  className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <FiEdit2 className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Edit Category</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleToggleStatus(item.id)}
                                  className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <FiCheck className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>
                                    Mark as{" "}
                                    {item.status === "Active"
                                      ? "Inactive"
                                      : "Active"}
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDuplicate(item)}
                                  className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <FiCopy className="w-3.5 h-3.5 text-purple-600" />
                                  <span>Duplicate Category</span>
                                </button>
                                <div className="border-t border-slate-100 my-1" />
                                <button
                                  type="button"
                                  onClick={() => handleDelete(item.id)}
                                  className="w-full px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                  <FiTrash2 className="w-3.5 h-3.5" />
                                  <span>Delete Category</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400">
                      No room categories found matching your filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs font-['Inter',_sans-serif]">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden text-xs animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-slate-100 bg-[#F8FAFC] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#17233D]">
                  {editingId ? "Edit Room Category" : "Add Room Category"}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Configure capacity, bed configuration, rooms and status.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-[#17233D] hover:bg-slate-100"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveModal} className="p-5 space-y-3.5">
              <div>
                <label className="block text-[#17233D] font-bold text-xs mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={modalForm.name}
                  onChange={(e) =>
                    setModalForm({ ...modalForm, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold text-xs text-[#17233D] focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] outline-none"
                  placeholder="e.g. Deluxe Room"
                />
              </div>

              <div>
                <label className="block text-[#17233D] font-bold text-xs mb-1">
                  Short Tagline / Description
                </label>
                <input
                  type="text"
                  value={modalForm.subtitle}
                  onChange={(e) =>
                    setModalForm({ ...modalForm, subtitle: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-[#17233D] focus:ring-2 focus:ring-[#3B6EF5]/20 focus:border-[#3B6EF5] outline-none"
                  placeholder="e.g. Spacious room with valley view"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#17233D] font-bold text-xs mb-1">
                    Capacity (Guests)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={modalForm.capacity}
                    onChange={(e) =>
                      setModalForm({
                        ...modalForm,
                        capacity: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold text-xs text-[#17233D] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#17233D] font-bold text-xs mb-1">
                    Bed Type
                  </label>
                  <select
                    value={modalForm.bedType}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, bedType: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold text-xs text-[#17233D] outline-none bg-white cursor-pointer"
                  >
                    <option value="King Bed">King Bed</option>
                    <option value="Queen Bed">Queen Bed</option>
                    <option value="King + Sofa">King + Sofa</option>
                    <option value="2 Twin Beds">2 Twin Beds</option>
                    <option value="Double Bed">Double Bed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#17233D] font-bold text-xs mb-1">
                    Rooms Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={modalForm.rooms}
                    onChange={(e) =>
                      setModalForm({
                        ...modalForm,
                        rooms: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold text-xs text-[#17233D] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#17233D] font-bold text-xs mb-1">
                    Status
                  </label>
                  <select
                    value={modalForm.status}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, status: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-bold text-xs text-[#17233D] outline-none bg-white cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#17233D] font-bold text-xs mb-1">
                  Thumbnail Image URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={modalForm.image}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, image: e.target.value })
                    }
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-[#17233D] outline-none"
                    placeholder="https://..."
                  />
                  <div className="w-10 h-8 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                    <img
                      src={modalForm.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3B6EF5] hover:bg-[#2563EB] text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  {editingId ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCategories;
