"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Badge, Button, Card } from "@script2scale/ui";
import {
  getClientsAction,
  toggleClientStatusAction,
  deleteClientAction,
  ClientListItem
} from "../actions";
import { DataTable } from "../../components/data-table/data-table";
import { InviteClientModal } from "../../components/clients/invite-client-modal";

export default function ClientsDirectoryPage() {
  const [clients, setClients] = useState<ClientListItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "DISABLED">("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const loadClients = async () => {
    setIsLoading(true);
    const data = await getClientsAction(search, statusFilter);
    setClients(data);
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadClients();
    }, 200);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const handleToggleStatus = (client: ClientListItem) => {
    const nextStatus = client.status === "ACTIVE" ? "DISABLED" : "ACTIVE";
    setActionNotice(null);

    startTransition(async () => {
      const res = await toggleClientStatusAction(client.id, nextStatus);
      if (res.success) {
        setActionNotice({ type: "success", message: res.message || "Status updated." });
        loadClients();
      } else {
        setActionNotice({ type: "error", message: res.message || "Failed to update status." });
      }
    });
  };

  const handleDeleteClient = (client: ClientListItem) => {
    if (!confirm(`Are you sure you want to delete client ${client.name}?`)) {
      return;
    }
    setActionNotice(null);

    startTransition(async () => {
      const res = await deleteClientAction(client.id);
      if (res.success) {
        setActionNotice({ type: "success", message: res.message || "Client deleted." });
        loadClients();
      } else {
        setActionNotice({ type: "error", message: res.message || "Deletion blocked." });
      }
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono text-brand-yellow uppercase tracking-widest block mb-1">
            CLIENT WORKSPACE DIRECTORY
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
            CLIENTS <span className="text-brand-yellow font-mono">/</span> OVERVIEW.
          </h1>
          <p className="text-sm text-slate-400">
            Manage partner accounts, portal activation invitations, and access permissions.
          </p>
        </div>

        <Button
          variant="magnetic-fill"
          size="sm"
          onClick={() => setIsInviteOpen(true)}
          className="whitespace-nowrap"
        >
          + INVITE CLIENT
        </Button>
      </div>

      {/* Action Notice Alert */}
      {actionNotice && (
        <div
          className={`p-4 rounded-xl text-xs font-mono border flex items-center justify-between ${
            actionNotice.type === "success"
              ? "bg-brand-yellow/10 border-brand-yellow/50 text-brand-yellow"
              : "bg-red-950/60 border-red-500/60 text-red-300"
          }`}
        >
          <span>{actionNotice.message}</span>
          <button onClick={() => setActionNotice(null)} className="text-slate-400 hover:text-white font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <Card variant="bordered" className="p-4 bg-slate-900/90 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, or email..."
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-mono text-slate-400 mr-2 uppercase">STATUS:</span>
          {(["ALL", "ACTIVE", "DISABLED"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                statusFilter === tab
                  ? "bg-brand-yellow text-brand-black font-bold"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      {/* Directory Data Table */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 font-mono text-sm">
          Loading client records...
        </div>
      ) : (
        <DataTable
          data={clients}
          columns={[
            {
              header: "Client / Company",
              accessorKey: (c) => (
                <div>
                  <a href={`/clients/${c.id}`} className="font-bold text-white hover:text-brand-yellow transition-colors">
                    {c.companyName || c.name}
                  </a>
                  {c.companyName && <p className="text-xs text-slate-400 font-mono">Contact: {c.name}</p>}
                </div>
              )
            },
            {
              header: "Email Address",
              accessorKey: (c) => <span className="font-mono text-xs text-slate-300">{c.email}</span>
            },
            {
              header: "Projects",
              accessorKey: (c) => (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-mono text-brand-yellow border-brand-yellow/30">
                    {c.activeProjectsCount} Active
                  </Badge>
                  <span className="text-xs text-slate-500 font-mono">({c.projectsCount} Total)</span>
                </div>
              )
            },
            {
              header: "Status",
              accessorKey: (c) => (
                <Badge
                  variant={c.status === "ACTIVE" ? "success" : "danger"}
                  className="text-[10px] font-mono uppercase px-2 py-0.5"
                >
                  {c.status}
                </Badge>
              )
            },
            {
              header: "Actions",
              accessorKey: (c) => (
                <div className="flex items-center gap-3">
                  <a href={`/clients/${c.id}`} className="text-xs font-mono font-bold text-brand-yellow hover:underline">
                    VIEW →
                  </a>
                  <button
                    disabled={isPending}
                    onClick={() => handleToggleStatus(c)}
                    className={`text-xs font-mono underline hover:text-white transition-colors ${
                      c.status === "ACTIVE" ? "text-brand-orange" : "text-brand-yellow"
                    }`}
                  >
                    {c.status === "ACTIVE" ? "DISABLE" : "ENABLE"}
                  </button>
                  <button
                    disabled={isPending}
                    onClick={() => handleDeleteClient(c)}
                    className="text-xs font-mono text-slate-500 hover:text-red-400 underline transition-colors"
                  >
                    DELETE
                  </button>
                </div>
              )
            }
          ]}
        />
      )}

      {/* Invite Client Modal */}
      <InviteClientModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onSuccess={loadClients}
      />
    </div>
  );
}
