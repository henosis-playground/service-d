import {
  databaseOutputs,
  defineDatabase,
} from "@henosis/platform-supabase";

export default defineDatabase({
  outputs: databaseOutputs,
  migrationsDir: "./supabase/migrations",
  schema: "service_d",
  api: { expose: true, anonAccess: "read" },
});
