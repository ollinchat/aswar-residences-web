"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BookMeetingModal } from "@/components/book-meeting-modal";

type InquiryContextValue = {
  openBookMeeting: () => void;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function InquiryModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openBookMeeting = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openBookMeeting }),
    [openBookMeeting],
  );

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <BookMeetingModal open={open} onClose={close} />
    </InquiryContext.Provider>
  );
}

export function useInquiryModal() {
  const ctx = useContext(InquiryContext);
  if (!ctx) {
    throw new Error("useInquiryModal must be used within InquiryModalProvider");
  }
  return ctx;
}
