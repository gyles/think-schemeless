import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initialise1685349505990 implements MigrationInterface {
  name = 'Initialise1685349505990'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payload" ("id" character varying NOT NULL, "itemId" character varying NOT NULL, "amount" integer NOT NULL, CONSTRAINT "PK_ffb6759848fb1ac30fd2bc2e7c3" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "log_item" ("id" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT '"2023-05-29T08:38:26.265Z"', "userId" character varying NOT NULL, "action" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_3f752d4ed86402411327566f5fe" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "log_item"`)
    await queryRunner.query(`DROP TABLE "payload"`)
  }
}
