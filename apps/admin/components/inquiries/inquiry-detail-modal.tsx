"use client";

import React from "react";
import { Badge, Button, Modal } from "@script2scale/ui";
import { InquiryListItem } from "../../app/actions";

export interface InquiryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: InquiryListItem | null;
  onStatusChange: (inquiryId: string, newStatus: string) => void;
  onOpenConvertModal: (inquiry: InquiryListItem) => void;
}

const INQUIRY_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "CONVERTED",
  "ARCHIVED"
];

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

export function InquiryDetailModal({
  isOpen,
  onClose,
  inquiry,
  onStatusChange,
  onOpenConvertModal
}: InquiryDetailModalProps) {
  if (!inquiry) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`INQUIRY SUBMISSION: ${inquiry.fullName}`}>
      <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin">
        {/* Status Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-3">
            <Badge variant={getStatusBadgeVariant(inquiry.status)} className="text-xs font-mono uppercase px-2.5 py-1">
              {inquiry.status}
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              Submitted: {new Date(inquiry.createdAt).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="inquiry-status-select" className="text-xs font-mono text-slate-400 uppercase">
              STATUS:
            </label>
            <select
              id="inquiry-status-select"
              value={inquiry.status}
              onChange={(e) => onStatusChange(inquiry.id, e.target.value)}
              className="bg-slate-900 text-xs font-mono text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {INQUIRY_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Client Contact Grid */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-surface-100 border border-slate-800">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">FULL NAME</span>
            <p className="text-sm font-bold text-white mt-0.5">{inquiry.fullName}</p>
          </div>

          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">COMPANY / CHANNEL</span>
            <p className="text-sm font-bold text-white mt-0.5">{inquiry.company || "Not specified"}</p>
          </div>

          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">EMAIL ADDRESS</span>
            <a href={`mailto:${inquiry.email}`} className="text-xs font-mono text-emerald-400 hover:underline mt-0.5 block">
              {inquiry.email}
            </a>
          </div>

          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">PHONE NUMBER</span>
            <p className="text-xs font-mono text-slate-300 mt-0.5">{inquiry.phone || "Not provided"}</p>
          </div>
        </div>

        {/* Project Scope & Requirements */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase block mb-1">SERVICES REQUESTED</span>
            <div className="flex flex-wrap gap-2">
              {inquiry.services && inquiry.services.length > 0 ? (
                inquiry.services.map((srv) => (
                  <span key={srv} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 text-emerald-300 border border-slate-800">
                    {srv}
                  </span>
                ))
              ) : (
                <span className="text-xs font-mono text-slate-500">General Video Production</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">ESTIMATED BUDGET</span>
              <p className="text-xs font-mono font-bold text-white mt-0.5">{inquiry.budgetRange || "Flexible"}</p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">TARGET TIMELINE</span>
              <p className="text-xs font-mono font-bold text-white mt-0.5">{inquiry.timeline || "Standard"}</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase block mb-1">PROJECT DETAILS / BRIEF</span>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
              {inquiry.projectDetails || "No additional project brief text supplied."}
            </div>
          </div>

          {inquiry.referenceLinks && (
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">REFERENCE LINKS & ASSETS</span>
              <a
                href={inquiry.referenceLinks}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-emerald-400 hover:underline break-all block"
              >
                {inquiry.referenceLinks}
              </a>
            </div>
          )}
        </div>

        {/* Modal Action Bar */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={onClose}>
            CLOSE
          </Button>

          {inquiry.convertedProjectId ? (
            <a href={`/projects/${inquiry.convertedProjectId}`}>
              <Button variant="outline" size="sm" className="text-emerald-400 border-emerald-500">
                VIEW CONVERTED WORKSPACE →
              </Button>
            </a>
          ) : (
            <Button
              variant="magnetic-fill"
              size="sm"
              onClick={() => {
                onClose();
                onOpenConvertModal(inquiry);
              }}
            >
              CONVERT TO ACTIVE PROJECT →
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
