import {
    Collection,
    Entity,
    OneToMany,
    PrimaryKey,
    Property,
} from "@mikro-orm/core";
import { KU } from "./KU";

@Entity()
export class MergingNumbers {
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

    @OneToMany(() => MergingNumbers, (ku) => ku.id)
    books1 = new Collection<KU>(this);
}
