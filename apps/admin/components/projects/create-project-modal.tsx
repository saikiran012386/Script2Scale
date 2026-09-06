"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Button, Modal } from "@script2scale/ui";
import { createProjectAction, getClientsAction, ClientListItem } from "../../app/actions";

export interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export function CreateProjectModal({ isOpen, onClose, onSuccess }: CreateProjectModalProps) {
  const [clients, setClients] = useState<ClientListItem[]>([]);
  const [clientId, setClientId] = useState("");
  const [name, setName] = useState("");
  const [serviceType, setServiceType] = useState(SERVICE_OPTIONS[0]);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [revisionLimit, setRevisionLimit] = useState("3");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isOpen) {
      getClientsAction().then((data) => {
        setClients(data);
        if (data.length > 0) setClientId(data[0].id);
      });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    if (!name || !clientId) {
      setMessage({ type: "error", text: "Project Name and Client selection are required." });
      return;
    }

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await createProjectAction(formData);
      if (res.success) {
        setMessage({ type: "success", text: res.message || "Project created successfully." });
        setName("");
        setDescription("");
        setDeadline("");
        if (onSuccess) onSuccess(res.projectId);
      } else {
        setMessage({ type: "error", text: res.message || "Failed to create project." });
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="CREATE NEW PROJECT">
      <div className="space-y-4">
        <p className="text-xs text-slate-400">
          Initialize a new project workspace, assign partner client, set deadlines, and configure revision limits.
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
            <label htmlFor="project-client" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              ASSIGNED CLIENT <span className="text-emerald-400">*</span>
            </label>
            <select
              id="project-client"
              name="clientId"
              required
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {clients.length === 0 ? (
                <option value="">No clients found (Acme Corp fallback)</option>
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
            <label htmlFor="project-name" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              PROJECT NAME <span className="text-emerald-400">*</span>
            </label>
            <input
              id="project-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Acme Brand Anthem 2026"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="project-service" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                SERVICE OFFERING
              </label>
              <select
                id="project-service"
                name="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {SERVICE_OPTIONS.map((srv) => (
                  <option key={srv} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="project-revisions" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                REVISION LIMIT
              </label>
              <input
                id="project-revisions"
                name="revisionLimit"
                type="number"
                min="1"
                max="10"
                value={revisionLimit}
                onChange={(e) => setRevisionLimit(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="project-deadline" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              TARGET DEADLINE
            </label>
            <input
              id="project-deadline"
              name="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="project-description" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              PROJECT BRIEF / DESCRIPTION
            </label>
            <textarea
              id="project-description"
              name="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Key project objectives, deliverables, and specifications..."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              CANCEL
            </Button>
            <Button type="submit" variant="magnetic-fill" size="sm" disabled={isPending}>
              {isPending ? "CREATING WORKSPACE..." : "CREATE WORKSPACE →"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
