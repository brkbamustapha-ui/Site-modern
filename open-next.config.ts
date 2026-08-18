import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Every data-backed route in this app is `force-dynamic` and talks to Postgres
 * on each request, so there is no ISR or data cache worth wiring up yet. Add an
 * incrementalCache here (e.g. R2 or KV) if pages are ever made cacheable.
 */
export default defineCloudflareConfig();
