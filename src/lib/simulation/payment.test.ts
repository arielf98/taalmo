import { describe, expect, it } from "vitest";
import { paymentScenario } from "./payment";
import { createSimulation, advance, runToEnd } from "./engine";

const run = (mode: "unsafe" | "protected", failBeforeCommit = false) =>
  runToEnd(
    createSimulation(paymentScenario({ mode, amount: 4900, failBeforeCommit })),
  );

describe("duplicate payment callback", () => {
  it("reproduces two stale reads and duplicate ledger writes in unsafe mode", () => {
    const sim = run("unsafe");
    expect(
      sim.history
        .filter((s) => s.event?.kind === "read")
        .map((s) => s.state.callbacks[s.event!.callback].readProcessed),
    ).toEqual([false, false]);
    expect(sim.current.ledger).toHaveLength(2);
    expect(sim.current.outbox).toHaveLength(2);
    expect(sim.result?.outcome).toBe("duplicate");
  });
  it("waits on a unique key before skipping the duplicate", () => {
    const sim = run("protected");
    expect(
      sim.history.some((s) => s.state.callbacks.B.status === "waiting"),
    ).toBe(true);
    expect(sim.current.callbacks.B.status).toBe("duplicate");
    expect(sim.current.keys).toEqual(["payment:pay_1042"]);
    expect(sim.result?.outcome).toBe("safe");
  });
  it("commits exactly one ledger entry and one outbox event atomically", () => {
    const sim = run("protected");
    expect(sim.current.ledger).toEqual([
      { id: "led_A", paymentId: "pay_1042", amount: 4900, callback: "A" },
    ]);
    expect(sim.current.outbox).toHaveLength(1);
    expect(
      sim.history.every((s) => s.state.ledger.length === s.state.outbox.length),
    ).toBe(true);
    expect(
      sim.history.find((s) => s.event?.kind === "stage")?.state.ledger,
    ).toHaveLength(0);
  });
  it("rolls back uncommitted state and lets the waiting callback recover", () => {
    const sim = run("protected", true);
    const rolledBack = sim.history.find((s) => s.event?.kind === "rollback")!;
    expect(rolledBack.state.ledger).toHaveLength(0);
    expect(rolledBack.state.keys).toHaveLength(0);
    expect(rolledBack.state.lockOwner).toBeNull();
    expect(sim.current.callbacks.A.status).toBe("failed");
    expect(sim.current.callbacks.B.status).toBe("committed");
    expect(sim.current.ledger).toHaveLength(1);
    expect(sim.current.outbox).toHaveLength(1);
  });
  it("steps without changing earlier snapshots and replays deterministically", () => {
    const scenario = paymentScenario({ mode: "protected", amount: 1200 });
    const initial = createSimulation(scenario);
    const stepped = advance(initial);
    expect(initial.cursor).toBe(0);
    expect(initial.current.lockOwner).toBeNull();
    expect(stepped.cursor).toBe(1);
    expect(runToEnd(stepped)).toEqual(runToEnd(createSimulation(scenario)));
    expect(advance(runToEnd(stepped))).toEqual(runToEnd(stepped));
  });
  it("validates configurable amounts at the scenario boundary", () => {
    expect(() => paymentScenario({ mode: "unsafe", amount: -1 })).toThrow();
    expect(() => paymentScenario({ mode: "protected", amount: 1.5 })).toThrow();
  });
});
