import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Worker {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    surname!: string;
}
