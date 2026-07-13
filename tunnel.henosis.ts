const definition = {
  kind: "cloudflare.tunnel",
  name: "supabase-private",
  origin: {
    hostname: "supabase-kong",
    port: 8000,
  },
} as const;

console.log(JSON.stringify(definition));
export default definition;
