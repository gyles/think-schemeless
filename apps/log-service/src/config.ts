import { DataSourceOptions } from 'typeorm'

export type Config = {
  port: number
  env: string
  dataSource: {
    eventStore: DataSourceOptions
    projection: DataSourceOptions
  }
}

export const config: Config = {
  port: parseInt(process.env['PORT']) || 3000,
  env: process.env['NODE_ENV'] || 'development',
  dataSource: {
    eventStore: {
      type: 'postgres',
      url:
        process.env['EVENT_STORE_DATABASE_URL'] ||
        'postgres://postgres:postgres@localhost:10007/event-store',
      dropSchema: !!process.env['EVENT_STORE_DROP_SCHEMA'],
      synchronize: !!process.env['EVENT_STORE_SYNCHRONIZE'],
    },
    projection: {
      type: 'postgres',
      url:
        process.env['PROJECTION_DATABASE_URL'] ||
        'postgres://postgres:postgres@localhost:10007/projection',
      dropSchema: !!process.env['EVENT_STORE_DROP_SCHEMA'],
      synchronize: !!process.env['EVENT_STORE_SYNCHRONIZE'],
      migrations: [__dirname + '/migrations/*.{ts,js}'],
      entities: [__dirname + '/repository/entity/*.entity.{ts,js}'],
    },
  },
}
