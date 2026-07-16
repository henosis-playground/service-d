import { config, defineComponent, output, value } from "@henosis/core";
import { migration, schema } from "@henosis/platform-supabase";

export default defineComponent({
  name: "service-d",
  files: [
    config.file("supabase/migrations/20260713013134_create_items.sql"),
    config.file("supabase/migrations/20260713063000_seed_items.sql"),
    config.file("supabase/migrations/20260713064000_default_anon_read.sql"),
    config.file("supabase/migrations/20260713065000_reassert_anon_read.sql"),
  ],
  outputs: {
    restUrl: output.observed(value.url()),
    schema: output.observed(value.string()),
    anonKeyRef: output.observed(value.string()),
  },
  build(ctx) {
    const database = ctx.emit(schema.create("service-d", {
      stack: "local",
      project: "henosis-local",
      database: "postgres",
      schema: "service_d",
      migrations: [
        migration("20260713013134_create_items", "supabase/migrations/20260713013134_create_items.sql"),
        migration("20260713063000_seed_items", "supabase/migrations/20260713063000_seed_items.sql"),
        migration("20260713064000_default_anon_read", "supabase/migrations/20260713064000_default_anon_read.sql"),
        migration("20260713065000_reassert_anon_read", "supabase/migrations/20260713065000_reassert_anon_read.sql"),
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
