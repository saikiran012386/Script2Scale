"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Button, Modal } from "@script2scale/ui";
import {
  getClientsAction,
  convertInquiryToProjectAction,
  ClientListItem,
  InquiryListItem
} from "../../app/actions";

export interface ConvertInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: InquiryListItem | null;
  onSuccess?: (projectId?: string) => void;
}

const SERVICE_OPTIONS = [
  "Video Editing",
  "Thumbnail Design",
  "Poster Design",
  "Brochure Design",
  "Motion Graphics",
  "Full Post-Production Package"
];

export function ConvertInquiryModal({
  isOpen,
  onClose,
  inquiry,
  onSuccess
}: ConvertInquiryModalProps) {
  const [clients, setClients] = useState<ClientListItem[]>([]);
  const [clientId, setClientId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [serviceType, setServiceType] = useState(SERVICE_OPTIONS[0]);
  const [deadline, setDeadline] = useState("");
  const [revisionLimit, setRevisionLimit] = useState("3");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isOpen && inquiry) {
      getClientsAction().then((data) => {
        setClients(data);
        const matchedClient = data.find(
          (c) => c.email.toLowerCase() === inquiry.email.toLowerCase()
        );
        if (matchedClient) {
          setClientId(matchedClient.id);
        } else if (data.length > 0) {
          setClientId(data[0].id);
        }
      });

      setProjectName(`${inquiry.company || inquiry.fullName} Campaign 2026`);
      if (inquiry.services && inquiry.services.length > 0) {
        const matchingSrv = SERVICE_OPTIONS.find((opt) =>
          inquiry.services[0].toLowerCase().includes(opt.split(" ")[0].toLowerCase())
        );
        if (matchingSrv) setServiceType(matchingSrv);
      }
    }
    setMessage(null);
  }, [isOpen, inquiry]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inquiry) return;
    setMessage(null);

    if (!projectName || !clientId) {
      setMessage({ type: "error", text: "Project Name and Client assignment are required." });
      return;
    }

    startTransition(async () => {
      const res = await convertInquiryToProjectAction(
        inquiry.id,
        clientId,
        projectName,
        serviceType
      );
      if (res.success) {
        setMessage({ type: "success", text: res.message || "Inquiry converted to project." });
        if (onSuccess) onSuccess(res.projectId);
        setTimeout(() => onClose(), 600);
      } else {
        setMessage({ type: "error", text: res.message || "Failed to convert inquiry." });
      }
    });
  };

  if (!inquiry) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`CONVERT INQUIRY TO ACTIVE PROJECT`}>
      <div className="space-y-4">
        <p className="text-xs text-slate-400">
          Convert submission from <strong className="text-white">{inquiry.fullName}</strong> ({inquiry.company || inquiry.email}) into a live client project workspace.
        </p>

        {message && (
          <div
            className={`p-3 rounded-xl text-xs font-mono border ${
              message.type === "success"
                ? "bg-emerald-950/60 border-emerald-500/60 text-emerald-300"
                : "bg-red-950/60 border-red-500/60 text-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="convert-client" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              ASSIGNED PARTNER CLIENT <span className="text-emerald-400">*</span>
            </label>
            <select
              id="convert-client"
              required
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {clients.length === 0 ? (
                <option value="">No existing client found (Acme Corp fallback)</option>
              ) : (
                clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.companyName ? `${c.companyName} (${c.name})` : c.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label htmlFor="convert-project-name" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              NEW PROJECT WORKSPACE NAME <span className="text-emerald-400">*</span>
            </label>
            <input
              id="convert-project-name"
              type="text"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Horizon Founder Series Q4"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="convert-service" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                SERVICE OFFERING
              </label>
              <select
                id="convert-service"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {SERVICE_OPTIONS.map((srv) => (
                  <option key={srv} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="convert-revisions" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                REVISION LIMIT
              </label>
              <input
                id="convert-revisions"
                type="number"
                min="1"
                max="10"
                value={revisionLimit}
                onChange={(e) => setRevisionLimit(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="convert-deadline" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              INTERNAL TARGET DEADLINE
            </label>
            <input
              id="convert-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">CLIENT STATED TIMELINE & BRIEF</span>
            <p className="text-xs text-slate-300 italic font-mono">
              &quot;{inquiry.timeline || "Flexible"}&quot; — {inquiry.projectDetails.slice(0, 100)}...
            </p>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              CANCEL
            </Button>
            <Button type="submit" variant="magnetic-fill" size="sm" disabled={isPending}>
              {isPending ? "INITIALIZING WORKSPACE..." : "CREATE WORKSPACE →"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
