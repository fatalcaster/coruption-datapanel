import { Entity, PrimaryColumn, ManyToOne, Column } from "typeorm";
import { KU } from "./KU";

@Entity()
export class TakenItem {
    @PrimaryColumn()
    id!: string;

    @Column()
    delivered_to: string;

    @ManyToOne((_type) => KU, (ku) => ku.taken_items)
    ku!: KU;
}
