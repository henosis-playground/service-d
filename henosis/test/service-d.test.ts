import { describe, expect, it } from "vitest";
import { FakeHost } from "@henosis/core/testing";
import serviceD from "../src/service-d.js";

describe("service-d component", () => {
  it("references every native migration and emits a Supabase schema", () => {
    const result = new FakeHost(serviceD).run();

    expect(result).toMatchObject({
      status: "complete",
      observedOutputs: {
        restUrl: { resource: "supabase/schema@1/service-d", output: "restUrl" },
        schema: { resource: "supabase/schema@1/service-d", output: "schema" },
        anonKeyRef: { resource: "supabase/schema@1/service-d", output: "anonKeyRef" },
      },
    });
    expect(result.resources).toHaveLength(1);
    expect(result.resources[0]?.body).toMatchObject({
      schema: "service_d",
      migrations: [
        { path: "supabase/migrations/20260713013134_create_items.sql" },
        { path: "supabase/migrations/20260713063000_seed_items.sql" },
        { path: "supabase/migrations/20260713064000_default_anon_read.sql" },
        { path: "supabase/migrations/20260713065000_reassert_anon_read.sql" },
      ],
    });
  });
});
