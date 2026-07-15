import { defineComponent, output, value } from "@henosis/core";
import { migration, schema } from "@henosis/platform-supabase";

export default defineComponent({
  name: "service-d",
  outputs: {
    restUrl: output.observed(value.url()),
    schema: output.observed(value.string()),
    anonKeyRef: output.observed(value.string()),
  },
  build(context) {
    const database = context.emit(schema.create("service-d", {
      stack: "local",
      project: "henosis-local",
      database: "postgres",
      schema: "service_d",
      migrations: [
        migration("20260713013134_create_items", "supabase/migrations/20260713013134_create_items.sql", "sha256:7d07c5ae1c3b9ff728c3259ea4d4d8160bfe4caced75df6a54a959b15dbc0012"),
        migration("20260713063000_seed_items", "supabase/migrations/20260713063000_seed_items.sql", "sha256:33902fae59903aff00d16ac16eadd9c3523497811f65f1b993a7c9163d714a98"),
        migration("20260713064000_default_anon_read", "supabase/migrations/20260713064000_default_anon_read.sql", "sha256:106b2a0db6d2084d74a24bad1bdba7431393c1c037b249d92b5aa09de25f9296"),
        migration("20260713065000_reassert_anon_read", "supabase/migrations/20260713065000_reassert_anon_read.sql", "sha256:106b2a0db6d2084d74a24bad1bdba7431393c1c037b249d92b5aa09de25f9296"),
      ],
      api: { expose: true, anonAccess: "read" },
    }));

    return {
      restUrl: database.outputs.restUrl,
      schema: database.outputs.schema,
      anonKeyRef: database.outputs.anonKeyRef,
    };
  },
});
