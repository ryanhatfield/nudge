import { parse } from "https://deno.land/std@0.127.0/flags/mod.ts";
import { serve } from "https://deno.land/std@0.127.0/http/server.ts";

const args = parse(Deno.args, {
  default: {
    port: 4325,
    cmd: "echo",
    args: "nudge",
    status: 204,
  },
});

const port = args.port as number;
const cmd = [args.cmd as string, args.args];
const status = args.status as number;

await serve(() => {
  Deno.run({ cmd });
  return new Response(null, { status });
}, { port });
