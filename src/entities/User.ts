import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";

@Entity()
export class User {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    surname!: string;

    @Property()
    @Unique()
    username!: string;

    @Property()
    password!: string;
}
