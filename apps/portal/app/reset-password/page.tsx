"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Display, Label, Button, Card } from "@script2scale/ui";
import { resetPasswordAction } from "../actions";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const res = await resetPasswordAction(token, password);
    setIsSubmitting(false);

    if (res.success && res.redirectUrl) {
      window.location.href = res.redirectUrl;
    } else {
      setError(res.message || "Failed to reset password. Link may be expired.");
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center py-12 px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Label uppercase mono size="xs" className="text-brand-yellow">
            ACCOUNT RECOVERY
          </Label>
          <Display size="xl" className="tracking-tighter uppercase text-white">
            SET NEW PASSWORD.
          </Display>
          <p className="text-xs text-slate-400">
            Enter your new password below to regain access to your account.
          </p>
        </div>

        <Card variant="bordered" className="p-8 bg-surface-100/80 border-slate-800 space-y-5">
          {!token ? (
            <div className="text-center space-y-3 p-4 bg-red-950/40 border border-red-800 rounded-xl">
              <p className="text-xs font-mono text-red-300">
                Invalid or missing password reset token. Please request a new link.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="reset-password" className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  NEW PASSWORD *
                </label>
                <input
                  id="reset-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow"
                />
              </div>

              <div>
                <label htmlFor="reset-confirm" className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  CONFIRM NEW PASSWORD *
                </label>
                <input
                  id="reset-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow"
                />
              </div>

              {error && <p className="text-xs font-mono text-red-400">{error}</p>}

              <Button
                type="submit"
                variant="magnetic-fill"
                size="lg"
                disabled={isSubmitting}
                className="w-full justify-center"
              >
                {isSubmitting ? "UPDATING PASSWORD..." : "UPDATE PASSWORD →"}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs font-mono text-slate-500">LOADING RESET FORM...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
