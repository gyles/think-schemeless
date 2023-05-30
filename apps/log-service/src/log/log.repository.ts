import { Injectable, Logger } from '@nestjs/common'
import { LogGateway, LogItem } from 'packages/domain/dist'
import { Repository } from 'typeorm'
import { LogItemEntity } from './entities/log-item.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class LogRepository implements LogGateway<unknown, unknown> {
  private readonly logger = new Logger(LogRepository.name)
  constructor(
    @InjectRepository(LogItemEntity)
    private readonly repository: Repository<LogItemEntity>,
  ) {}

  async getLogById(id: string): Promise<LogItem> {
    return this.repository.findOneBy({ id })
  }

  async getLogs(): Promise<LogItem[]> {
    return this.repository.find()
  }

  async saveLogs(logs: LogItem[]): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
