import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    BaseEntity,
} from "typeorm";
import { KU } from "./KU";

@Entity()
export class Worker extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    surname!: string;

    @OneToMany((_type) => KU, (ku) => ku.clerk, {
        cascade: true,
    })
    ku: KU[];
}
