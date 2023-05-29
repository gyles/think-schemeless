import { Entity, PrimaryColumn, Column, OneToOne } from 'typeorm'
import { LogItem, Payload } from '@think/think-schemeless-domain'
import { PayloadEntity } from './payload.entity'

@Entity({ name: LogItemEntity.tableName })
export class LogItemEntity extends LogItem {
  public static tableName = 'log_item'

  @PrimaryColumn({ nullable: false })
  public id: string

  @Column({ nullable: false, default: new Date() })
  public created: Date

  @Column({ nullable: false })
  public userId: string

  @Column({ nullable: false })
  public action: string

  @Column({ nullable: false })
  public url: string

  @OneToOne(PayloadEntity.name, { nullable: true })
  public payload: Payload
}
