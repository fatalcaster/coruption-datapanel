import {
    Collection,
    Entity,
    OneToMany,
    PrimaryKey,
    Property,
} from "@mikro-orm/core";
import { Field } from "formik";

@Entity()
export class KU {
    @PrimaryKey()
    ku_number!: string;

    @Field(() => String)
    @Property({ type: "date" })
    input_date!: Date;

    @Field(() => String)
    @Property({ type: "date" })
    delivering_date!: Date | undefined;

    @Property()
    note!: string | undefined;

    @Field(() => String)
    @Property({ type: "date" })
    ska_date!: Date | undefined;

    @Property()
    po_oo_connection!: string | undefined;
}
