import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LogModule } from './log/log.module'
import configuration from './configuration'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot(configuration().dataSource.projection),
    LogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
