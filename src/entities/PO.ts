import {
    Column,
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinTable,
    ManyToMany,
    OneToMany,
} from "typeorm";
import { ConnectionNumber } from "./ConnectionNumber";
import { Emergencie } from "./Emergencie";
import { ProsecutionNumber } from "./ProsecutionNumber";
import { Report } from "./Report";

@Entity()
export class PO {
    @PrimaryColumn()
    po_number!: string;

    @Column()
    input_date!: Date;

    @Column()
    edit_date!: Date;

    @Column()
    content: string;

    @Column()
    ska_date: string;

    @Column()
    connection!: string;

    @Column()
    recruitment_date: Date;

    @Column()
    approval: boolean;

    @Column()
    note: string;

    // Relation with the ProsecutionNumber Table
    @ManyToMany((_type) => ProsecutionNumber)
    @JoinTable()
    prosecution_numbers: ProsecutionNumber[];

    @ManyToOne(() => ConnectionNumber, (number) => number.po)
    ku_connection: ConnectionNumber;

    @OneToMany((_type) => Report, (report) => report.po)
    reports: Report[];

    @OneToMany((_type) => Emergencie, (emergencie) => emergencie.po)
    emergencies: Report[];
}
