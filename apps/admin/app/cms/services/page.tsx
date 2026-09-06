"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Badge, Button, Card, Modal } from "@script2scale/ui";
import {
  getCmsServicesContentAction,
  saveCmsServiceAction,
  getCmsTestimonialsAction,
  saveCmsTestimonialAction,
  deleteCmsTestimonialAction,
  CmsServiceItem,
  CmsTestimonialItem
} from "../../actions";

export default function CMSServicesPage() {
  const [activeTab, setActiveTab] = useState<"SERVICES" | "TESTIMONIALS">("SERVICES");
  const [services, setServices] = useState<CmsServiceItem[]>([]);
  const [testimonials, setTestimonials] = useState<CmsTestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Testimonial Modal State
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<CmsTestimonialItem | null>(null);

  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const loadData = async () => {
    setIsLoading(true);
    const [srvData, testData] = await Promise.all([
      getCmsServicesContentAction(),
      getCmsTestimonialsAction()
    ]);
    setServices(srvData);
    setTestimonials(testData);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveService = (e: React.FormEvent<HTMLFormElement>, serviceId: string) => {
    e.preventDefault();
    setNotice(null);
    const formData = new FormData(e.currentTarget);
    formData.append("id", serviceId);

    startTransition(async () => {
      const res = await saveCmsServiceAction(formData);
      if (res.success) {
        setNotice({ type: "success", message: res.message || "Service copy updated." });
        loadData();
      } else {
        setNotice({ type: "error", message: res.message || "Failed to update service." });
      }
    });
  };

  const handleSaveTestimonial = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotice(null);
    const formData = new FormData(e.currentTarget);
    if (editingTestimonial?.id) {
      formData.append("id", editingTestimonial.id);
    }

    startTransition(async () => {
      const res = await saveCmsTestimonialAction(formData);
      if (res.success) {
        setNotice({ type: "success", message: res.message || "Testimonial saved." });
        setIsTestimonialModalOpen(false);
        loadData();
      } else {
        setNotice({ type: "error", message: res.message || "Failed to save testimonial." });
      }
    });
  };

  const handleDeleteTestimonial = (id: string) => {
    setNotice(null);
    startTransition(async () => {
      const res = await deleteCmsTestimonialAction(id);
      if (res.success) {
        setNotice({ type: "success", message: res.message || "Testimonial deleted." });
        loadData();
      } else {
        setNotice({ type: "error", message: res.message || "Failed to delete testimonial." });
      }
    });
  };

  if (isLoading) {
    return <div className="p-12 text-center text-slate-400 font-mono text-sm">Loading Services & Testimonials CMS...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono text-brand-yellow uppercase tracking-widest block mb-1">
            WEBSITE CONTENT MANAGEMENT
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
            SERVICES <span className="text-brand-yellow font-mono">&</span> TESTIMONIALS.
          </h1>
          <p className="text-sm text-slate-400">
            Edit service offerings, preview media URLs, sub-offering bullet points, and client testimonial quotes.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("SERVICES")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === "SERVICES"
                ? "bg-brand-yellow text-brand-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            SERVICES OFFERINGS
          </button>
          <button
            onClick={() => setActiveTab("TESTIMONIALS")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === "TESTIMONIALS"
                ? "bg-brand-yellow text-brand-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            CLIENT TESTIMONIALS ({testimonials.length})
          </button>
        </div>
      </div>

      {/* Notice Alert */}
      {notice && (
        <div
          className={`p-4 rounded-xl text-xs font-mono border flex items-center justify-between ${
            notice.type === "success"
              ? "bg-brand-yellow/10 border-brand-yellow/50 text-brand-yellow"
              : "bg-red-950/60 border-red-500/60 text-red-300"
          }`}
        >
          <span>{notice.message}</span>
          <button onClick={() => setNotice(null)} className="text-slate-400 hover:text-white font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Tab 1: Services Offerings Editor */}
      {activeTab === "SERVICES" && (
        <div className="space-y-6">
          {services.map((srv) => (
            <Card key={srv.id} variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-extrabold text-white tracking-tight">{srv.name}</h3>
                  <Badge variant="brand" className="text-[10px] font-mono">
                    {srv.categoryFilterKey}
                  </Badge>
                </div>
                <span className="text-xs font-mono text-slate-500">/services/{srv.slug}</span>
              </div>

              <form onSubmit={(e) => handleSaveService(e, srv.id)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                      SHORT HOOK DESCRIPTION
                    </label>
                    <input
                      name="shortDesc"
                      type="text"
                      defaultValue={srv.shortDesc}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                      PREVIEW VIDEO REEL URL
                    </label>
                    <input
                      name="previewVideoUrl"
                      type="text"
                      defaultValue={srv.previewVideoUrl || ""}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    LONG SERVICE OVERVIEW & WORKFLOW
                  </label>
                  <textarea
                    name="longDesc"
                    rows={2}
                    defaultValue={srv.longDesc}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    SUB-OFFERINGS (COMMA-SEPARATED BULLET POINTS)
                  </label>
                  <input
                    name="subOfferings"
                    type="text"
                    defaultValue={srv.subOfferings ? srv.subOfferings.join(", ") : ""}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-brand-yellow font-mono focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" variant="magnetic-fill" size="sm" disabled={isPending}>
                    {isPending ? "SAVING..." : "UPDATE SERVICE COPY →"}
                  </Button>
                </div>
              </form>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 2: Testimonials Manager */}
      {activeTab === "TESTIMONIALS" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-400">
              Manage client review quotes rendered on homepage and service pages.
            </p>
            <Button
              variant="magnetic-fill"
              size="sm"
              onClick={() => {
                setEditingTestimonial(null);
                setIsTestimonialModalOpen(true);
              }}
            >
              + ADD TESTIMONIAL
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <Card key={t.id} variant="bordered" className="p-6 bg-slate-900/90 border-slate-800 space-y-4 relative flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                        <img src={t.avatarUrl || "/images/work/acme-thumb.jpg"} alt={t.clientName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{t.clientName}</h4>
                        <p className="text-xs text-slate-400">{t.clientRole} — {t.companyName}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-brand-orange">{"★".repeat(t.rating)}</span>
                  </div>

                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    &quot;{t.quote}&quot;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    onClick={() => {
                      setEditingTestimonial(t);
                      setIsTestimonialModalOpen(true);
                    }}
                    className="text-xs font-mono font-bold text-brand-yellow hover:underline"
                  >
                    EDIT
                  </button>
                  <button
                    disabled={isPending}
                    onClick={() => handleDeleteTestimonial(t.id)}
                    className="text-xs font-mono text-red-400 hover:underline"
                  >
                    DELETE
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Testimonial Modal */}
      <Modal
        isOpen={isTestimonialModalOpen}
        onClose={() => setIsTestimonialModalOpen(false)}
        title={editingTestimonial ? `EDIT TESTIMONIAL: ${editingTestimonial.clientName}` : "ADD CLIENT TESTIMONIAL"}
      >
        <form onSubmit={handleSaveTestimonial} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="t-clientName" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                CLIENT NAME <span className="text-brand-yellow">*</span>
              </label>
              <input
                id="t-clientName"
                name="clientName"
                type="text"
                required
                defaultValue={editingTestimonial?.clientName || ""}
                placeholder="e.g. David Chen"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>

            <div>
              <label htmlFor="t-companyName" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                COMPANY NAME
              </label>
              <input
                id="t-companyName"
                name="companyName"
                type="text"
                defaultValue={editingTestimonial?.companyName || ""}
                placeholder="e.g. Acme Corp"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="t-clientRole" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                ROLE / TITLE
              </label>
              <input
                id="t-clientRole"
                name="clientRole"
                type="text"
                defaultValue={editingTestimonial?.clientRole || ""}
                placeholder="e.g. VP of Marketing"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>

            <div>
              <label htmlFor="t-rating" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                RATING (1-5 STARS)
              </label>
              <input
                id="t-rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                defaultValue={editingTestimonial?.rating || 5}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow font-mono"
              />
            </div>
          </div>

          <div>
            <label htmlFor="t-quote" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              TESTIMONIAL QUOTE <span className="text-brand-yellow">*</span>
            </label>
            <textarea
              id="t-quote"
              name="quote"
              rows={3}
              required
              defaultValue={editingTestimonial?.quote || ""}
              placeholder="Script2Scale delivered our brand anthem in 10 days..."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            />
          </div>

          <div>
            <label htmlFor="t-avatarUrl" className="block text-xs font-mono uppercase text-slate-300 mb-1">
              AVATAR / LOGO URL
            </label>
            <input
              id="t-avatarUrl"
              name="avatarUrl"
              type="text"
              defaultValue={editingTestimonial?.avatarUrl || ""}
              placeholder="/images/work/acme-thumb.jpg"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsTestimonialModalOpen(false)}>
              CANCEL
            </Button>
            <Button type="submit" variant="magnetic-fill" size="sm" disabled={isPending}>
              {isPending ? "SAVING..." : "SAVE TESTIMONIAL →"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
