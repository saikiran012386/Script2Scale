"use client";

import React, { useState } from "react";
import { Display, Label, Button, Card } from "@script2scale/ui";

export default function PortalForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setIsSubmitted(true);
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center py-12 px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Label uppercase mono size="xs" className="text-brand-yellow">
            PORTAL RECOVERY
          </Label>
          <Display size="xl" className="tracking-tight uppercase text-white">
            FORGOT PASSWORD.
          </Display>
        </div>

        <Card variant="bordered" className="p-8 bg-surface-100/80 border-slate-800 space-y-4">
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <p className="text-xs font-mono text-brand-yellow">
                Password recovery link sent to <strong>{email}</strong>.
              </p>
              <a href="/login">
                <Button variant="secondary" size="sm" className="w-full justify-center">
                  RETURN TO LOGIN
                </Button>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="portal-forgot-email" className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  ENTER YOUR EMAIL *
                </label>
                <input
                  id="portal-forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow"
                />
              </div>
              <Button type="submit" variant="magnetic-fill" size="md" className="w-full justify-center">
                SEND RECOVERY LINK →
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
