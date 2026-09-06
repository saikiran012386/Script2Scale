"use client";

import React, { useState } from "react";
import { Display, Label, Button, Card } from "@script2scale/ui";
import { loginAdminAction } from "../actions";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("owner@script2scale.com");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await loginAdminAction(formData);
    setIsSubmitting(false);

    if (res.success && res.redirectUrl) {
      window.location.href = res.redirectUrl;
    } else {
      setError(res.message || "Failed to log in as admin.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Label uppercase mono size="xs" className="text-emerald-400">
            INTERNAL ADMIN SYSTEM
          </Label>
          <Display size="2xl" className="tracking-tighter uppercase text-white">
            ADMIN <span className="text-emerald-500 font-mono">/</span> LOGIN.
          </Display>
          <p className="text-xs text-slate-400">
            Authorized Owner & CMS Management Gateway.
          </p>
        </div>

        <Card variant="bordered" className="p-8 bg-surface-100/80 border-slate-800 space-y-5">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                ADMIN EMAIL *
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                PASSWORD *
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
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
              {isSubmitting ? "AUTHENTICATING..." : "SIGN IN AS OWNER →"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
