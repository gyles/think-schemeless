import { Module } from '@nestjs/common'
import { LogRepository } from './log.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LogItemEntity } from './entities/log-item.entity'
import { PayloadEntity } from './entities/payload.entity'
import { LogController } from './log.controller'
import { SaveLogs, SearchLogs } from '@think/think-schemeless-domain'
import { LogService } from './log.service'

@Module({
  imports: [TypeOrmModule.forFeature([LogItemEntity, PayloadEntity])],
  controllers: [LogController],
  providers: [
    LogRepository,
    LogService,
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
