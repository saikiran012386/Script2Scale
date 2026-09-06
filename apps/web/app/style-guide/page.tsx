"use client";

import React, { useState } from "react";
import {
  Display,
  Heading,
  Body,
  Label,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Modal,
  Input,
  TextArea,
  Badge,
  CustomCursor,
  EASINGS,
  DURATIONS,
  MOTION_PRESETS
} from "@script2scale/ui";

export default function DesignSystemStyleGuide() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-0 text-slate-100 p-8 space-y-16 max-w-7xl mx-auto">
      <CustomCursor />

      {/* Header */}
      <div className="border-b border-slate-800 pb-8">
        <Label uppercase mono size="xs" className="text-brand-yellow">Design System QA Surface</Label>
        <Display size="xl" className="mt-2">Script2Scale Visual Tokens</Display>
        <Body size="lg" muted className="mt-2">
          Centralized style-guide rendering typography scales, color palettes, button variants, motion presets, and form primitives.
        </Body>
      </div>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-6">
        <Heading level={2}>1. Color Palette Tokens</Heading>
        <div>
          <Label uppercase className="mb-3 block">Brand Palette (Yellow, Orange, Black, White)</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            <div className="space-y-1 text-center">
              <div className="h-14 rounded-lg bg-brand-yellow border border-slate-800" />
              <span className="text-[10px] font-mono text-slate-300 block font-bold">yellow (#FFC300)</span>
            </div>
            <div className="space-y-1 text-center">
              <div className="h-14 rounded-lg bg-brand-yellow-light border border-slate-800" />
              <span className="text-[10px] font-mono text-slate-300 block font-bold">yellow-light (#FFD84D)</span>
            </div>
            <div className="space-y-1 text-center">
              <div className="h-14 rounded-lg bg-brand-yellow-dark border border-slate-800" />
              <span className="text-[10px] font-mono text-slate-300 block font-bold">yellow-dark (#E6AF00)</span>
            </div>
            <div className="space-y-1 text-center">
              <div className="h-14 rounded-lg bg-brand-orange border border-slate-800" />
              <span className="text-[10px] font-mono text-slate-300 block font-bold">orange (#FF6B00)</span>
            </div>
            <div className="space-y-1 text-center">
              <div className="h-14 rounded-lg bg-brand-orange-light border border-slate-800" />
              <span className="text-[10px] font-mono text-slate-300 block font-bold">orange-light (#FF8C33)</span>
            </div>
            <div className="space-y-1 text-center">
              <div className="h-14 rounded-lg bg-brand-orange-dark border border-slate-800" />
              <span className="text-[10px] font-mono text-slate-300 block font-bold">orange-dark (#E65C00)</span>
            </div>
            <div className="space-y-1 text-center">
              <div className="h-14 rounded-lg bg-brand-black border border-slate-700" />
              <span className="text-[10px] font-mono text-slate-300 block font-bold">black (#0A0A0A)</span>
            </div>
            <div className="space-y-1 text-center">
              <div className="h-14 rounded-lg bg-brand-white border border-slate-800" />
              <span className="text-[10px] font-mono text-slate-300 block font-bold">white (#FFFFFF)</span>
            </div>
          </div>
        </div>

        <div>
          <Label uppercase className="mb-3 block">Surface Neutrals & Layout Backgrounds</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Card variant="bordered" className="p-4">
              <div className="h-10 rounded bg-surface-0 border border-slate-700 mb-2" />
              <Label mono size="xs">surface-0 (#020617)</Label>
            </Card>
            <Card variant="bordered" className="p-4">
              <div className="h-10 rounded bg-surface-100 border border-slate-700 mb-2" />
              <Label mono size="xs">surface-100 (#0f172a)</Label>
            </Card>
            <Card variant="bordered" className="p-4">
              <div className="h-10 rounded bg-surface-200 border border-slate-700 mb-2" />
              <Label mono size="xs">surface-200 (#1e293b)</Label>
            </Card>
          </div>
        </div>
      </section>

      {/* 2. Typography Scale */}
      <section className="space-y-6">
        <Heading level={2}>2. Editorial Typography Scale</Heading>
        <div className="space-y-4 bg-surface-100 p-6 rounded-xl border border-slate-800">
          <div>
            <Label mono size="xs">Display 2XL (4.5rem / 800 weight)</Label>
            <Display size="2xl">From Script To Scale</Display>
          </div>
          <div>
            <Label mono size="xs">Display XL (3.75rem / 800 weight)</Label>
            <Display size="xl">Commercial Video Production</Display>
          </div>
          <div>
            <Label mono size="xs">Display LG (3rem / 700 weight)</Label>
            <Display size="lg">Engineered High-Retention Systems</Display>
          </div>
          <div>
            <Label mono size="xs">Heading Level 1-4</Label>
            <Heading level={1}>Heading 1 — Major Title</Heading>
            <Heading level={2}>Heading 2 — Section Header</Heading>
            <Heading level={3}>Heading 3 — Subsection Header</Heading>
            <Heading level={4}>Heading 4 — Card Title Header</Heading>
          </div>
          <div>
            <Label mono size="xs">Body & Label Component</Label>
            <Body size="lg">Body LG — Lead intro text explaining brand values and technical capabilities.</Body>
            <Body size="md" muted>Body MD (Muted) — Standard paragraph body copy for case studies and docs.</Body>
            <Body size="sm">Body SM — Fine details and metadata disclosures.</Body>
            <Label uppercase mono size="sm" className="text-brand-yellow block mt-2">Label Component (Uppercase + Mono)</Label>
          </div>
        </div>
      </section>

      {/* 3. Button Variants */}
      <section className="space-y-6">
        <Heading level={2}>3. Button Component Variants</Heading>
        <div className="flex flex-wrap items-center gap-4 bg-surface-100 p-6 rounded-xl border border-slate-800">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button variant="magnetic-fill">Magnetic Fill CTA →</Button>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-surface-100 p-6 rounded-xl border border-slate-800">
          <Button variant="primary" size="sm">Small (sm)</Button>
          <Button variant="primary" size="md">Medium (md)</Button>
          <Button variant="primary" size="lg">Large (lg)</Button>
          <Button variant="primary" disabled>Disabled State</Button>
        </div>
      </section>

      {/* 4. Badges & Form Primitives */}
      <section className="space-y-6">
        <Heading level={2}>4. Badges & Form Primitives</Heading>
        <div className="flex flex-wrap gap-3 items-center bg-surface-100 p-6 rounded-xl border border-slate-800">
          <Badge variant="default">DEFAULT</Badge>
          <Badge variant="brand">BRAND ACCENT</Badge>
          <Badge variant="success">READY FOR REVIEW</Badge>
          <Badge variant="warning">REVISION REQUESTED</Badge>
          <Badge variant="danger">REJECTED</Badge>
          <Badge variant="outline">OUTLINE BADGE</Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6 bg-surface-100 p-6 rounded-xl border border-slate-800">
          <Input label="Full Name" placeholder="John Doe" helperText="Enter contact full name" />
          <Input label="Email Address" type="email" placeholder="john@acme.com" error="Valid email required" />
          <div className="md:col-span-2">
            <TextArea label="Project Specifications" rows={3} placeholder="Describe video deliverables..." />
          </div>
        </div>
      </section>

      {/* 5. Cards & Modal Primitives */}
      <section className="space-y-6">
        <Heading level={2}>5. Cards & Modal Primitives</Heading>
        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="default">
            <CardHeader><CardTitle>Default Card</CardTitle></CardHeader>
            <CardContent><Body size="sm" muted>Standard slate surface card container.</Body></CardContent>
          </Card>
          <Card variant="bordered">
            <CardHeader><CardTitle>Bordered Card</CardTitle></CardHeader>
            <CardContent><Body size="sm" muted>Slate-800 bordered card container.</Body></CardContent>
          </Card>
          <Card variant="glass">
            <CardHeader><CardTitle>Glassmorphism Card</CardTitle></CardHeader>
            <CardContent><Body size="sm" muted>Backdrop blur transparent glass surface.</Body></CardContent>
          </Card>
        </div>

        <div className="pt-4">
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            Open Test Modal Primitive
          </Button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Test Modal Component">
            <Body size="md" className="mb-4">
              This is the shared Modal primitive rendered inside the design system style guide.
            </Body>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>Confirm Action</Button>
            </div>
          </Modal>
        </div>
      </section>

      {/* 6. Motion Tokens */}
      <section className="space-y-6">
        <Heading level={2}>6. Motion Tokens & Presets</Heading>
        <div className="bg-surface-100 p-6 rounded-xl border border-slate-800 space-y-4 font-mono text-xs text-slate-300">
          <div>
            <span className="text-brand-yellow font-bold">EASINGS:</span> {JSON.stringify(EASINGS, null, 2)}
          </div>
          <div>
            <span className="text-brand-yellow font-bold">DURATIONS:</span> {JSON.stringify(DURATIONS, null, 2)}
          </div>
          <div>
            <span className="text-brand-yellow font-bold">MOTION_PRESETS:</span> {JSON.stringify(MOTION_PRESETS, null, 2)}
          </div>
        </div>
      </section>
    </div>
  );
}
