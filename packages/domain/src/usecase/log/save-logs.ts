import { LogItem } from '../../entity/log-item'
import { LogGateway } from '../../port/log-gateway'
import { DomainException } from '../exception/domain-exception'

export class SaveLogs<Request, Filter> {
  constructor(private readonly logGateway: LogGateway<Request, Filter>) {}

  public saveLogs(logs: LogItem[]) {
    if (logs.length === 0) throw new DomainException('Cannot save empty logs.')
    this.logGateway.saveLogs(logs)
  }
}
