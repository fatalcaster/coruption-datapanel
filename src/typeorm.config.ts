import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { ConnectionNumber } from "./entities/ConnectionNumber";
import { Crime } from "./entities/Crime";
import { DamagedIndividual } from "./entities/DamagedIndividual";
import { DamagedLegalEntity } from "./entities/DamagedLegalEntity";
import { Emergencie } from "./entities/Emergencie";
import { KU } from "./entities/KU";
import { LSNumber } from "./entities/LSNumber";
import { MeasureTaken } from "./entities/MeasureTaken";
import { PO } from "./entities/PO";
import { ProsecutionNumber } from "./entities/ProsecutionNumber";
import { Report } from "./entities/Report";
import { Reported } from "./entities/Reported";
import { TakenItem } from "./entities/TakenItem";
import { User } from "./entities/User";
import { Worker } from "./entities/Worker";

export default {
    name: "default",
    type: "sqlite",
    database: "Korupcija",
    logging: true,
    logger: "advanced-console",
    entities: [
        // Reported,
        // TakenItem,
        // Worker,
        // KU,
        // LSNumber,
        // MeasureTaken,
        // Crime,
        // DamagedIndividual,
        // DamagedLegalEntity,
        // ConnectionNumber,
        // PO,
        // ProsecutionNumber,
        // Report,
        // Emergencie,
        User,
    ],
    synchronize: true,
} as SqliteConnectionOptions;
