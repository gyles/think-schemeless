import { LogItem } from '../../entity/LogItem'
import { LogGateway } from '../../port/LogGateway'

export class SearchLogs<T extends Iterable<LogItem>, U, V> {
  constructor(private readonly logGateway: LogGateway<T, U, V>) {}

  public searchLogById(id: string) {
    return this.logGateway.getLogById(id)
  }

  public searchByQuery(request: U, query: V) {
    return this.logGateway.getLogs(request, query)
  }
}
