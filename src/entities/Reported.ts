import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Reported {
    @PrimaryKey()
    id!: string;

    @Property()
    name!: string;

    @Property()
    surname!: string;

    @Property()
    fatherName!: string;

    @Property()
    address!: string;

    @Property()
    birth_place!: string;
}
