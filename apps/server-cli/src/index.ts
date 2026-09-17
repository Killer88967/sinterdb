#!/usr/bin/env node

const args = new Set(process.argv.slice(2));

if (args.has("--version") || args.has("-v")) {
  console.log("0.0.1");
} else {
  console.log("The SinterDB server will be implemented in version 0.0.3.");
}
