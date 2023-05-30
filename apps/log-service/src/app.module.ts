import { Module } from '@nestjs/common'
import { config } from './config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LogModule } from './log/log.module'

@Module({
  imports: [TypeOrmModule.forRoot(config.dataSource.projection), LogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
