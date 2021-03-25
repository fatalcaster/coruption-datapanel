import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { TakenItem } from "./TakenItem";

@Entity()
export class DamagedLegalEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    address!: string;

    @Column()
    name!: string;
}
