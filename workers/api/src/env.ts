export interface Env {
  DB: D1Database
  SESSIONS: KVNamespace
  COUNTER: DurableObjectNamespace
  JOBS: Queue<{ userId: string }>
}
