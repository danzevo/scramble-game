import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1773199525213 implements MigrationInterface {
    name = 'Init1773199525213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "words" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "difficulty" character varying NOT NULL, CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "words"`);
    }

}
