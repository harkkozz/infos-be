import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683722990309 implements MigrationInterface {
    name = 'Migration1683722990309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "slug" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "slug" SET NOT NULL`);
    }

}
