"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/language-provider";

declare global {
  interface Window {
    FB?: {
      init: (config: { xfbml: boolean; version: string }) => void;
      XFBML: { parse: (node?: HTMLElement) => void };
    };
    fbAsyncInit?: () => void;
  }
}

const DEFAULT_PAGE_HREF = "https://www.facebook.com/Meta";

let fbInitDone = false;

type FacebookFeedProps = {
  /** Official Facebook page URL, e.g. https://www.facebook.com/yourpage */
  pageHref?: string;
};

function ensureFbRoot() {
  if (document.getElementById("fb-root")) return;
  const root = document.createElement("div");
  root.id = "fb-root";
  document.body.insertBefore(root, document.body.firstChild);
}

export function FacebookFeed({ pageHref }: FacebookFeedProps) {
  const { lang } = useLang();
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const parseScheduled = useRef(false);

  const href =
    pageHref ??
    process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL ??
    DEFAULT_PAGE_HREF;

  const sdkLocale = lang === "ar" ? "ar_AR" : "en_US";

  useEffect(() => {
    ensureFbRoot();
  }, []);

  useEffect(() => {
    let cancelled = false;
    parseScheduled.current = false;

    const finishLoading = () => {
      if (cancelled || parseScheduled.current) return;
      parseScheduled.current = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (!cancelled) setLoading(false);
          }, 450);
        });
      });
    };

    const parseXfbml = () => {
      if (!window.FB || !containerRef.current) return;
      try {
        if (!fbInitDone) {
          window.FB.init({ xfbml: true, version: "v21.0" });
          fbInitDone = true;
        }
        window.FB.XFBML.parse(containerRef.current);
      } catch {
        /* non-fatal */
      } finally {
        finishLoading();
      }
    };

    if (window.FB) {
      parseXfbml();
      return () => {
        cancelled = true;
      };
    }

    const previous = window.fbAsyncInit;
    window.fbAsyncInit = function fbAsyncInitChained() {
      previous?.();
      parseXfbml();
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-aswar-fb-sdk="1"]',
    );

    if (existing && window.FB) {
      parseXfbml();
      return () => {
        cancelled = true;
      };
    }

    if (existing && !window.FB) {
      const poll = window.setInterval(() => {
        if (window.FB) {
          window.clearInterval(poll);
          parseXfbml();
        }
      }, 64);
      const fallback = window.setTimeout(() => {
        window.clearInterval(poll);
        if (!cancelled) setLoading(false);
      }, 12_000);
      return () => {
        cancelled = true;
        window.clearInterval(poll);
        window.clearTimeout(fallback);
      };
    }

    const script = document.createElement("script");
    script.dataset.aswarFbSdk = "1";
    script.src = `https://connect.facebook.net/${sdkLocale}/sdk.js#xfbml=1&version=v21.0`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onerror = () => {
      if (!cancelled) setLoading(false);
    };
    document.body.appendChild(script);

    const fallback = window.setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 12_000);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, [href, sdkLocale]);

  const pageName = href.replace(/^https?:\/\/(www\.)?facebook\.com\//i, "");

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {loading ? (
        <div
          className="absolute inset-0 z-10 flex min-h-[min(70vh,560px)] flex-col items-center justify-center gap-4 bg-white"
          aria-busy="true"
          aria-live="polite"
        >
          <div
            className="h-9 w-9 rounded-full border-[1.5px] border-charcoal/[0.12] border-t-charcoal animate-spin"
            role="status"
          />
          <span className="sr-only">Loading Facebook feed</span>
        </div>
      ) : null}

      <div
        className="fb-page w-full"
        data-href={href}
        data-tabs="timeline"
        data-width="500"
        data-height="620"
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
        data-lazy="false"
      >
        <blockquote
          cite={href}
          className="fb-xfbml-parse-ignore m-0 border-0 p-6 text-center font-sans text-sm text-charcoal/45"
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-charcoal underline decoration-charcoal/25 underline-offset-4 transition-colors hover:decoration-charcoal/50"
          >
            {pageName}
          </a>
        </blockquote>
      </div>
    </div>
  );
}
