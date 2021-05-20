import {
    Column,
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinTable,
    ManyToMany,
    OneToMany,
    BaseEntity,
} from "typeorm";
import { Crime } from "./Crime";
import { DamagedIndividual } from "./DamagedIndividual";
import { DamagedLegalEntity } from "./DamagedLegalEntity";
import { LSNumber } from "./LSNumber";
import { MeasureTaken } from "./MeasureTaken";
import { Reported } from "./Reported";
import { ConnectionNumber } from "./ConnectionNumber";
import { Worker } from "./Worker";
import { TakenItem } from "./TakenItem";

@Entity()
export class KU extends BaseEntity {
    @PrimaryColumn()
    number!: string;

    @Column()
    case_number!: string;

    @Column()
    file: string;

    @Column()
    input_date!: string;

    @Column()
    edit_date!: string;

    @Column({
        nullable: true,
    })
    delivery_date?: string;

    @Column({
        nullable: true,
    })
    ska_date?: string;

    @Column()
    materialDamage?: string;

    @Column()
    euros: boolean;

    @Column()
    note?: string;

    // Relation with the LSNumber Table
    @OneToMany(() => LSNumber, (number) => number.ku)
    ls_numbers: LSNumber[];

    // Relation with the Worker Table
    @ManyToOne((_type) => MeasureTaken, (measure) => measure.ku)
    measure: MeasureTaken;

    // Relation with the Crime Table
    @ManyToMany((_type) => Crime, (crime) => crime.ku, {
        cascade: true,
    })
    @JoinTable()
    crimes: Crime[];

    // Relation with the Worker Table
    @ManyToOne((_type) => Worker, (worker) => worker.ku)
    clerk!: Worker;

    // Relation with the Reported Table
    @ManyToMany((_type) => Reported, (reported) => reported.ku, {
        cascade: true,
    })
    @JoinTable()
    reported: Reported[];

    // Relation with the DamagedLegalEntity Table
    @ManyToMany((_type) => DamagedLegalEntity, (dle) => dle.ku, {
        cascade: true,
    })
    @JoinTable()
    DamagedLegalEntities: DamagedLegalEntity[];

    // Relation with the DamagedIndividual Table
    @ManyToMany((_type) => DamagedIndividual, (di) => di.ku, {
        cascade: true,
    })
    @JoinTable()
    DamagedIndividual: DamagedIndividual[];

    @ManyToOne((_type) => ConnectionNumber, (number) => number.ku)
    po_connection?: ConnectionNumber;

    @OneToMany((_type) => TakenItem, (item) => item.ku, {
        cascade: true,
    })
    taken_items: TakenItem[];
}
