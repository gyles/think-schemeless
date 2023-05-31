import { Module } from '@nestjs/common'
import { LogRepository } from './log.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SaveLogs, SearchLogs } from '@think/think-schemeless-domain'
import { EventStoreRepo } from '@schemeless/event-store-adapter-typeorm'
import { makeEventStore } from '@schemeless/event-store'
import { LogItemEntity } from './entities/log-item.entity'
import { PayloadEntity } from './entities/payload.entity'
import { LogController } from './log.controller'
import { LogService } from './log.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { eventFlows } from './events'
import { observers } from './observers'

@Module({
  imports: [
    TypeOrmModule.forFeature([LogItemEntity, PayloadEntity]),
    ConfigModule,
  ],
  controllers: [LogController],
  providers: [
    LogRepository,
    LogService,
    {
      provide: 'LogEventStore',
      useFactory: async (configService: ConfigService) => {
        const eventStoreRepository = new EventStoreRepo(
          configService.get('dataSource.eventStore'),
        )
        await eventStoreRepository.init()
        const eventStore = await makeEventStore(eventStoreRepository)(
          eventFlows,
          observers,
        )
        eventStore.output$.subscribe(() => {
          // do nothing
        })

        return eventStore
      },
      inject: [ConfigService],
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
