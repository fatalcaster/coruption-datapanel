import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    Unique,
} from "typeorm";
import { KU } from "./KU";

@Entity()
export class Crime {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @ManyToMany((_type) => KU, (ku) => ku.crimes)
    ku: KU[];
}
