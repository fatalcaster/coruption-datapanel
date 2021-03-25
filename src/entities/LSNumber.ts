import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { KU } from "./KU";

@Entity()
export class LSNumber {
    @PrimaryColumn()
    number!: string;

    @ManyToOne(() => KU, (ku) => ku.ls_numbers)
    ku: KU;
}
