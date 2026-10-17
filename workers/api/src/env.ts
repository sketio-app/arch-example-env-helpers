export interface Env {
  DB: D1Database
  SESSIONS: KVNamespace
  CACHE: KVNamespace
  COUNTER: DurableObjectNamespace
  JOBS: Queue<{ userId: string }>
}
