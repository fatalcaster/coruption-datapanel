import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Crime {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
}
