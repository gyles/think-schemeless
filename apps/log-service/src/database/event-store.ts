import { configuration } from '../configuration'
import { EventStoreRepo } from '@schemeless/event-store-adapter-typeorm'

const initEventStore = async () => {
  const eventStoreRepository = new EventStoreRepo(
    configuration.dataSource.eventStore as never,
  )
  await eventStoreRepository.init()
  eventStoreRepository.conn.synchronize(true)
}

initEventStore()
