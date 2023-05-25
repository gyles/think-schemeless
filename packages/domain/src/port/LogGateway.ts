import { LogItem } from '../entity/LogItem'

export interface LogGateway<T extends Iterable<LogItem>, U, V> {
  getLogById(id: string): LogItem
  getLogs(request: U, filter: V): T
  saveLogs(logs: Array<LogItem>): void
}
