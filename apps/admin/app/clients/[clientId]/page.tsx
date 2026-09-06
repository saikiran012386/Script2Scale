"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Badge, Button, Card, CardTitle, CardContent } from "@script2scale/ui";
import {
  getClientDetailAction,
  toggleClientStatusAction,
  inviteClientAction
} from "../../actions";

export default function ClientDetailPage({ params }: { params: { clientId: string } }) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const loadClientDetail = async () => {
    setIsLoading(true);
    const result = await getClientDetailAction(params.clientId);
    setData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    loadClientDetail();
  }, [params.clientId]);

  const handleToggleStatus = () => {
    if (!data?.client) return;
    const nextStatus = data.client.status === "ACTIVE" ? "DISABLED" : "ACTIVE";
    setNotice(null);

    startTransition(async () => {
      const res = await toggleClientStatusAction(data.client.id, nextStatus);
      if (res.success) {
        setNotice({ type: "success", message: res.message || "Status updated." });
        loadClientDetail();
      } else {
        setNotice({ type: "error", message: res.message || "Failed to update status." });
      }
    });
  };

  const handleResendInvite = () => {
    if (!data?.client) return;
    setNotice(null);

    const formData = new FormData();
    formData.append("name", data.client.name);
    formData.append("email", data.client.email);
    if (data.client.companyName) formData.append("companyName", data.client.companyName);

    startTransition(async () => {
      const res = await inviteClientAction(formData);
      if (res.success) {
        setNotice({ type: "success", message: res.message || "Invitation resent." });
        loadClientDetail();
      } else {
        setNotice({ type: "error", message: res.message || "Failed to resend invitation." });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-slate-400 font-mono text-sm">
        Loading client profile record...
      </div>
    );
  }

  if (!data || !data.client) {
    return (
      <div className="space-y-6">
        <a href="/clients" className="text-xs font-mono text-emerald-400 hover:underline">
          ← BACK TO CLIENTS DIRECTORY
        </a>
        <div className="p-12 border border-slate-800 rounded-2xl bg-slate-900 text-center space-y-3">
          <p className="text-lg font-bold text-white uppercase">Client Not Found</p>
          <p className="text-xs text-slate-400">The requested client record does not exist or has been deleted.</p>
        </div>
      </div>
    );
  }

  const { client, users = [], projects = [] } = data;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Back Link & Header */}
      <div className="space-y-4 border-b border-slate-800 pb-6">
        <a href="/clients" className="text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors">
          ← BACK TO CLIENTS DIRECTORY
        </a>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
                {client.companyName || client.name}
              </h1>
              <Badge
                variant={client.status === "ACTIVE" ? "success" : "danger"}
                className="text-xs font-mono uppercase px-2.5 py-0.5"
              >
                {client.status}
              </Badge>
            </div>
            {client.companyName && (
              <p className="text-xs font-mono text-slate-400">Primary Contact: {client.name}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={handleResendInvite}
            >
              RESEND INVITATION
            </Button>
            <Button
              variant={client.status === "ACTIVE" ? "outline" : "magnetic-fill"}
              size="sm"
              disabled={isPending}
              onClick={handleToggleStatus}
            >
              {client.status === "ACTIVE" ? "DISABLE CLIENT" : "ENABLE CLIENT"}
            </Button>
          </div>
        </div>
      </div>

      {/* Notice Alert */}
      {notice && (
        <div
          className={`p-4 rounded-xl text-xs font-mono border flex items-center justify-between ${
            notice.type === "success"
              ? "bg-emerald-950/60 border-emerald-500/60 text-emerald-300"
              : "bg-red-950/60 border-red-500/60 text-red-300"
          }`}
        >
          <span>{notice.message}</span>
          <button onClick={() => setNotice(null)} className="text-slate-400 hover:text-white font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Overview Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-3">
          <CardTitle className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            PRIMARY CONTACT
          </CardTitle>
          <CardContent className="p-0 space-y-1">
            <p className="text-base font-bold text-white">{client.name}</p>
            <p className="text-xs font-mono text-emerald-400">{client.email}</p>
            {client.phone && <p className="text-xs font-mono text-slate-400">{client.phone}</p>}
          </CardContent>
        </Card>

        <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-3">
          <CardTitle className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            ACCOUNT METRICS
          </CardTitle>
          <CardContent className="p-0 space-y-1 font-mono text-xs text-slate-300">
            <p><strong className="text-white">Active Projects:</strong> {projects.filter((p: any) => p.status !== "DELIVERED").length}</p>
            <p><strong className="text-white">Total Projects:</strong> {projects.length}</p>
            <p><strong className="text-white">Linked Users:</strong> {users.length}</p>
          </CardContent>
        </Card>

        <Card variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-3">
          <CardTitle className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            ONBOARDING STATUS
          </CardTitle>
          <CardContent className="p-0 space-y-1 font-mono text-xs">
            <p className="text-slate-300">
              <strong className="text-white">Created:</strong> {new Date(client.createdAt).toLocaleDateString()}
            </p>
            <div className="pt-1">
              {users.some((u: any) => u.emailVerified) ? (
                <Badge variant="success" className="text-[10px] uppercase font-mono">
                  PORTAL ACTIVATED
                </Badge>
              ) : (
                <Badge variant="warning" className="text-[10px] uppercase font-mono">
                  INVITATION PENDING
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">
            ASSIGNED PROJECTS ({projects.length})
          </h2>
          <a href="/projects">
            <Button variant="outline" size="sm">
              + NEW PROJECT
            </Button>
          </a>
        </div>

        {projects.length === 0 ? (
          <Card variant="bordered" className="p-8 bg-slate-900/40 border-slate-800 text-center space-y-2">
            <p className="text-sm font-mono text-slate-400">No projects assigned to this client yet.</p>
            <p className="text-xs text-slate-500">Create a new project workspace to assign video versions, timelines, and review tools.</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((proj: any) => (
              <Card key={proj.id} variant="bordered" className="p-5 bg-slate-900/90 border-slate-800 hover:border-slate-700 transition-colors space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <a href={`/projects/${proj.id}`} className="font-bold text-white hover:text-emerald-400 transition-colors">
                      {proj.name}
                    </a>
                    {proj.description && <p className="text-xs text-slate-400 line-clamp-1">{proj.description}</p>}
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono text-emerald-400 border-emerald-500/30 uppercase">
                    {proj.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-500">
                  <span>Version: v{proj.latestVersion || 1}</span>
                  <a href={`/projects/${proj.id}`} className="text-emerald-400 hover:underline">
                    WORKSPACE →
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Associated Portal User Accounts */}
      <div className="space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">
            LINKED PORTAL USERS ({users.length})
          </h2>
        </div>

        <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-xs uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-3 font-semibold">User Name</th>
                <th className="px-6 py-3 font-semibold">Email Address</th>
                <th className="px-6 py-3 font-semibold">Role</th>
                <th className="px-6 py-3 font-semibold">Activation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((u: any) => (
                <tr key={u.id}>
                  <td className="px-6 py-4 font-bold text-white">{u.name || "Client User"}</td>
                  <td className="px-6 py-4 font-mono text-xs">{u.email}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-[10px] font-mono uppercase">
                      {u.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {u.emailVerified ? (
                      <span className="text-xs font-mono text-emerald-400">✓ Activated</span>
                    ) : (
                      <span className="text-xs font-mono text-amber-400">Invitation Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
