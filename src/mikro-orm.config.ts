import { User } from "./entities/User";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [User],
    dbName: "Korupcija",
    type: "sqlite",
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
