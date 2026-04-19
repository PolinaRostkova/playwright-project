import { Pool } from 'pg'

export interface DbConfig {
  host:     string
  port:     number
  database: string
  user:     string
  password: string
}

export class DbClient {
  private pool: Pool

  constructor(config: DbConfig) {
    this.pool = new Pool({
      ...config,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    })
  }

  async connect(): Promise<void> {
    const client = await this.pool.connect()
    client.release()
  }

  async disconnect(): Promise<void> {
    await this.pool.end()
  }

  async query<T = Record<string, unknown>>(
    sql: string,
    params: unknown[] = []
  ): Promise<T[]> {
    const result = await this.pool.query(sql, params)
    return result.rows as T[]
  }
}
