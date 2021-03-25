import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { Reported } from "./Reported";

@Entity()
export class TakenItem {
    @PrimaryColumn()
    id!: string;

    @ManyToOne((_type) => Reported, (author) => author.taken_items)
    owner: Reported;
}
