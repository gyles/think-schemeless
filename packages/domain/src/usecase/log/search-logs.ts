import { LogGateway } from '../../port/log-gateway'

export class SearchLogs<Request, Filter> {
  constructor(private readonly logGateway: LogGateway<Request, Filter>) {}

  public searchLogById(id: string) {
    return this.logGateway.getLogById(id)
  }

  public searchByQuery(request: Request, query: Filter) {
    return this.logGateway.getLogs(request, query)
  }
}
