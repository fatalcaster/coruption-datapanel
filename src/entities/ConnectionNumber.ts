import { Entity, PrimaryColumn, OneToMany } from "typeorm";
import { KU } from "./KU";
import { PO } from "./PO";

@Entity()
export class ConnectionNumber {
    @PrimaryColumn()
    id!: string;

    @OneToMany((_type) => KU, (ku) => ku.po_connection)
    ku: KU[];

    @OneToMany((_type) => PO, (po) => po.ku_connection)
    po: PO[];
}
