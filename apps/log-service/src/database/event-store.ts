import { DataSource } from 'typeorm'
import { config } from '../config'

export class EventStore extends DataSource {}
const eventStore = new EventStore(config.dataSource.eventStore)

export default eventStore
