export interface ScenarioDefinition<S, E, R> {
  initial: S;
  events: readonly E[];
  transition: (state: S, event: E) => S;
  evaluate: (state: S) => R;
}
export interface SimulationSnapshot<S, E> { state: S; event: E | null; step: number }
export interface Simulation<S, E, R> {
  scenario: ScenarioDefinition<S, E, R>;
  current: S;
  cursor: number;
  history: SimulationSnapshot<S, E>[];
  result: R | null;
}
export function createSimulation<S, E, R>(scenario: ScenarioDefinition<S, E, R>): Simulation<S, E, R> {
  const current = structuredClone(scenario.initial);
  return { scenario, current, cursor: 0, history: [{ state: current, event: null, step: 0 }], result: null };
}
export function advance<S, E, R>(simulation: Simulation<S, E, R>): Simulation<S, E, R> {
  if (simulation.cursor >= simulation.scenario.events.length) return simulation;
  const event = simulation.scenario.events[simulation.cursor];
  const current = simulation.scenario.transition(structuredClone(simulation.current), event);
  const cursor = simulation.cursor + 1;
  return { ...simulation, current, cursor, history: [...simulation.history, { state: current, event, step: cursor }], result: cursor === simulation.scenario.events.length ? simulation.scenario.evaluate(current) : null };
}
export function runToEnd<S, E, R>(simulation: Simulation<S, E, R>): Simulation<S, E, R> {
  let next = simulation;
  while (next.cursor < next.scenario.events.length) next = advance(next);
  return next;
}
