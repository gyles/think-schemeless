import { Inject, Injectable, Logger } from '@nestjs/common'
import { LogGateway, LogItem } from '@think/think-schemeless-domain'
import { Repository } from 'typeorm'
import { LogItemEntity } from './entities/log-item.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { EventStore } from '@schemeless/event-store'
import { LogSavedEventFlow } from './events/log-saved.event-flow'
import { v4 } from 'uuid'
import { LogEventStore } from './injectables'

@Injectable()
export class LogRepository implements LogGateway<unknown, unknown> {
  private readonly logger = new Logger(LogRepository.name)

  constructor(
    @InjectRepository(LogItemEntity)
    private readonly repository: Repository<LogItemEntity>,
    @Inject(LogEventStore)
    private readonly eventStore: EventStore,
    private readonly saveEvent: LogSavedEventFlow,
  ) {}

  async getLogById(id: string): Promise<LogItem> {
    return this.repository.findOneBy({ id })
  }

  async getLogs(): Promise<LogItem[]> {
    return this.repository.find()
  }

  async saveLogs(logs: LogItem[]): Promise<void> {
    ;(await this.saveEvent.receive(this.eventStore))({
      identifier: v4(),
      payload: logs,
    })
  }
}
