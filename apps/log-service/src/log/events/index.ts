import { EventFlow } from '@schemeless/event-store-types'
import { LogSavedEventFlow } from './log-saved.event-flow'

export const eventFlows: EventFlow[] = [LogSavedEventFlow]
