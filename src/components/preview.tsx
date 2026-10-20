"use client";
import { useLocale } from "@/lib/locale";

import { useState } from "react";
import {
  Play,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { Architecture } from "./architecture";
import { createSimulation, runToEnd } from "@/lib/simulation/engine";
import { paymentScenario, type Mode } from "@/lib/simulation/payment";
import { Button } from "./ui/button";
export function ProductPreview() {
  const { t } = useLocale();

  const [mode, setMode] = useState<Mode>("unsafe");
  const [sim, setSim] = useState(() =>
    createSimulation(paymentScenario({ mode: "unsafe", amount: 4900 })),
  );
  const reset = (m: Mode) => {
    setMode(m);
    setSim(createSimulation(paymentScenario({ mode: m, amount: 4900 })));
  };
  return (
    <div className="product-preview">
      <div className="preview-top">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>{t("duplicate-payment.lab")}</span>
        <span className="preview-live">
          <span className="status-dot" />
          {t(" Interactive preview")}
        </span>
      </div>
      <div className="preview-body">
        <div className="preview-title">
          <span className="eyebrow">{t("DATABASE TRANSACTIONS")}</span>
          <h3>{t("One payment. Two callbacks.")}</h3>
          <p>
            {t("What happens when your system gets the same request twice?")}
          </p>
        </div>
        <Architecture
          state={sim.current}
          active={sim.result ? "ledger" : undefined}
          compact
        />
        <div className="preview-toolbar">
          <div className="mode-toggle">
            <button
              aria-pressed={mode === "unsafe"}
              onClick={() => reset("unsafe")}
            >
              {t("Unsafe")}
            </button>
            <button
              aria-pressed={mode === "protected"}
              onClick={() => reset("protected")}
            >
              {t("Idempotent")}
            </button>
          </div>
          <Button size="sm" onClick={() => setSim(runToEnd(sim))}>
            <Play size={13} fill="currentColor" />
            {t(" Try it live")}
          </Button>
          <button
            className="icon-button"
            aria-label={t("Reset preview")}
            onClick={() => reset(mode)}
          >
            <RotateCcw size={16} />
          </button>
        </div>
        <div
          className={`preview-result ${sim.result?.outcome === "duplicate" ? "preview-result-warning" : ""}`}
          aria-live="polite"
        >
          {sim.result ? (
            <>
              {sim.result.outcome === "safe" ? (
                <ShieldCheck size={17} />
              ) : (
                <AlertTriangle size={17} />
              )}
              <span>
                <strong>
                  {t(
                    sim.current.ledger.length === 1
                      ? "{0} ledger entry."
                      : "{0} ledger entries.",
                    [sim.current.ledger.length],
                  )}
                </strong>{" "}
                {sim.result.outcome === "safe"
                  ? t("Duplicate safely skipped.")
                  : t("One payment credited twice. Now try idempotent mode.")}
              </span>
            </>
          ) : (
            <>
              <span className="code-marker">↳</span>
              <span>
                {t("Change the mode. Run the experiment. See for yourself.")}
              </span>
              <ArrowRight size={15} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
