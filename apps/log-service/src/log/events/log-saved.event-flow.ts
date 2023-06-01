import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventStore } from '@schemeless/event-store'
import { CreatedEvent, EventFlow } from '@schemeless/event-store-types'
import { LogItem } from '@think/think-schemeless-domain'
import { Repository } from 'typeorm'
import { LogItemEntity } from '../entities/log-item.entity'

@Injectable()
export class LogSavedEventFlow
  implements EventFlow<Partial<LogItem>[], LogItem[]>
{
  readonly domain = 'Log'
  readonly type = 'Saved'

  constructor(
    @InjectRepository(LogItemEntity)
    private readonly repository: Repository<LogItemEntity>,
  ) {}

  async apply(event: CreatedEvent<LogItem[]>) {
    this.repository.save(event.payload)
  }

  async receive(eventStore: EventStore) {
    return eventStore.receive(this)
  }
}
