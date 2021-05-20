import { Column, Entity, PrimaryColumn, OneToMany, ManyToMany } from "typeorm";
import { KU } from "./KU";

@Entity()
export class DamagedIndividual {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    surname!: string;

    @Column()
    father_name!: string;

    @Column()
    address!: string;

    @ManyToMany((_type) => KU, (ku) => ku.DamagedIndividual)
    ku: KU[];
}
