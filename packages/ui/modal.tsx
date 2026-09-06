"use client";

import * as React from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          {title && <h2 className="text-lg font-semibold text-white">{title}</h2>}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
