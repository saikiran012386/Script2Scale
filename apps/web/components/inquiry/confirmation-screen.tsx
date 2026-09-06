"use client";

import React from "react";
import { Display, Button, Card, Label } from "@script2scale/ui";
import { CreateInquiryInput } from "@script2scale/types";

export interface ConfirmationScreenProps {
  inquiryData: CreateInquiryInput;
  inquiryId?: string;
  onReset: () => void;
}

export function ConfirmationScreen({ inquiryData, inquiryId }: ConfirmationScreenProps) {
  return (
    <div className="py-12 px-6 max-w-3xl mx-auto space-y-10 text-center animate-fade-in">
      {/* Animated Checkmark Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-brand-yellow/10 border-2 border-brand-yellow flex items-center justify-center shadow-2xl shadow-brand-yellow/20 animate-bounce-short">
          <svg
            className="w-10 h-10 text-brand-yellow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Main Title */}
      <div className="space-y-3">
        <Label uppercase mono size="xs" className="text-brand-yellow block tracking-widest">
          INQUIRY RECEIVED [{inquiryId || "CONFIRMED"}]
        </Label>
        <Display size="2xl" className="tracking-tighter uppercase text-white">
          GOT IT.
        </Display>
        <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto font-sans">
          Thanks <strong className="text-brand-yellow font-semibold">{inquiryData.fullName}</strong>! We've logged your request and sent a confirmation email to <span className="text-white underline">{inquiryData.email}</span>.
        </p>
      </div>

      {/* Inquiry Summary Box */}
      <Card variant="bordered" className="p-6 md:p-8 bg-surface-100/60 border-slate-800 text-left space-y-6">
        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3">
          SUBMISSION SUMMARY
        </h4>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-500 font-mono text-xs block">SERVICES</span>
            <span className="text-white font-bold">{inquiryData.services.join(", ")}</span>
          </div>
          <div>
            <span className="text-slate-500 font-mono text-xs block">TIMELINE</span>
            <span className="text-white font-medium">{inquiryData.timeline}</span>
          </div>
          {inquiryData.company && (
            <div>
              <span className="text-slate-500 font-mono text-xs block">COMPANY</span>
              <span className="text-slate-200">{inquiryData.company}</span>
            </div>
          )}
          {inquiryData.budgetRange && (
            <div>
              <span className="text-slate-500 font-mono text-xs block">ESTIMATED BUDGET</span>
              <span className="text-brand-yellow font-mono font-bold">{inquiryData.budgetRange}</span>
            </div>
          )}
        </div>
      </Card>

      {/* What's Next Process Expectations */}
      <div className="space-y-6 text-left border-t border-slate-800 pt-8">
        <h4 className="text-sm font-mono font-bold text-brand-yellow uppercase tracking-wider">
          WHAT HAPPENS NEXT?
        </h4>
        <div className="grid md:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-4 rounded-xl bg-surface-100/40 border border-slate-800/80 space-y-2">
            <span className="font-mono text-brand-orange font-bold block text-sm">01. REVIEW</span>
            <p className="text-slate-300">
              Our lead creative director will review your project scope and reference notes within 24 business hours.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-surface-100/40 border border-slate-800/80 space-y-2">
            <span className="font-mono text-brand-orange font-bold block text-sm">02. PROPOSAL</span>
            <p className="text-slate-300">
              You'll receive a detailed proposal with timeline milestones, pricing options, and a calendar link.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-surface-100/40 border border-slate-800/80 space-y-2">
            <span className="font-mono text-brand-orange font-bold block text-sm">03. KICKOFF</span>
            <p className="text-slate-300">
              Upon approval, your dedicated Client Portal workspace will be provisioned to begin production.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
        <a href="/">
          <Button variant="secondary" size="lg">
            RETURN TO HOME
          </Button>
        </a>
        <a href="/work">
          <Button variant="primary" size="lg">
            BROWSE OUR WORK →
          </Button>
        </a>
      </div>
    </div>
  );
}
