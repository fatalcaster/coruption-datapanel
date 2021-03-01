import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class AppliedMeasures {
    @PrimaryKey()
    id!: number;

    @Property()
    depravation!: boolean;

    @Property()
    imprisoning!: boolean;

    @Property()
    forfeiture!: boolean;
}
