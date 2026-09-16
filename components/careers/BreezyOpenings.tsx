"use client";

import { useEffect, useRef } from "react";

const BREEZY_SCRIPT_URL = "https://articog.breezy.hr/embed/js?inline=true&group_by=none";

export function BreezyOpenings() {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current) {
      return;
    }

    const container = document.getElementById("bzOpeningsContainer");
    if (!container) {
      return;
    }

    const existingScript = document.querySelector(
      `script[src="${BREEZY_SCRIPT_URL}"]`,
    );

    if (existingScript) {
      scriptLoadedRef.current = true;
      return;
    }

    const script = document.createElement("script");
    script.src = BREEZY_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.id = "breezy-openings-script";
    script.setAttribute("data-breezy-openings", "true");

    document.body.appendChild(script);
    scriptLoadedRef.current = true;
  }, []);

  return (
    <>
      <style>{`
        #bzOpeningsContainer {
          width: 100%;
          min-width: 0;
        }

        #bzOpeningsContainer > ul,
        #bzOpeningsContainer ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        #bzOpeningsContainer > ul {
          display: grid;
          gap: 1.25rem;
        }

        #bzOpeningsContainer > ul > li,
        #bzOpeningsContainer li {
          list-style: none;
        }

        #bzOpeningsContainer a {
          color: inherit;
          text-decoration: none;
        }

        #bzOpeningsContainer > ul > li > a,
        #bzOpeningsContainer li > a {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 100%;
          background: #dfead7;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 1.25rem;
          padding: 1.5rem 1.5rem 1.1rem;
          color: #101828;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
        }

        #bzOpeningsContainer > ul > li > a:hover,
        #bzOpeningsContainer li > a:hover {
          transform: translateY(-2px);
          border-color: rgba(15, 23, 42, 0.12);
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
        }

        #bzOpeningsContainer h2,
        #bzOpeningsContainer h3 {
          margin: 0;
          color: #101828;
          font-size: clamp(1.65rem, 2vw, 2.1rem);
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -0.04em;
        }

        #bzOpeningsContainer ul ul {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.45rem 0.9rem;
          margin-top: 0.85rem;
          color: rgba(16, 24, 40, 0.78);
          font-size: 0.97rem;
          line-height: 1.5;
        }

        #bzOpeningsContainer ul ul li {
          display: inline-flex;
          align-items: center;
          color: rgba(16, 24, 40, 0.8);
        }

        #bzOpeningsContainer button,
        #bzOpeningsContainer .bz-button,
        #bzOpeningsContainer [role="button"] {
          appearance: none;
          margin-top: 1.25rem;
          border: none;
          background: #ffffff;
          padding: 0;
          color: #101828;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          width: fit-content;
        }

        #bzOpeningsContainer button::after,
        #bzOpeningsContainer .bz-button::after,
        #bzOpeningsContainer [role="button"]::after {
          content: "↗";
          font-size: 1.05em;
          line-height: 1;
        }

        #bzOpeningsContainer button:hover,
        #bzOpeningsContainer .bz-button:hover,
        #bzOpeningsContainer [role="button"]:hover {
          opacity: 0.8;
        }

        @media (max-width: 640px) {
          #bzOpeningsContainer > ul {
            gap: 1rem;
          }

          #bzOpeningsContainer > ul > li > a,
          #bzOpeningsContainer li > a {
            padding: 1.1rem 1rem 0.9rem;
            border-radius: 1rem;
          }

          #bzOpeningsContainer h2,
          #bzOpeningsContainer h3 {
            font-size: clamp(1.35rem, 7vw, 1.7rem);
          }

          #bzOpeningsContainer ul ul {
            font-size: 0.88rem;
          }
        }
      `}</style>

      <div className="min-w-0 overflow-x-auto">
        <div id="bzOpeningsContainer" className="min-w-0" />
      </div>
    </>
  );
}