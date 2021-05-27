import { Column, Entity, PrimaryColumn, OneToMany, ManyToMany } from "typeorm";
import { KU } from "./KU";
import { TakenItem } from "./TakenItem";

@Entity()
export class Reported {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    surname!: string;

    @Column()
    fathers_name!: string;

    @Column()
    address!: string;

    @Column()
    birth_place!: string;
}
