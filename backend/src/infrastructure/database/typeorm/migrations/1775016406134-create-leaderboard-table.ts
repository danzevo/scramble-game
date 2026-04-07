import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLeaderboardTable1775016406134 implements MigrationInterface {
    name = 'CreateLeaderboardTable1775016406134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "leaderboard" ("id" uuid NOT NULL, "userId" character varying NOT NULL, "username" character varying NOT NULL, "totalScore" integer NOT NULL DEFAULT '0', "gamesPlayed" integer NOT NULL DEFAULT '0', "bestStreak" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_76fd1d52cf44d209920f73f4608" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "leaderboard"`);
    }

}
