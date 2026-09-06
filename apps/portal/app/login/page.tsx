"use client";

import React, { useState, useTransition } from "react";
import { Display, Label, Button, Card } from "@script2scale/ui";
import { loginClientAction } from "../actions";

export default function PortalLoginPage() {
  const [email, setEmail] = useState("john@acme.com");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await loginClientAction(formData);
      if (!res.success) {
        setError(res.message || "Sign in failed.");
      } else if (res.redirectUrl) {
        window.location.href = res.redirectUrl;
      }
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center py-12 px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Label uppercase mono size="xs" className="text-emerald-400">
            CLIENT PORTAL WORKSPACE
          </Label>
          <Display size="xl" className="tracking-tighter uppercase text-white">
            PORTAL SIGN IN.
          </Display>
          <p className="text-xs text-slate-400">
            Access active video versions, feedback timelines, and watermarked review tools.
          </p>
        </div>

        <Card variant="bordered" className="p-8 bg-surface-100/80 border-slate-800 space-y-5">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="portal-email" className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                EMAIL ADDRESS *
              </label>
              <input
                id="portal-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                required
                className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="portal-password" className="text-xs font-mono text-slate-300 uppercase">
                  PASSWORD *
                </label>
                <a href="/forgot-password" className="text-xs font-mono text-slate-400 hover:text-emerald-400 underline">
                  Forgot password?
                </a>
              </div>
              <input
                id="portal-password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                required
                className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950"
              />
            </div>

            {error && <p className="text-xs font-mono text-red-400">{error}</p>}

            <Button
              type="submit"
              variant="magnetic-fill"
              size="lg"
              disabled={isPending}
              className="w-full justify-center"
            >
              {isPending ? "SIGNING IN..." : "SIGN IN TO PORTAL →"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
