import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";

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
}
