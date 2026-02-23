import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("words")
export class WordOrmEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    difficulty: string;
}