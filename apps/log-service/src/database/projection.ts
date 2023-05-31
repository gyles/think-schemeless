import { DataSource } from 'typeorm'
import { configuration } from '../configuration'

const projection = new DataSource(configuration.dataSource.projection)

export default projection
