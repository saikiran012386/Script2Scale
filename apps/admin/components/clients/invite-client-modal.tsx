"use client";

import React, { useState, useTransition } from "react";
import { Button, Modal } from "@script2scale/ui";
import { inviteClientAction, InviteClientResult } from "../../app/actions";

export interface InviteClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function InviteClientModal({ isOpen, onClose, onSuccess }: InviteClientModalProps) {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<InviteClientResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);

    if (!name || !email) {
      setResult({ success: false, message: "Name and Email are required." });
      return;
    }

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await inviteClientAction(formData);
      setResult(res);

      if (res.success) {
        setName("");
        setCompanyName("");
        setEmail("");
        setPhone("");
        if (onSuccess) onSuccess();
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="INVITE NEW CLIENT">
      <div className="space-y-4">
        <p className="text-xs text-slate-400">
          Create client record and send 48-hour workspace activation invitation email.
        </p>

        {result && (
          <div
            className={`p-4 rounded-xl text-xs font-mono border space-y-2 ${
              result.success
                ? "bg-emerald-950/60 border-emerald-500/60 text-emerald-300"
                : "bg-red-950/60 border-red-500/60 text-red-300"
            }`}
          >
            <p className="font-bold">{result.message}</p>
            {result.invitationUrl && (
              <div className="pt-1 border-t border-emerald-800/40">
                <span className="block text-[10px] text-slate-400 mb-1">ACTIVATION LINK:</span>
                <input
                  readOnly
                  value={result.invitationUrl}
                  className="w-full bg-slate-950 border border-emerald-900 rounded px-2 py-1 text-[11px] text-emerald-400 font-mono select-all focus:outline-none"
                />
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="invite-name" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              CONTACT NAME <span className="text-emerald-400">*</span>
            </label>
            <input
              id="invite-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Smith"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="invite-company" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              COMPANY NAME
            </label>
            <input
              id="invite-company"
              name="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. NeoTech Inc"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="invite-email" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              EMAIL ADDRESS <span className="text-emerald-400">*</span>
            </label>
            <input
              id="invite-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@company.com"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="invite-phone" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              PHONE NUMBER
            </label>
            <input
              id="invite-phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              CANCEL
            </Button>
            <Button type="submit" variant="magnetic-fill" size="sm" disabled={isPending}>
              {isPending ? "SENDING INVITE..." : "DISPATCH INVITATION →"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
