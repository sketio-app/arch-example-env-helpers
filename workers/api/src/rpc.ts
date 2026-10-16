import { WorkerEntrypoint } from "cloudflare:workers"
import type { Env } from "./env"

/** Methods another Worker can call through a Service Binding. */
export class Api extends WorkerEntrypoint<Env> {
  async getUser(id: string) {
    return this.env.DB.prepare("SELECT id, name FROM users WHERE id = ?").bind(id).first()
  }

  async isSignedIn(token: string): Promise<boolean> {
    return (await this.env.SESSIONS.get(token)) !== null
  }
}
