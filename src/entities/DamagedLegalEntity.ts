import { Column, Entity, PrimaryColumn, OneToMany, ManyToMany } from "typeorm";
import { KU } from "./KU";
import { TakenItem } from "./TakenItem";

@Entity()
export class DamagedLegalEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    address!: string;

    @Column()
    name!: string;

    @ManyToMany((_type) => KU, (ku) => ku.DamagedLegalEntities)
    ku: KU[];
}
