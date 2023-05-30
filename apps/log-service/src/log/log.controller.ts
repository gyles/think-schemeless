import { Controller, Get } from '@nestjs/common'
import { LogService } from './log.service'
import { LogItem } from '@think/think-schemeless-domain'

@Controller({ path: 'logs', version: '1' })
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get(':id')
  getLogById(id: string): Promise<LogItem> {
    return this.logService.searchLogById(id)
  }

  @Get()
  getLogs(): Promise<LogItem[]> {
    return this.logService.searchByQuery()
  }
}
