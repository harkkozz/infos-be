import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683722913713 implements MigrationInterface {
    name = 'Migration1683722913713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "slug"`);
    }

}
