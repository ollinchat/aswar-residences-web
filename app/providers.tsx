"use client";

import { FloatingContactHub } from "@/components/floating-contact-hub";
import { InquiryModalProvider } from "@/components/inquiry-modal-context";
import { LanguageProvider } from "@/components/language-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <InquiryModalProvider>{children}</InquiryModalProvider>
      {/* Portal renders to document.body — outside main/layout DOM */}
      <FloatingContactHub />
    </LanguageProvider>
  );
}
