import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PO } from "./PO";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    going_to!: string;

    @ManyToOne((_type) => PO, (po) => po.reports)
    po: PO;
}
