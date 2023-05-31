import { Injectable, Logger } from '@nestjs/common'
import { LogItem, SaveLogs, SearchLogs } from '@think/think-schemeless-domain'
import { v4 } from 'uuid'

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name)
  constructor(
    private readonly saveUseCase: SaveLogs<unknown, unknown>,
    private readonly searchUseCase: SearchLogs<unknown, unknown>,
  ) {}

  async searchLogById(id: string) {
    return this.searchUseCase.searchLogById(id)
  }

  async searchByQuery() {
    return this.searchUseCase.searchByQuery(undefined, undefined)
  }

  async saveLogs(logs: Omit<LogItem, 'id' | 'created'>[]) {
    return this.saveUseCase.saveLogs(
      logs.map((log) => ({ id: v4(), created: new Date(), ...log })),
    )
  }
}
