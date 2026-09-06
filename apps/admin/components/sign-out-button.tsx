"use client";

import React, { useTransition } from "react";
import { logoutAdminAction } from "../app/actions";

export function AdminSignOutButton() {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      const res = await logoutAdminAction();
      if (res.redirectUrl) {
        window.location.href = res.redirectUrl;
      }
    });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className="text-xs font-mono text-slate-400 hover:text-white transition-colors underline"
    >
      {isPending ? "SIGNING OUT..." : "SIGN OUT"}
    </button>
  );
}
