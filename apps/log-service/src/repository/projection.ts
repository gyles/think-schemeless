import { DataSource } from 'typeorm'
import { config } from '../config'

const projection = new DataSource(config.dataSource.projection)

export default projection
