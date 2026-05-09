"use client";

import { useId } from "react";

/** viewBox 0 0 24 24 — use with `h-6 w-6` inside 40px glass controls. */
const svgBase = "block h-6 w-6 shrink-0";

/** Thin-line accessibility / wheelchair-in-circle (lux minimal, not filled ISA). */
export function IconInternationalAccess({ className }: { className?: string }) {
  return (
    <svg
      className={`${svgBase} text-charcoal ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="12" cy="7.35" r="1.35" stroke="currentColor" strokeWidth="1.1" />
      <path
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.25 11.25h5.5M14.75 11.25l-1.1 5.6M9.25 11.25 8 16.1M12 13.35v2.9M9.4 18.6a2.65 2.65 0 1 0 5.3 0"
      />
    </svg>
  );
}

/** WhatsApp — #25D366 bubble + white mark. */
export function BrandIconWhatsApp({ className }: { className?: string }) {
  return (
    <svg
      className={`${svgBase} ${className ?? ""}`}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle cx="12" cy="12" r="11" fill="#25D366" />
      <path
        fill="#fff"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

/** Instagram — iconic gradient + lens. */
export function BrandIconInstagram({ className }: { className?: string }) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg
      className={`${svgBase} ${className ?? ""}`}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <defs>
        <linearGradient id={`ig-${gid}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FDC830" />
          <stop offset="22%" stopColor="#F37335" />
          <stop offset="48%" stopColor="#E1306C" />
          <stop offset="72%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#5851DB" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill={`url(#ig-${gid})`} />
      <circle
        cx="12"
        cy="12"
        r="4.35"
        fill="none"
        stroke="#fff"
        strokeWidth="1.4"
      />
      <circle cx="17.35" cy="6.65" r="1.2" fill="#fff" />
    </svg>
  );
}

/** Telegram — #0088cc circle + white plane. */
export function BrandIconTelegram({ className }: { className?: string }) {
  return (
    <svg
      className={`${svgBase} ${className ?? ""}`}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle cx="12" cy="12" r="11" fill="#0088cc" />
      <path
        fill="#fff"
        d="M5.671 11.574l11.777-4.518c.551-.198.975.134.806.752l.01-.043-1.886 8.878c-.134.606-.494.752-1 .467l-2.78-2.05-1.34 1.29c-.148.148-.272.272-.556.272l.198-2.803 5.15-4.65c.223-.198-.05-.31-.346-.111l-6.37 4.012-2.74-.858c-.598-.185-.611-.598.123-.891z"
      />
    </svg>
  );
}

/** Messenger — blue gradient + bolt. */
export function BrandIconMessenger({ className }: { className?: string }) {
  const mid = useId().replace(/:/g, "");
  return (
    <svg
      className={`${svgBase} ${className ?? ""}`}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={`msg-${mid}`}
          x1="3"
          y1="21"
          x2="21"
          y2="3"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00B2FF" />
          <stop offset="0.5" stopColor="#0078FF" />
          <stop offset="1" stopColor="#A033FF" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#msg-${mid})`}
        d="M12 2C6.48 2 2 5.72 2 10.2c0 2.05 1.1 3.88 2.8 5.1L3.5 22l4.35-2.38c1.15.32 2.37.48 3.15.48 5.52 0 10-3.72 10-8.2S17.52 2 12 2z"
      />
      <path
        fill="#fff"
        d="M13.1 6.75 8.25 12.6h2.9l-.95 4.9 5.55-7.25h-2.95l.3-3.5z"
      />
    </svg>
  );
}

/** Gmail — four-colour M. */
export function BrandIconGmail({ className }: { className?: string }) {
  return (
    <svg
      className={`${svgBase} ${className ?? ""}`}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      <path fill="#C5221F" d="M3.88 5.5v13L12 12 3.88 5.5z" opacity="0.92" />
    </svg>
  );
}

/** Phone — filled handset. */
export function BrandIconPhone({ className }: { className?: string }) {
  return (
    <svg
      className={`${svgBase} ${className ?? ""}`}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill="#1A1C1E"
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        opacity="0.9"
      />
    </svg>
  );
}
