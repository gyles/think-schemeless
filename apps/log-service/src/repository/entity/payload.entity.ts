import { Column, Entity, PrimaryColumn } from 'typeorm'
import { Payload } from '@think/think-schemeless-domain'

@Entity({ name: PayloadEntity.tableName })
export class PayloadEntity extends Payload {
  public static tableName = 'payload'

  @PrimaryColumn({ nullable: false })
  public id: string
  @Column({ nullable: false })
  public itemId: string
  @Column({ nullable: false })
  public amount: number
}
