"use client";

import { useEffect, useRef, useState } from "react";
import { attachHiddenUTMFields } from "@/lib/utm";

const BEEHIIV_SCRIPT_SRC = "https://subscribe-forms.beehiiv.com/v3/loader.js";
const BEEHIIV_FORM_ID = "69e2dfbd-7dbf-45b6-ac64-b1642145f9fe";
const SUCCESS_PATTERNS = [
  "thanks for subscribing",
  "thank you for subscribing",
  "you\'re subscribed",
  "you are subscribed",
  "successfully subscribed",
  "check your inbox",
  "welcome to the list",
  "you\'re in",
];

export function BeehiivForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.querySelector(`script[src="${BEEHIIV_SCRIPT_SRC}"]`)) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = BEEHIIV_SCRIPT_SRC;
    script.dataset.beehiivForm = BEEHIIV_FORM_ID;
    container.appendChild(script);

    const applyUTMFields = () => {
      const form = container.querySelector("form");
      if (form) {
        attachHiddenUTMFields(form);
      }
    };

    const detectSuccessState = () => {
      const form = container.querySelector("form");
      if (!form) {
        setIsSuccess(false);
        return;
      }

      const formText = form.textContent?.toLowerCase() ?? "";
      const hasSuccessMessage = SUCCESS_PATTERNS.some((pattern) => formText.includes(pattern));
      setIsSuccess(hasSuccessMessage);
    };

    applyUTMFields();
    detectSuccessState();

    const timer = window.setTimeout(() => {
      applyUTMFields();
      detectSuccessState();
    }, 400);

    const observer = new MutationObserver(() => {
      applyUTMFields();
      detectSuccessState();
    });
    observer.observe(container, { childList: true, subtree: true, characterData: true });

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      container.replaceChildren();
      setIsSuccess(false);
    };
  }, []);

  return (
    <div>
      <div ref={containerRef} aria-label="Beehiiv newsletter signup" />
      {isSuccess ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
        >
          Thanks for subscribing. Check your inbox for the next issue.
        </div>
      ) : null}
    </div>
  );
}
