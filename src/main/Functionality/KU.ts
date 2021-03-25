import {
    Connection,
    createConnection,
    getConnection,
    getConnectionManager,
    getRepository,
} from "typeorm";
import { KU } from "../../entities/KU";
import typeormConfig from "../../typeorm.config";

interface KUData {
    values: {
        ku_number: string;
        ku_file: string;
        case_number: string;
        ku_inserting_date: string;
        depravation: boolean;
        imprisoning: boolean;
        forfeiture: boolean;
        ku_delivering_date: string;
        ska_date: string;
        po_connection: string;
        materialDamage: string;
        euros: boolean;
        ku_note: string;
    };
    criminalActs: string[] | undefined;
    reportedPeople: ReportedTableElements[] | undefined;
    LSNumbers: string[] | undefined;
    takenItems: TakenItem[] | undefined;
    damagedIndividuals: DamagedIndividual[] | undefined;
    damagedLegalEntities: DamagedLegalEntity[] | undefined;
}

export async function saveKU(data: KUData) {
    console.log("Foo");
    const connection = getConnection();
    const user = connection
        .createQueryBuilder()
        .select("ku")
        .from(KU, "ku")
        .where("ku.ku_number = :ku_number", { ku_number: "54645" })
        .getOne();

    console.log(connection);
}

// export class KUManager {
//     public static connection: Connection;

//     init() {

//     }

//     private constructor() {
//         console.log("Connection Created");
//         KUManager.connection = createConnection(typeormConfig);
//     }
// }
