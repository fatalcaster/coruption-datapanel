import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ProsecutionNumber {
    @PrimaryColumn()
    number!: string;
}
