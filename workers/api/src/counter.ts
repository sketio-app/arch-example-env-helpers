import { DurableObject } from "cloudflare:workers"
import type { Env } from "./env"

/** A Durable Object that counts visits. */
export class Counter extends DurableObject<Env> {
  async fetch(_request: Request): Promise<Response> {
    const count = ((await this.ctx.storage.get<number>("count")) ?? 0) + 1
    await this.ctx.storage.put("count", count)
    return new Response(String(count))
  }
}
