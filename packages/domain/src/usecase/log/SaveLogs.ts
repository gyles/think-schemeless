import { LogItem } from '../../entity/LogItem'
import { LogGateway } from '../../port/LogGateway'
import { DomainException } from '../exception/DomainException'

export class SaveLogs<T extends Iterable<LogItem>, U, V> {
  constructor(private readonly logGateway: LogGateway<T, U, V>) {}

  public saveLogs(logs: Array<LogItem>) {
    if (logs.length === 0) throw new DomainException('Cannot save empty logs.')
    this.logGateway.saveLogs(logs)
  }
}
