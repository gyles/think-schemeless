import { LogItem } from '../entity/log-item'

export interface LogGateway<T extends Iterable<LogItem>, U, V> {
  getLogById(id: string): LogItem
  getLogs(request: U, filter: V): T
  saveLogs(logs: Array<LogItem>): void
}
