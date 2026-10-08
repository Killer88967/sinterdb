import type { Measurement } from "./harness.ts";

export function formatNumber(value: number): string {
  return value >= 100
    ? Math.round(value).toLocaleString("en-US")
    : value.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export function toMarkdown(results: readonly Measurement[]): string {
  const rows = results.map((result) => {
    const latency = result.latencyMicros;

    return `| ${result.name} | ${formatNumber(result.operations)} | ${
      result.operationsPerSecond === 0
        ? "-"
        : formatNumber(result.operationsPerSecond)
    } | ${latency === undefined ? "-" : formatNumber(latency.p50)} | ${
      latency === undefined ? "-" : formatNumber(latency.p99)
    } | ${formatNumber(result.totalMS)} |`;
  });

  return [
    "| Scenario | Operations | Per second | p50 (µs) | p99 (µs) | Total (ms) |",
    "| --- | ---: | ---: | ---: | ---: | ---: |",
    ...rows,
  ].join("\n");
}
