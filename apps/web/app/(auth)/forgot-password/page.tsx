"use client";

import React, { useState } from "react";
import { Display, Label, Button, Card } from "@script2scale/ui";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-between p-6 md:p-12">
      {/* Header Back Link */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
        <a href="/client-login" className="flex items-center gap-2 font-mono text-sm text-slate-400 hover:text-brand-yellow transition-colors">
          <span>←</span>
          <span>BACK TO LOGIN</span>
        </a>
        <span className="text-xs font-mono text-slate-600 uppercase tracking-widest">
          PASSWORD RECOVERY
        </span>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md mx-auto my-auto py-12 space-y-6">
        <div className="text-center space-y-2">
          <Label uppercase mono size="xs" className="text-brand-yellow">
            ACCOUNT ACCESS
          </Label>
          <Display size="xl" className="tracking-tight uppercase">
            RESET PASSWORD.
          </Display>
          <p className="text-xs text-slate-400">
            Enter your registered account email to receive a password reset link.
          </p>
        </div>

        <Card variant="bordered" className="p-8 bg-surface-100/80 border-slate-800 space-y-6">
          {isSubmitted ? (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-brand-yellow/10 border border-brand-yellow flex items-center justify-center mx-auto text-brand-yellow text-lg font-bold">
                ✓
              </div>
              <h4 className="text-base font-bold text-white">Instructions Sent</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                If an account exists for <span className="text-brand-yellow underline">{email}</span>, password reset instructions have been sent to your inbox.
              </p>
              <div className="pt-2">
                <a href="/client-login">
                  <Button variant="secondary" size="md" className="w-full justify-center">
                    RETURN TO SIGN IN
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="forgot-email" className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  ACCOUNT EMAIL *
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="client@company.com"
                  required
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow"
                />
                {error && <p className="text-xs font-mono text-red-400 mt-1">{error}</p>}
              </div>

              <Button type="submit" variant="magnetic-fill" size="lg" className="w-full justify-center">
                SEND RESET INSTRUCTIONS →
              </Button>
            </form>
          )}
        </Card>
      </div>

      <div className="w-full max-w-6xl mx-auto text-center border-t border-slate-900 pt-6">
        <p className="text-xs font-mono text-slate-600">
          Script2Scale Client Portal Security
        </p>
      </div>
    </main>
  );
}
