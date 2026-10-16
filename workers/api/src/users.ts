import type { Env } from "./env"

// One level: the route hands `c.env` to this function.
export async function listUsers(env: Env) {
  const { results } = await env.DB.prepare("SELECT id, name FROM users").all()
  return results
}

// Two levels: this function passes `env` on to another helper.
export async function getUserWithVisits(env: Env, id: string) {
  const user = await findUser(env, id)
  return { user, visits: await visitsOf(env, id) }
}

async function findUser(env: Env, id: string) {
  return env.DB.prepare("SELECT id, name FROM users WHERE id = ?").bind(id).first()
}

async function visitsOf(env: Env, id: string): Promise<number> {
  const stub = env.COUNTER.get(env.COUNTER.idFromName(id))
  return Number(await (await stub.fetch("https://counter/")).text())
}
