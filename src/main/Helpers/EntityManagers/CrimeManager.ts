import { Connection } from "typeorm";
import { Crime } from "../../../entities/Crime";
import { KU } from "../../../entities/KU";
import { addProperty, getListDifference } from "../Utils";

export async function assignCrimes(
  crimes: string[] | undefined,
  ku: KU,
  connection: Connection
): Promise<Crime[]> {
  if (!crimes || crimes.length == 0) {
    return [];
  }

  const existingCrimes = await connection
    .getRepository(KU)
    .createQueryBuilder("ku")
    .where("number = :number", { number: ku.number })
    .leftJoinAndSelect("ku.crimes", "crime")
    .getMany();

  let temp = [];

  for (let i = 0; i < crimes.length; i++) {
    temp.push({ ku: [ku], name: crimes[i] });
  }

  // Old minus new
  const p = getListDifference(existingCrimes, temp, "name", 1);
  console.log(p);

  console.log("KRIMINAL\n" + crimes);

  //new minus old
  const d = getListDifference(existingCrimes, temp, "name", 2);
  console.log(d);
  // await connection
  //   .createQueryBuilder()
  //   .insert()
  //   .into()
  //   .values(ls)
  //   .onConflict(`("number") DO NOTHING`)
  //   .execute();

  return [];
}
