import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1684271349481 implements MigrationInterface {
  name = 'Migration1684271349481';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "companies" ADD "areaCode" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "areaCode"`);
  }
}
