"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Display, Label, Button, Card } from "@script2scale/ui";
import { CreateInquiryInput } from "@script2scale/types";
import { submitInquiryAction, SubmitInquiryResult } from "../../app/(marketing)/start-a-project/actions";
import { ConfirmationScreen } from "./confirmation-screen";

const SERVICE_OPTIONS = [
  {
    id: "video-editing",
    name: "Commercial Video Editing",
    description: "Short-form, Long-form, Reels, YouTube edits, Commercials"
  },
  {
    id: "thumbnail-design",
    name: "High-CTR Thumbnail Design",
    description: "YouTube thumbnails, A/B testing variants, 3D composition"
  },
  {
    id: "poster-design",
    name: "Cinematic Poster Design",
    description: "Film key art, Event posters, Campaign digital billboards"
  },
  {
    id: "brochure-design",
    name: "Brand Brochure & Pitch Design",
    description: "Investor pitch decks, Corporate catalogs, Flipbooks"
  },
  {
    id: "multiple-services",
    name: "Multiple Services / Full Package",
    description: "Multi-discipline production suite across video & graphic design"
  }
];

const TIMELINE_OPTIONS = [
  "Urgent (Within 1-2 Weeks)",
  "Standard (3-4 Weeks)",
  "Flexible / Continuous Retainer",
  "Specific Event Date / Milestone"
];

const BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $10,000",
  "$10,000+",
  "Flexible / TBD"
];

const STEP_TITLES = [
  "Services Needed",
  "Project Scope",
  "Timeline",
  "Contact Info",
  "Budget & Notes"
];

export function InquiryWizard() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [inquiryId, setInquiryId] = useState<string | undefined>(undefined);

  const [formData, setFormData] = useState<CreateInquiryInput>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    services: [],
    budgetRange: "",
    projectDetails: "",
    timeline: "",
    referenceLinks: "",
    honeypot: ""
  });

  // Pre-select service from URL parameter (e.g. ?service=video-editing)
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const matched = SERVICE_OPTIONS.find((s) => s.id === serviceParam || s.name.toLowerCase().includes(serviceParam.replace(/-/g, " ")));
      if (matched && !formData.services.includes(matched.name)) {
        setFormData((prev) => ({
          ...prev,
          services: [matched.name]
        }));
      }
    }
  }, [searchParams]);

  // Step 1 Service Selection Toggle
  const toggleService = (serviceName: string) => {
    setFieldErrors((prev) => ({ ...prev, services: "" }));
    if (serviceName === "Multiple Services / Full Package") {
      // Toggle all main services
      const allNames = SERVICE_OPTIONS.filter((s) => s.id !== "multiple-services").map((s) => s.name);
      if (formData.services.length === allNames.length) {
        setFormData((prev) => ({ ...prev, services: [] }));
      } else {
        setFormData((prev) => ({ ...prev, services: allNames }));
      }
      return;
    }

    setFormData((prev) => {
      const exists = prev.services.includes(serviceName);
      const updated = exists
        ? prev.services.filter((s) => s !== serviceName)
        : [...prev.services, serviceName];
      return { ...prev, services: updated };
    });
  };

  // Step Validation Logic
  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (formData.services.length === 0) {
        errors.services = "Please select at least one service to continue.";
      }
    } else if (step === 2) {
      if (!formData.projectDetails || formData.projectDetails.trim().length < 10) {
        errors.projectDetails = "Please describe your project scope (minimum 10 characters).";
      }
    } else if (step === 3) {
      if (!formData.timeline) {
        errors.timeline = "Please select a target timeline for your project.";
      }
    } else if (step === 4) {
      if (!formData.fullName || formData.fullName.trim().length < 2) {
        errors.fullName = "Full name is required (at least 2 characters).";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = "Valid email address is required.";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setServerError(null);
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrevStep = () => {
    setServerError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res: SubmitInquiryResult = await submitInquiryAction(formData);
      if (res.success) {
        setIsSubmitted(true);
        setInquiryId(res.inquiryId);
      } else {
        if (res.errors) {
          setFieldErrors(res.errors);
        }
        setServerError(res.message || "Failed to submit inquiry. Your entered data has been preserved.");
      }
    } catch (err) {
      console.error("Submission catch error:", err);
      setServerError("Network error encountered. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <ConfirmationScreen
        inquiryData={formData}
        inquiryId={inquiryId}
        onReset={() => {
          setIsSubmitted(false);
          setCurrentStep(1);
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            company: "",
            services: [],
            budgetRange: "",
            projectDetails: "",
            timeline: "",
            referenceLinks: "",
            honeypot: ""
          });
        }}
      />
    );
  }

  const progressPercent = (currentStep / 5) * 100;

  return (
    <div className="py-12 px-6 max-w-4xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <Label uppercase mono size="xs" className="text-emerald-400 block tracking-widest">
          PROJECT INQUIRY FORM
        </Label>
        <Display size="2xl" className="tracking-tighter uppercase text-white">
          LET'S <span className="text-emerald-500 font-mono">/</span> CREATE.
        </Display>
        <p className="text-sm md:text-base text-slate-400 max-w-lg mx-auto">
          Tell us about your project vision, timeline, and goals. We will build a tailored production roadmap for your brand.
        </p>
      </div>

      {/* Wizard Progress Indicator */}
      <div className="space-y-3 max-w-2xl mx-auto">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="text-emerald-400 font-bold">
            STEP 0{currentStep} OF 05
          </span>
          <span className="uppercase text-slate-500">
            {STEP_TITLES[currentStep - 1]}
          </span>
        </div>

        {/* Progress Bar Track */}
        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Indicator Pills */}
        <div className="grid grid-cols-5 gap-2 pt-1">
          {STEP_TITLES.map((title, idx) => {
            const stepNum = idx + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;
            return (
              <button
                key={title}
                type="button"
                onClick={() => {
                  if (isCompleted) setCurrentStep(stepNum);
                }}
                disabled={!isCompleted && !isActive}
                className={`py-1 px-2 rounded-md text-[10px] font-mono transition-all text-center border truncate ${
                  isActive
                    ? "bg-emerald-950 text-emerald-300 border-emerald-500/60 font-bold"
                    : isCompleted
                    ? "bg-surface-100 text-slate-300 border-slate-700 cursor-pointer hover:border-slate-500"
                    : "bg-surface-100/30 text-slate-600 border-slate-850 cursor-not-allowed"
                }`}
              >
                0{stepNum}. {title.split(" ")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Global Server Error Alert */}
      {serverError && (
        <div className="max-w-2xl mx-auto p-4 bg-red-950/60 border border-red-800 rounded-xl text-xs font-mono text-red-300 flex items-center justify-between gap-4">
          <span>⚠️ {serverError}</span>
          <button
            type="button"
            onClick={() => setServerError(null)}
            className="text-red-400 hover:text-white underline font-bold"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* Main Form Body */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
        {/* Honeypot Spam Field */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot || ""}
          onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* STEP 1: What do you need? */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-tight">
                01. What do you need?
              </h3>
              <p className="text-xs text-slate-400">
                Select one or multiple service capabilities. You can adjust your selection anytime.
              </p>
            </div>

            <div className="space-y-3">
              {SERVICE_OPTIONS.map((option) => {
                const isSelected = formData.services.includes(option.name);
                return (
                  <div
                    key={option.id}
                    onClick={() => toggleService(option.name)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                      isSelected
                        ? "bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/40"
                        : "bg-surface-100/50 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center transition-colors border ${
                        isSelected
                          ? "bg-emerald-500 border-emerald-400 text-slate-950"
                          : "bg-slate-900 border-slate-700"
                      }`}
                    >
                      {isSelected && <span className="text-xs font-bold">✓</span>}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {option.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {option.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {fieldErrors.services && (
              <p className="text-xs font-mono text-red-400">{fieldErrors.services}</p>
            )}
          </div>
        )}

        {/* STEP 2: Project Scope & Description */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-tight">
                02. Project Description & Vision
              </h3>
              <p className="text-xs text-slate-400">
                Tell us about your project goals, key deliverables, target audience, or narrative context.
              </p>
            </div>

            <div>
              <textarea
                value={formData.projectDetails}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, projectDetails: e.target.value }));
                  if (fieldErrors.projectDetails) setFieldErrors((prev) => ({ ...prev, projectDetails: "" }));
                }}
                rows={6}
                placeholder="E.g., We are launching a new SaaS product in Q3 and need a 90-second cinematic product reveal video, 3 YouTube thumbnail variants, and social teaser cutdowns..."
                className={`w-full rounded-xl bg-surface-100 border p-4 text-sm text-white focus:outline-none transition-colors ${
                  fieldErrors.projectDetails ? "border-red-500 focus:border-red-400" : "border-slate-800 focus:border-emerald-500"
                }`}
              />
              <div className="flex justify-between items-center mt-2 text-xs font-mono text-slate-500">
                <span>Min 10 characters</span>
                <span>{formData.projectDetails.length} chars</span>
              </div>
            </div>

            {fieldErrors.projectDetails && (
              <p className="text-xs font-mono text-red-400">{fieldErrors.projectDetails}</p>
            )}
          </div>
        )}

        {/* STEP 3: Timeline Selection */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-tight">
                03. Target Deadline & Timeline
              </h3>
              <p className="text-xs text-slate-400">
                Select your preferred turnaround timeline.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {TIMELINE_OPTIONS.map((timeline) => {
                const isSelected = formData.timeline === timeline;
                return (
                  <div
                    key={timeline}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, timeline }));
                      setFieldErrors((prev) => ({ ...prev, timeline: "" }));
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                      isSelected
                        ? "bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/40"
                        : "bg-surface-100/50 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? "border-emerald-400 bg-emerald-500" : "border-slate-700"
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>
                    <span className="text-sm font-medium text-white">{timeline}</span>
                  </div>
                );
              })}
            </div>

            {fieldErrors.timeline && (
              <p className="text-xs font-mono text-red-400">{fieldErrors.timeline}</p>
            )}
          </div>
        )}

        {/* STEP 4: Contact Information */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-tight">
                04. Contact Details
              </h3>
              <p className="text-xs text-slate-400">
                Where should we send your project proposal and timeline roadmap?
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                    if (fieldErrors.fullName) setFieldErrors((prev) => ({ ...prev, fullName: "" }));
                  }}
                  placeholder="Jane Doe"
                  className={`w-full rounded-xl bg-surface-100 border px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                    fieldErrors.fullName ? "border-red-500" : "border-slate-800 focus:border-emerald-500"
                  }`}
                />
                {fieldErrors.fullName && (
                  <p className="text-xs font-mono text-red-400 mt-1">{fieldErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                    if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  placeholder="jane@company.com"
                  className={`w-full rounded-xl bg-surface-100 border px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                    fieldErrors.email ? "border-red-500" : "border-slate-800 focus:border-emerald-500"
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-xs font-mono text-red-400 mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  PHONE / WHATSAPP (OPTIONAL)
                </label>
                <input
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-xl bg-surface-100 border border-slate-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  COMPANY / BRAND (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={formData.company || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  placeholder="Acme Studios"
                  className="w-full rounded-xl bg-surface-100 border border-slate-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Budget & Reference Notes (Optional) */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-tight">
                05. Budget & Reference Notes (Optional)
              </h3>
              <p className="text-xs text-slate-400">
                Help us align expectations by sharing target budget and inspiration links.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">
                ESTIMATED BUDGET RANGE
              </label>
              <div className="flex flex-wrap gap-2">
                {BUDGET_OPTIONS.map((budget) => {
                  const isSelected = formData.budgetRange === budget;
                  return (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, budgetRange: budget }))}
                      className={`px-4 py-2 rounded-lg text-xs font-mono transition-all border ${
                        isSelected
                          ? "bg-emerald-600 text-white border-emerald-500 font-bold"
                          : "bg-surface-100 text-slate-300 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      {budget}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                REFERENCE LINKS & INSPIRATION (OPTIONAL)
              </label>
              <textarea
                value={formData.referenceLinks || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, referenceLinks: e.target.value }))}
                rows={3}
                placeholder="Paste YouTube links, Vimeo references, Google Drive moodboards, or competitor channels..."
                className="w-full rounded-xl bg-surface-100 border border-slate-800 p-4 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {/* Wizard Controls Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-6">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={handlePrevStep}
              disabled={isSubmitting}
            >
              ← BACK
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleNextStep}
            >
              NEXT STEP →
            </Button>
          ) : (
            <Button
              type="submit"
              variant="magnetic-fill"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "SUBMITTING INQUIRY..." : "SUBMIT INQUIRY →"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
