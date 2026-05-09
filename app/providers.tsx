"use client";

import { InquiryModalProvider } from "@/components/inquiry-modal-context";
import { LanguageProvider } from "@/components/language-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <InquiryModalProvider>{children}</InquiryModalProvider>
    </LanguageProvider>
  );
}
