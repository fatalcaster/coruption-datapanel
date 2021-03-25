import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PO } from "./PO";

@Entity()
export class Emergencie {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @ManyToOne((_type) => PO, (po) => po.reports)
    po: PO;
}
