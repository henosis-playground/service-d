import { describe, expect, it } from "vitest";
import { FakeHost } from "@henosis/core/testing";
import serviceD from "../src/service-d.js";

describe("service-d component", () => {
  it("references every native migration and emits a Supabase schema", () => {
    const result = new FakeHost(serviceD, [
      { path: "supabase/migrations/20260713013134_create_items.sql", sha256: "sha256:7d07c5ae1c3b9ff728c3259ea4d4d8160bfe4caced75df6a54a959b15dbc0012" },
      { path: "supabase/migrations/20260713063000_seed_items.sql", sha256: "sha256:33902fae59903aff00d16ac16eadd9c3523497811f65f1b993a7c9163d714a98" },
      { path: "supabase/migrations/20260713064000_default_anon_read.sql", sha256: "sha256:106b2a0db6d2084d74a24bad1bdba7431393c1c037b249d92b5aa09de25f9296" },
      { path: "supabase/migrations/20260713065000_reassert_anon_read.sql", sha256: "sha256:106b2a0db6d2084d74a24bad1bdba7431393c1c037b249d92b5aa09de25f9296" },
    ]).run();

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
