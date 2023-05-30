import { LogItem } from '../entity/log-item'
import { Gateway } from './gateway'

export type LogGateway<Request, Filter> = Gateway<LogItem, Request, Filter>
