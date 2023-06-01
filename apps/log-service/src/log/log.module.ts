import { Logger, Module } from '@nestjs/common'
import { SaveLogs, SearchLogs } from '@think/think-schemeless-domain'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LogRepository } from './log.repository'
import { LogController } from './log.controller'
import { LogService } from './log.service'
import { LogSavedEventFlow } from './events/log-saved.event-flow'
import { LogItemEntity } from './entities/log-item.entity'
import { PayloadEntity } from './entities/payload.entity'
import { EventStoreRepo } from '@schemeless/event-store-adapter-typeorm'
import { EventFlow, makeEventStore } from '@schemeless/event-store'
import { LogEventFlows, LogEventStore } from './injectables'

@Module({
  imports: [
    TypeOrmModule.forFeature([LogItemEntity, PayloadEntity]),
    ConfigModule,
  ],
  controllers: [LogController],
  providers: [
    LogRepository,
    LogService,
    LogSavedEventFlow,
    // events
    {
      provide: LogEventFlows,
      useFactory: (saved: LogSavedEventFlow) => [saved],
      inject: [LogSavedEventFlow],
    },
    // event store
    {
      provide: LogEventStore,
      useFactory: async (
        configService: ConfigService,
        eventFlows: EventFlow[],
      ) => {
        const logger = new Logger(LogModule.name)
        const eventStoreRepository = new EventStoreRepo(
          configService.get('dataSource.eventStore'),
        )
        await eventStoreRepository.init()
        const eventStore = await makeEventStore(eventStoreRepository)(
          eventFlows,
          [],
        )
        eventStore.output$.subscribe((output) => {
          if (output.error) logger.warn(output.error)
          logger.log(`EventStore: ${output.state}`)
        })

        return eventStore
      },
      inject: [ConfigService, LogEventFlows],
    },
    // use cases
    {
      provide: SaveLogs,
      useFactory: (repository: LogRepository) => new SaveLogs(repository),
      inject: [LogRepository],
    },
    {
      provide: SearchLogs,
      useFactory: (repository: LogRepository) => new SearchLogs(repository),
      inject: [LogRepository],
    },
  ],
})
export class LogModule {}
