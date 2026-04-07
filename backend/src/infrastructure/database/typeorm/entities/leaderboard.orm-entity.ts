import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('leaderboard')
export class LeaderboardOrmEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column('varchar')
    userId: string;

    @Column('varchar')
    username: string;

    @Column('int', { default: 0})
    totalScore: number;

    @Column('int', {default: 0 })
    gamesPlayed: number;

    @Column('int', { default: 0 })
    bestStreak: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}