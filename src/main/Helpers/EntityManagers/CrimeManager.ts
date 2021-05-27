import { Connection, getConnection } from "typeorm";
import { Crime } from "../../../entities/Crime";
import { getProperty } from "../Utils";

export async function assignCrimes(
    crimes: string[] | undefined,
    connection: Connection
): Promise<Crime[]> {
    if (!crimes || crimes.length == 0) {
        return [];
    }

    let temp = [];

    for (let i = 0; i < crimes.length; i++) {
        let k = new Crime();
        k.name = crimes[i];
        temp.push(k);
    }
    console.log("TEMP: " + JSON.stringify(temp));
    await connection
        .createQueryBuilder()
        .insert()
        .into(Crime)
        .values(temp)
        .onConflict(`("name") DO NOTHING`)
        .execute();

    temp = await connection
        .getRepository(Crime)
        .createQueryBuilder("crime")
        .where("crime.name IN (:names)", { names: crimes })
        .getMany();

    return temp;
}

export async function getCrimes() {
    const data = await getConnection().getRepository(Crime).find();
    let crimes = getProperty(data, "name");
    if (!crimes) return null;
    return crimes;
}
