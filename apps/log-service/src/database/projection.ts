import { DataSource } from 'typeorm'
import { config } from '../config'

export class Projection extends DataSource {}
const projection = new Projection(config.dataSource.projection)

export default projection
