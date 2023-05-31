import { Body, Controller, Get, Post } from '@nestjs/common'
import { LogService } from './log.service'
import { LogItem } from '@think/think-schemeless-domain'

@Controller({ path: 'logs', version: '1' })
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get(':id')
  async getLogById(id: string): Promise<LogItem> {
    return this.logService.searchLogById(id)
  }

  @Get()
  async getLogs(): Promise<LogItem[]> {
    return this.logService.searchByQuery()
  }

  @Post()
  async saveLogs(
    @Body() logs: Omit<LogItem, 'id' | 'created'>[],
  ): Promise<void> {
    this.logService.saveLogs(logs)
  }
}
