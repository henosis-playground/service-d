# service-d

A Henosis Supabase component authored in `henosis.ts`, with native SQL migrations retained under
`supabase/migrations`. The TypeScript definition owns the schema, PostgREST exposure, and anonymous
access policy; Henosis reads and checksums the SQL files without copying them.
