import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { TakenItem } from "./TakenItem";

@Entity()
export class Reported {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    surname!: string;

    @Column()
    fathers_name!: string;

    @Column()
    address!: string;

    @Column()
    birth_place!: string;

    @OneToMany((_type) => TakenItem, (item) => item.owner)
    taken_items: TakenItem[];
}
