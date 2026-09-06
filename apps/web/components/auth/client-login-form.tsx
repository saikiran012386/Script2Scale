"use client";

import React, { useState } from "react";
import { Display, Label, Button, Card } from "@script2scale/ui";

export interface ClientLoginFormProps {
  portalUrl?: string;
  forgotPasswordHref?: string;
}

export function ClientLoginForm({
  portalUrl = "/dashboard",
  forgotPasswordHref = "/forgot-password"
}: ClientLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stubMessage, setStubMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStubMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const targetUrl = new URL(portalUrl, typeof window !== "undefined" ? window.location.href : "http://localhost:3002");
    if (email) {
      targetUrl.searchParams.set("email", email);
    }
    window.location.href = targetUrl.toString();
  };

  return (
    <Card variant="bordered" className="p-8 bg-surface-100/80 border-slate-800 shadow-2xl space-y-6">
      {/* Live Region for Screen-Reader Accessibility */}
      <div aria-live="polite" className="sr-only">
        {errors.email && `Email error: ${errors.email}. `}
        {errors.password && `Password error: ${errors.password}. `}
        {stubMessage && `Notification: ${stubMessage}`}
      </div>

      {/* Stub Message Alert Box */}
      {stubMessage && (
        <div className="p-4 bg-brand-yellow/10 border border-brand-yellow/40 rounded-xl text-xs font-mono text-brand-yellow space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 font-bold text-brand-yellow">
            <span>ℹ️ STUB AUTHENTICATION HANDLER</span>
          </div>
          <p className="leading-relaxed">{stubMessage}</p>
          <div className="pt-1">
            <a
              href={portalUrl}
              className="inline-block text-xs font-bold text-white underline hover:text-brand-yellow"
            >
              PREVIEW CLIENT PORTAL DASHBOARD SHELL →
            </a>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Email Field */}
        <div>
          <label
            htmlFor="client-login-email"
            className="block text-xs font-mono text-slate-300 mb-1.5 uppercase tracking-wider"
          >
            EMAIL ADDRESS <span className="text-brand-yellow">*</span>
          </label>
          <input
            id="client-login-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="client@company.com"
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "client-login-email-error" : undefined}
            className={`w-full rounded-xl bg-slate-900 border px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-slate-950 transition-colors ${
              errors.email ? "border-red-500" : "border-slate-800 focus:border-brand-yellow"
            }`}
          />
          {errors.email && (
            <p id="client-login-email-error" className="text-xs font-mono text-red-400 mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="client-login-password"
              className="text-xs font-mono text-slate-300 uppercase tracking-wider"
            >
              PASSWORD <span className="text-brand-yellow">*</span>
            </label>
            <a
              href={forgotPasswordHref}
              className="text-xs font-mono text-slate-400 hover:text-brand-yellow underline transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <input
            id="client-login-password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            placeholder="••••••••"
            aria-required="true"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "client-login-password-error" : undefined}
            className={`w-full rounded-xl bg-slate-900 border px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-slate-950 transition-colors ${
              errors.password ? "border-red-500" : "border-slate-800 focus:border-brand-yellow"
            }`}
          />
          {errors.password && (
            <p id="client-login-password-error" className="text-xs font-mono text-red-400 mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="magnetic-fill"
            size="lg"
            disabled={isSubmitting}
            className="w-full justify-center"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-brand-yellow border-t-transparent animate-spin" />
                AUTHENTICATING...
              </span>
            ) : (
              "SIGN IN TO PORTAL →"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
