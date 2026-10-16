import type { Env } from "./env"

export default {
  async fetch(request, env) {
    const token = request.headers.get("authorization") ?? ""
    if (!(await env.API.isSignedIn(token))) return new Response("Sign in first", { status: 401 })
    const id = new URL(request.url).pathname.split("/").pop() ?? ""
    return Response.json(await env.API.getUser(id))
  },
} satisfies ExportedHandler<Env>
