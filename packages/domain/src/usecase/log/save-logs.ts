import { LogItem } from '../../entity/log-item'
import { LogGateway } from '../../port/log-gateway'
import { DomainException } from '../exception/domain-exception'

export class SaveLogs<T extends Iterable<LogItem>, U, V> {
  constructor(private readonly logGateway: LogGateway<T, U, V>) {}

  public saveLogs(logs: Array<LogItem>) {
    if (logs.length === 0) throw new DomainException('Cannot save empty logs.')
    this.logGateway.saveLogs(logs)
  }
}
