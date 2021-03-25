import {
    Column,
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinTable,
    ManyToMany,
} from "typeorm";
import { Crime } from "./Crime";
import { DamagedIndividual } from "./DamagedIndividual";
import { DamagedLegalEntity } from "./DamagedLegalEntity";
import { LSNumber } from "./LSNumber";
import { MeasureTaken } from "./MeasureTaken";
import { Reported } from "./Reported";
import { ConnectionNumber } from "./ConnectionNumber";
import { Worker } from "./Worker";

@Entity()
export class KU {
    @PrimaryColumn()
    ku_number!: string;

    @Column()
    input_date!: Date;

    @Column()
    edit_date!: Date;

    @Column()
    delivery_date: Date;

    @Column()
    ska_date: string;

    @Column()
    connection!: string;

    // Relation with the LSNumber Table
    @ManyToOne(() => LSNumber, (number) => number.ku)
    ls_numbers: LSNumber[];

    // Relation with the Worker Table
    @ManyToOne((_type) => MeasureTaken, (measure) => measure.ku)
    measure: MeasureTaken;

    // Relation with the Crime Table
    @ManyToMany((_type) => Crime)
    @JoinTable()
    crimes: Crime[];

    // Relation with the Worker Table
    @ManyToMany((_type) => Worker)
    @JoinTable()
    clerks: Worker[];

    // Relation with the Reported Table
    @ManyToMany((_type) => Reported)
    @JoinTable()
    reported: Reported[];

    // Relation with the DamagedLegalEntity Table
    @ManyToMany((_type) => DamagedLegalEntity)
    @JoinTable()
    DamagedLegalEntities: DamagedLegalEntity[];

    // Relation with the DamagedIndividual Table
    @ManyToMany((_type) => DamagedIndividual)
    @JoinTable()
    DamagedIndividual: DamagedIndividual[];

    @ManyToOne(() => ConnectionNumber, (number) => number.ku)
    po_connection: ConnectionNumber;
}
