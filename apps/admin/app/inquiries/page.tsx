"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Badge, Button, Card } from "@script2scale/ui";
import {
  getInquiriesAction,
  updateInquiryStatusAction,
  InquiryListItem
} from "../actions";
import { DataTable } from "../../components/data-table/data-table";
import { InquiryDetailModal } from "../../components/inquiries/inquiry-detail-modal";
import { ConvertInquiryModal } from "../../components/inquiries/convert-inquiry-modal";

const STATUS_TABS = [
  "ALL",
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "CONVERTED",
  "ARCHIVED"
] as const;

function getStatusBadgeVariant(status: string): "default" | "success" | "warning" | "brand" | "outline" {
  switch (status) {
    case "NEW":
      return "brand";
    case "CONTACTED":
      return "warning";
    case "QUALIFIED":
    case "PROPOSAL_SENT":
      return "default";
    case "CONVERTED":
      return "success";
    case "ARCHIVED":
    default:
      return "outline";
  }
}

export default function InquiriesInboxPage() {
  const [inquiries, setInquiries] = useState<InquiryListItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(true);

  const [selectedInquiry, setSelectedInquiry] = useState<InquiryListItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);

  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const loadInquiries = async () => {
    setIsLoading(true);
    const data = await getInquiriesAction(search, statusFilter);
    setInquiries(data);
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadInquiries();
    }, 200);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const handleStatusChange = (inquiryId: string, newStatus: string) => {
    setNotice(null);
    startTransition(async () => {
      const res = await updateInquiryStatusAction(inquiryId, newStatus);
      if (res.success) {
        setNotice({ type: "success", message: res.message || "Inquiry status updated." });
        loadInquiries();
        if (selectedInquiry && selectedInquiry.id === inquiryId) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus as any });
        }
      } else {
        setNotice({ type: "error", message: res.message || "Failed to update status." });
      }
    });
  };

  const handleOpenDetailModal = (inq: InquiryListItem) => {
    setSelectedInquiry(inq);
    setIsDetailModalOpen(true);
  };

  const handleOpenConvertModal = (inq: InquiryListItem) => {
    setSelectedInquiry(inq);
    setIsConvertModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono text-brand-yellow uppercase tracking-widest block mb-1">
            CLIENT INQUIRIES & LEAD PIPELINE
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
            INCOMING <span className="text-brand-yellow font-mono">/</span> SUBMISSIONS.
          </h1>
          <p className="text-sm text-slate-400">
            Review incoming project inquiries from the &quot;Start a Project&quot; form and convert qualified leads into active project workspaces.
          </p>
        </div>
      </div>

      {/* Action Alert */}
      {notice && (
        <div
          className={`p-4 rounded-xl text-xs font-mono border flex items-center justify-between ${
            notice.type === "success"
              ? "bg-brand-yellow/10 border-brand-yellow/50 text-brand-yellow"
              : "bg-red-950/60 border-red-500/60 text-red-300"
          }`}
        >
          <span>{notice.message}</span>
          <button onClick={() => setNotice(null)} className="text-slate-400 hover:text-white font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <Card variant="bordered" className="p-4 bg-slate-900/90 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by lead name, email, or company..."
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="text-xs font-mono text-slate-400 mr-1 uppercase">LEAD STAGE:</span>
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-colors ${
                statusFilter === tab
                  ? "bg-brand-yellow text-brand-black font-bold"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      {/* Inquiries Data Table */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 font-mono text-sm">
          Loading incoming submissions...
        </div>
      ) : (
        <DataTable
          data={inquiries}
          columns={[
            {
              header: "Lead Contact",
              accessorKey: (i) => (
                <div>
                  <button
                    onClick={() => handleOpenDetailModal(i)}
                    className="font-bold text-white hover:text-brand-yellow transition-colors text-left block"
                  >
                    {i.fullName}
                  </button>
                  <span className="text-xs text-slate-400 font-mono block">{i.email}</span>
                </div>
              )
            },
            {
              header: "Company / Channel",
              accessorKey: (i) => (
                <span className="text-sm font-semibold text-slate-300">
                  {i.company || "Direct Individual"}
                </span>
              )
            },
            {
              header: "Services Requested",
              accessorKey: (i) => (
                <div className="flex flex-wrap gap-1 max-w-xs">
                  {i.services && i.services.length > 0 ? (
                    i.services.map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-brand-yellow border border-slate-800">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs font-mono text-slate-500">Video Editing</span>
                  )}
                </div>
              )
            },
            {
              header: "Budget & Timeline",
              accessorKey: (i) => (
                <div>
                  <span className="text-xs font-mono text-white block">{i.budgetRange || "Flexible"}</span>
                  <span className="text-[10px] font-mono text-slate-400 block">{i.timeline || "Standard"}</span>
                </div>
              )
            },
            {
              header: "Lead Status",
              accessorKey: (i) => (
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusBadgeVariant(i.status)} className="text-[10px] font-mono uppercase px-2 py-0.5">
                    {i.status}
                  </Badge>
                  <select
                    disabled={isPending}
                    value={i.status}
                    onChange={(e) => handleStatusChange(i.id, e.target.value)}
                    className="bg-slate-950 text-[10px] font-mono text-slate-300 border border-slate-800 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-brand-yellow"
                  >
                    {STATUS_TABS.filter((t) => t !== "ALL").map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              )
            },
            {
              header: "Actions",
              accessorKey: (i) => (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleOpenDetailModal(i)}
                    className="text-xs font-mono font-bold text-slate-300 hover:text-white hover:underline"
                  >
                    INSPECT BRIEF
                  </button>

                  {i.convertedProjectId ? (
                    <a
                      href={`/projects/${i.convertedProjectId}`}
                      className="text-xs font-mono font-bold text-brand-yellow hover:underline"
                    >
                      OPEN WORKSPACE →
                    </a>
                  ) : (
                    <button
                      onClick={() => handleOpenConvertModal(i)}
                      className="text-xs font-mono font-bold text-brand-yellow hover:underline"
                    >
                      CONVERT →
                    </button>
                  )}
                </div>
              )
            }
          ]}
        />
      )}

      {/* Inquiry Detail Modal */}
      <InquiryDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        inquiry={selectedInquiry}
        onStatusChange={handleStatusChange}
        onOpenConvertModal={handleOpenConvertModal}
      />

      {/* Convert Inquiry Modal */}
      <ConvertInquiryModal
        isOpen={isConvertModalOpen}
        onClose={() => setIsConvertModalOpen(false)}
        inquiry={selectedInquiry}
        onSuccess={() => {
          setIsConvertModalOpen(false);
          loadInquiries();
        }}
      />
    </div>
  );
}
