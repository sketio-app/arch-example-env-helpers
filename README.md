# arch-example-env-helpers

[日本語](#日本語) | [English](#english)

## 日本語

[Sketio Arch](https://arch.sketio.app) のパーサー検証用サンプルです。実際に動くアプリではなく、`env` を別の関数に渡す書き方の見本です。

含んでいる書き方（`workers/api` と `workers/gateway` の 2 つの Worker）:

- `api/src/users.ts`, `api/src/app.ts`: `c.env` を別ファイルの helper に渡す（1 段）。その helper がさらに別の関数に `env` を渡す（2 段）
- `api/src/app.ts`: 分割代入（`const { DB, JOBS } = c.env`）
- `api/src/auth.ts`: 関数が作って返す Hono のルーター（`makeAuthRoutes()`）と、`app.route("/auth", makeAuthRoutes())`
- `api/src/rpc.ts`: `WorkerEntrypoint` のクラス（`this.env.DB`）
- `api/src/counter.ts`: Durable Object
- `api/src/index.ts`: `queue()` ハンドラ
- `gateway/src/index.ts`: 2 つ目の Worker から Service Binding の RPC 呼び出し（`env.API.getUser()`）
- `api/wrangler.jsonc`: `queues` の producers と consumers
- `gateway/wrangler.jsonc`: `services` の `entrypoint`

`wrangler.jsonc` の `database_id` と KV の `id` は見本のためのダミーの値です。

ライセンスは MIT です。

## English

A sample for testing the parsers of [Sketio Arch](https://arch.sketio.app). It is not a working app; it is a reference for the different ways a Worker passes `env` on to other functions.

What it covers (two Workers: `workers/api` and `workers/gateway`):

- `api/src/users.ts`, `api/src/app.ts`: `c.env` passed to a helper in another file (one level), and that helper passing `env` on to another function (two levels)
- `api/src/app.ts`: destructuring (`const { DB, JOBS } = c.env`)
- `api/src/auth.ts`: a function that builds and returns a Hono router (`makeAuthRoutes()`), mounted with `app.route("/auth", makeAuthRoutes())`
- `api/src/rpc.ts`: a `WorkerEntrypoint` class (`this.env.DB`)
- `api/src/counter.ts`: a Durable Object
- `api/src/index.ts`: a `queue()` handler
- `gateway/src/index.ts`: a second Worker calling the first through a Service Binding RPC (`env.API.getUser()`)
- `api/wrangler.jsonc`: `queues` with both producers and consumers
- `gateway/wrangler.jsonc`: `services` with an `entrypoint`

The `database_id` and the KV `id` in the wrangler files are dummy values for the sample.

MIT licensed.
