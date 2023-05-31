import { EventFlow } from '@schemeless/event-store-types'
import { LogItem } from '@think/think-schemeless-domain'

export const LogSavedEventFlow: EventFlow<Partial<LogItem>[], LogItem[]> = {
  domain: 'Log',
  type: 'Saved',
  receive: (eventStore) => eventStore.receive(LogSavedEventFlow),
}
