import React from "react";
import { FiUsers, FiPlus, FiUserCheck, FiPhone, FiMail } from "react-icons/fi";

const usersData = [
  {
    id: "usr-1",
    name: "Rocky Kumar",
    email: "rocky@devbhoomistay.com",
    phone: "+91 93688 25518",
    role: "Admin",
    hotel: "All Platform Properties",
    status: "Active",
  },
  {
    id: "usr-2",
    name: "Suresh Rawat",
    email: "suresh@lansdowneheights.com",
    phone: "+91 98765 12345",
    role: "Owner",
    hotel: "Lansdowne Heights Updated",
    status: "Active",
  },
  {
    id: "usr-3",
    name: "Anita Negi",
    email: "anita@mountainview.com",
    phone: "+91 98765 67890",
    role: "Owner",
    hotel: "Mountain View Retreat",
    status: "Active",
  },
];

const Users = () => {
  return (
    <div className="space-y-6 font-['Inter']">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Users & Property Owners
          </h1>
          <p className="text-sm text-[#64748B]">
            Manage platform administrators and verified hotel owner accounts
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0E4D3C] hover:bg-[#072B22] text-white text-xs font-bold transition-colors shadow-xs">
          <FiPlus className="w-4 h-4" />
          <span>Add New Owner</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                <th className="py-3 px-4">User Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Assigned Property</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {usersData.map((u) => (
                <tr key={u.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#0F172A]">
                    {u.name}
                  </td>
                  <td className="py-3.5 px-4 text-[#475569]">
                    {u.email}
                  </td>
                  <td className="py-3.5 px-4 text-[#64748B]">
                    {u.phone}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        u.role === "Admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-teal-100 text-teal-800"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#0F172A] font-medium">
                    {u.hotel}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
