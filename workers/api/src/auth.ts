import { Hono } from "hono"
import type { Env } from "./env"

// A function that builds and returns a Hono router. The Worker mounts it with `app.route("/auth", makeAuthRoutes())`.
export function makeAuthRoutes() {
  const auth = new Hono<{ Bindings: Env }>()

  auth.post("/login", async (c) => {
    const { SESSIONS } = c.env
    const token = crypto.randomUUID()
    await SESSIONS.put(token, "1", { expirationTtl: 3600 })
    return c.json({ token })
  })

  return auth
}
