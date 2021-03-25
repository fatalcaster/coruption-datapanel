import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { KU } from "./KU";

@Entity()
export class MeasureTaken {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    depravation!: boolean;

    @Column()
    imprisoning!: boolean;

    @Column()
    forfeiture!: boolean;

    @OneToMany((_type) => KU, (ku) => ku.measure)
    ku: KU[];
}
