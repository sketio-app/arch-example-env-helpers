import { Hono } from "hono"
import { makeAuthRoutes } from "./auth"
import type { Env } from "./env"
import { getUserWithVisits, listUsers } from "./users"

export const app = new Hono<{ Bindings: Env }>()

app.route("/auth", makeAuthRoutes())

// `c.env` passed to a helper in another file.
app.get("/users", async (c) => c.json(await listUsers(c.env)))

// The helper passes it on again.
app.get("/users/:id", async (c) => c.json(await getUserWithVisits(c.env, c.req.param("id"))))

// Destructuring: the binding is taken out of `c.env`.
app.post("/users", async (c) => {
  const { DB, JOBS } = c.env
  const { name } = await c.req.json<{ name: string }>()
  const id = crypto.randomUUID()
  await DB.prepare("INSERT INTO users (id, name) VALUES (?, ?)").bind(id, name).run()
  await JOBS.send({ userId: id })
  return c.json({ id }, 201)
})
