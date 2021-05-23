import { Connection, getConnection, getRepository } from "typeorm";
import { Crime } from "../../../entities/Crime";
import { KU } from "../../../entities/KU";
import { addProperty, getListDifference, getProperty } from "../Utils";

export async function assignCrimes(
  crimes: string[] | undefined,
  ku: KU,
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

  return temp;
}

export async function getCrimes() {
  const data = await getConnection().getRepository(Crime).find();
  let crimes = getProperty(data, "name");
  if (!crimes) return null;
  return crimes;
}
