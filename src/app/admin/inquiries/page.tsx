"use client";

import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Inbox, Mail, Phone, Building, Calendar, Trash2, CheckCircle2, RefreshCw } from "lucide-react";

interface InquiryData {
  id: string;
  clientName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  serviceNeeded: string;
  budgetRange: string;
  message: string;
  status: string; // NEW, CONTACTED, CONVERTED, ARCHIVED
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryData | null>(null);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      const json = await res.json();
      if (json.success) {
        setInquiries(json.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (json.success) {
        setInquiries(inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setInquiries(inquiries.filter((inq) => inq.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredInquiries =
    statusFilter === "ALL"
      ? inquiries
      : inquiries.filter((inq) => inq.status === statusFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-purple-100 text-purple-900 border-purple-300";
      case "CONTACTED":
        return "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300";
      case "CONVERTED":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <AdminHeader
        title="Leads & Tariff Inquiries"
        subtitle="Manage inbound project inquiries, client budgets, and qualification status"
      />

      <main className="p-6 sm:p-8 max-w-7xl space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-700 font-bold">Filter Status:</span>
            <div className="flex flex-wrap gap-1 rounded-xl bg-white p-1 border border-purple-200 shadow-sm">
              {["ALL", "NEW", "CONTACTED", "CONVERTED", "ARCHIVED"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all font-bold ${
                    statusFilter === st
                      ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-sm shadow-purple-500/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-purple-50"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={loadInquiries}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-purple-200 text-xs font-mono font-bold text-slate-700 hover:bg-purple-50 transition shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5 text-purple-600" />
            <span>Refresh Inbox</span>
          </button>
        </div>

        {/* Inquiries Content Grid */}
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="rounded-3xl border border-purple-200 bg-white/90 p-12 text-center text-slate-700 shadow-sm">
            <Inbox className="h-10 w-10 mx-auto mb-3 text-purple-400" />
            <p className="text-sm font-mono font-bold">No inquiries matching the selected filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* List */}
            <div className="lg:col-span-6 space-y-3">
              {filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className={`cursor-pointer rounded-3xl p-5 border transition-all shadow-sm ${
                    selectedInquiry?.id === inq.id
                      ? "bg-purple-50/80 border-purple-400 shadow-md shadow-purple-500/10"
                      : "bg-white/90 border-purple-200 hover:border-purple-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-display font-bold text-base text-slate-900">
                        {inq.clientName}
                      </h4>
                      <div className="text-xs text-purple-600 font-mono font-medium">
                        {inq.company || inq.email}
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border font-bold ${getStatusBadge(
                        inq.status
                      )}`}
                    >
                      {inq.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 mt-3 pt-3 border-t border-purple-100 font-medium">
                    <span className="text-purple-700 font-bold">{inq.serviceNeeded}</span>
                    <span>•</span>
                    <span className="text-slate-900 font-bold">{inq.budgetRange}</span>
                    <span>•</span>
                    <span className="text-slate-500">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Detail View */}
            <div className="lg:col-span-6">
              {selectedInquiry ? (
                <div className="rounded-3xl border border-purple-200 bg-white/90 p-6 sm:p-8 space-y-6 sticky top-24 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-purple-100">
                    <div>
                      <span className="text-[10px] font-mono text-purple-600 uppercase font-bold">
                        Lead Information
                      </span>
                      <h3 className="font-display font-black text-2xl text-slate-900 mt-0.5">
                        {selectedInquiry.clientName}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleDelete(selectedInquiry.id)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition"
                      title="Delete Lead"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Status Switcher */}
                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1.5 uppercase font-bold">
                      Update Lead Lifecycle Status:
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {["NEW", "CONTACTED", "CONVERTED", "ARCHIVED"].map((st) => (
                        <button
                          key={st}
                          onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                          className={`py-1.5 rounded-lg text-[10px] font-mono transition border font-bold ${
                            selectedInquiry.status === st
                              ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white border-purple-500 shadow-sm"
                              : "bg-purple-50/50 border-purple-200 text-slate-700 hover:text-slate-900 hover:bg-purple-100"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3 rounded-2xl bg-purple-50/50 border border-purple-200">
                      <div className="text-purple-600 uppercase text-[10px] font-bold">Email Address</div>
                      <a
                        href={`mailto:${selectedInquiry.email}`}
                        className="text-slate-900 hover:text-purple-600 font-bold mt-1 block truncate"
                      >
                        {selectedInquiry.email}
                      </a>
                    </div>

                    <div className="p-3 rounded-2xl bg-purple-50/50 border border-purple-200">
                      <div className="text-purple-600 uppercase text-[10px] font-bold">Phone Number</div>
                      <div className="text-slate-900 font-bold mt-1">
                        {selectedInquiry.phone || "Not provided"}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-purple-50/50 border border-purple-200">
                      <div className="text-purple-600 uppercase text-[10px] font-bold">Company / Brand</div>
                      <div className="text-slate-900 font-bold mt-1">
                        {selectedInquiry.company || "Not provided"}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-purple-50/50 border border-purple-200">
                      <div className="text-purple-600 uppercase text-[10px] font-bold">Monthly Budget</div>
                      <div className="text-purple-700 font-bold mt-1">
                        {selectedInquiry.budgetRange}
                      </div>
                    </div>
                  </div>

                  {/* Service Needed */}
                  <div className="p-3 rounded-2xl bg-purple-50/50 border border-purple-200 text-xs font-mono">
                    <div className="text-purple-600 uppercase text-[10px] font-bold">Target Route / Tariff</div>
                    <div className="text-slate-900 font-bold mt-1">
                      {selectedInquiry.serviceNeeded}
                    </div>
                  </div>

                  {/* Client Message */}
                  <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-1">
                    <div className="text-[10px] font-mono text-purple-600 uppercase font-bold">
                      Client Brief / Message
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 font-sans leading-relaxed whitespace-pre-wrap font-medium">
                      {selectedInquiry.message}
                    </p>
                  </div>

                  {/* Reply Button */}
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Nord Media House Consultation Follow-up`}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-purple-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] transition"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send Reply Email</span>
                  </a>
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-purple-200 p-12 text-center text-slate-500 text-xs font-mono font-medium">
                  Select an inquiry from the left list to view full lead brief and update status.
                </div>
              )}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
