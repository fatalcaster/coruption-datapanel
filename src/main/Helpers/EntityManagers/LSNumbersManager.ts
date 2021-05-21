import { Connection } from "typeorm";
import { KU } from "../../../entities/KU";
import { LSNumber } from "../../../entities/LSNumber";
import { addProperty } from "../Utils";

export async function assignLSNumbers(
  ls_numbers: string[] | undefined,
  ku: KU,
  connection: Connection
): Promise<LSNumber[]> {
  if (!ls_numbers || ls_numbers.length == 0) {
    return [];
  }
  console.log(JSON.stringify(ls_numbers));
  const ls: LSNumber[] = [];

  for (let i = 0; i < ls_numbers.length; i++) {
    ls.push({ number: ls_numbers[i], ku: ku });
  }

  await connection
    .createQueryBuilder()
    .insert()
    .into(LSNumber)
    .values(ls)
    .onConflict(`("number") DO NOTHING`)
    .execute();

  return [];
}
