import { app } from "./app"
import type { Env } from "./env"

export { Counter } from "./counter"
export { Api } from "./rpc"

export default {
  fetch: app.fetch,

  // Messages sent to JOBS arrive here.
  async queue(batch, env) {
    for (const message of batch.messages) {
      await env.DB.prepare("UPDATE users SET welcomed = 1 WHERE id = ?").bind(message.body.userId).run()
      message.ack()
    }
  },
} satisfies ExportedHandler<Env, { userId: string }>
