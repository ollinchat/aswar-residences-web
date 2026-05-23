"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { RESIDENCE_MODELS } from "@/lib/residence-models";

type FloorBand = "low" | "mid" | "high" | null;
type ViewPref = "canal" | "city" | "dual" | null;

export function BookMeetingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLang();
  const [step, setStep] = useState(1);
  const [unitId, setUnitId] = useState<string | null>(null);
  const [floor, setFloor] = useState<FloorBand>(null);
  const [viewPref, setViewPref] = useState<ViewPref>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      setStep(1);
      setUnitId(null);
      setFloor(null);
      setViewPref(null);
      setName("");
      setEmail("");
      setPhone("");
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  const progress = (step / 3) * 100;
  const selected = RESIDENCE_MODELS.find((m) => m.id === unitId);

  const canNext1 = unitId !== null;
  const canNext2 = floor !== null && viewPref !== null;
  const canSubmit =
    name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    phone.trim().length > 5;

  const floorLabel =
    floor === "low"
      ? t("wizFloorLow")
      : floor === "high"
        ? t("wizFloorHigh")
        : floor === "mid"
          ? t("wizFloorMid")
          : "—";
  const viewLabel =
    viewPref === "canal"
      ? t("wizViewCanal")
      : viewPref === "city"
        ? t("wizViewCity")
        : viewPref === "dual"
          ? t("wizViewDual")
          : "—";

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const payload = {
      unitId,
      floor,
      viewPref,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };
    console.info("Book meeting", payload);
    onClose();
  };

  const floorOpts: { id: NonNullable<FloorBand>; labelKey: "wizFloorLow" | "wizFloorMid" | "wizFloorHigh" }[] =
    [
      { id: "low", labelKey: "wizFloorLow" },
      { id: "mid", labelKey: "wizFloorMid" },
      { id: "high", labelKey: "wizFloorHigh" },
    ];

  const viewOpts: { id: NonNullable<ViewPref>; labelKey: "wizViewCanal" | "wizViewCity" | "wizViewDual" }[] =
    [
      { id: "canal", labelKey: "wizViewCanal" },
      { id: "city", labelKey: "wizViewCity" },
      { id: "dual", labelKey: "wizViewDual" },
    ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[10050] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-charcoal/30 backdrop-blur-md"
            aria-label="Close"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby="book-meeting-title"
            className="relative z-10 flex max-h-[min(92vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-[2px] border border-white/50 bg-white/72 shadow-[0_32px_100px_rgba(0,0,0,0.18)] backdrop-blur-2xl backdrop-saturate-150"
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.99 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-charcoal/[0.1] px-5 pb-4 pt-5 md:px-6">
              <div className="mb-4 h-px overflow-hidden rounded-[2px] bg-charcoal/10">
                <motion.div
                  className="h-full bg-charcoal"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 280, damping: 34 }}
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-charcoal/40">
                    {t("wizStepLabel")} {step} / 3
                  </p>
                  <h2
                    id="book-meeting-title"
                    className="mt-2 font-serif text-xl font-normal tracking-tight text-charcoal md:text-2xl"
                  >
                    {t("wizTitle")}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] text-charcoal/45 transition-colors hover:bg-charcoal/[0.07] hover:text-charcoal"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" strokeWidth={1.25} />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-6">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-4"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/45">
                      {t("wizStep1Title")}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {RESIDENCE_MODELS.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setUnitId(m.id)}
                          className={`group relative overflow-hidden rounded-[2px] text-left ring-1 ring-inset transition-all ${
                            unitId === m.id
                              ? "ring-2 ring-charcoal"
                              : "ring-charcoal/12 bg-white/40 hover:ring-charcoal/22"
                          }`}
                        >
                          <div
                            className="relative aspect-[4/3] bg-charcoal/[0.05]"
                            style={{ position: "relative" }}
                          >
                            <Image
                              src={m.images[0]}
                              alt=""
                              fill
                              className="object-cover opacity-92 transition-opacity group-hover:opacity-100"
                              sizes="200px"
                            />
                          </div>
                          <div className="border-t border-charcoal/[0.08] bg-white/55 px-3 py-2.5 backdrop-blur-sm">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal">
                              {m.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : null}

                {step === 2 ? (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-8"
                  >
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/45">
                        {t("wizStep2Floor")}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {floorOpts.map((o) => (
                          <button
                            key={o.id}
                            type="button"
                            onClick={() => setFloor(o.id)}
                            className={`rounded-[2px] border px-4 py-2.5 font-mono text-[9px] uppercase tracking-widest transition-colors ${
                              floor === o.id
                                ? "border-charcoal bg-charcoal text-white"
                                : "border-charcoal/12 bg-white/35 text-charcoal/50 hover:border-charcoal/25 hover:text-charcoal"
                            }`}
                          >
                            {t(o.labelKey)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/45">
                        {t("wizStep2View")}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {viewOpts.map((o) => (
                          <button
                            key={o.id}
                            type="button"
                            onClick={() => setViewPref(o.id)}
                            className={`rounded-[2px] border px-4 py-2.5 font-mono text-[9px] uppercase tracking-widest transition-colors ${
                              viewPref === o.id
                                ? "border-charcoal bg-charcoal text-white"
                                : "border-charcoal/12 bg-white/35 text-charcoal/50 hover:border-charcoal/25 hover:text-charcoal"
                            }`}
                          >
                            {t(o.labelKey)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : null}

                {step === 3 ? (
                  <motion.form
                    key="s3"
                    id="book-meeting-form"
                    onSubmit={submit}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-4"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/45">
                      {t("wizStep3Title")}
                    </p>
                    {selected ? (
                      <p className="rounded-[2px] border border-charcoal/10 bg-white/45 px-3 py-2 font-mono text-[9px] uppercase tracking-wider text-charcoal/50 backdrop-blur-sm">
                        {selected.label} · {floorLabel} · {viewLabel}
                      </p>
                    ) : null}
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("wizPhName")}
                      className="w-full rounded-[2px] border border-charcoal/15 bg-white/50 px-4 py-3 font-sans text-sm text-charcoal outline-none backdrop-blur-sm transition-colors placeholder:text-charcoal/35 focus:border-charcoal/35"
                    />
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("wizPhEmail")}
                      className="w-full rounded-[2px] border border-charcoal/15 bg-white/50 px-4 py-3 font-sans text-sm text-charcoal outline-none backdrop-blur-sm transition-colors placeholder:text-charcoal/35 focus:border-charcoal/35"
                    />
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t("wizPhPhone")}
                      className="w-full rounded-[2px] border border-charcoal/15 bg-white/50 px-4 py-3 font-sans text-sm text-charcoal outline-none backdrop-blur-sm transition-colors placeholder:text-charcoal/35 focus:border-charcoal/35"
                    />
                  </motion.form>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-charcoal/[0.1] px-5 py-4 md:px-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  className="rounded-[2px] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/50 transition-colors hover:bg-charcoal/[0.06] hover:text-charcoal"
                >
                  {t("wizBack")}
                </button>
              ) : (
                <span />
              )}
              {step < 3 ? (
                <button
                  type="button"
                  disabled={step === 1 ? !canNext1 : !canNext2}
                  onClick={() => setStep((s) => Math.min(3, s + 1))}
                  className="rounded-[2px] bg-charcoal px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-charcoal/90 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  {t("wizNext")}
                </button>
              ) : (
                <button
                  type="submit"
                  form="book-meeting-form"
                  disabled={!canSubmit}
                  className="rounded-[2px] bg-charcoal px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-charcoal/90 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  {t("wizSubmit")}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
