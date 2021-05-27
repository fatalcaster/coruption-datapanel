import { Connection } from "typeorm";
import { KU } from "../../../entities/KU";
import { Worker } from "../../../entities/Worker";
import { getProperDate, getProperWorkerName } from "../Utils";

export async function assignKUBasicProperties(
    values: {
        ku_number: string;
        ku_file: string;
        case_number: string;
        input_date: string;
        depravation: boolean;
        imprisoning: boolean;
        forfeiture: boolean;
        ku_delivering_date: string;
        ska_date: string;
        po_connection: string;
        materialDamage: string;
        euros: boolean;
        ku_note: string;
        clerk: string;
    },
    connection: Connection
): Promise<KU | undefined> {
    let ku;
    let worker_data = getProperWorkerName(values.clerk);
    if (!worker_data) {
        console.log("Data Not Saved");
        return undefined;
    }
    let worker = await connection
        .getRepository(Worker)
        .createQueryBuilder("worker")
        .where("worker.name = :name AND worker.surname = :surname", {
            name: worker_data.name,
            surname: worker_data.surname,
        })
        .getOne();
    if (!worker) {
        worker = new Worker();
        worker.name = worker_data.name;
        worker.surname = worker_data.surname;
        worker = await connection.manager.save(worker);
    }
    ku = new KU();
    ku.number = values.ku_number;
    ku.case_number = values.case_number;
    ku.file = values.ku_file;
    ku.input_date = getProperDate(values.input_date);
    ku.edit_date = getProperDate();
    ku.materialDamage = values.materialDamage || "0";
    ku.euros = values.euros || false;
    ku.note = values.ku_note || "";
    ku.clerk = worker;

    ku.delivery_date = values.ku_delivering_date
        ? getProperDate(values.ku_delivering_date)
        : "";
    ku.delivery_date = values.ska_date ? getProperDate(values.ska_date) : "";

    ku = await connection.manager.save(ku);
    return ku;
}
