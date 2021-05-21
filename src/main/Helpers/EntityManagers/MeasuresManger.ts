import { Connection, getRepository } from "typeorm";
import { KU } from "../../../entities/KU";
import { MeasureTaken } from "../../../entities/MeasureTaken";

export async function assignMeasures(
  ku: KU,
  depravation: boolean,
  imprisoning: boolean,
  forfeiture: boolean,
  connection: Connection
) {
  let measure = await getRepository(MeasureTaken)
    .createQueryBuilder("measuretaken")
    .where(
      "measuretaken.depravation = :depravation AND measuretaken.imprisoning = :imprisoning AND measuretaken.forfeiture = :forfeiture ",
      {
        depravation: depravation,
        imprisoning: imprisoning,
        forfeiture: forfeiture,
      }
    )
    .getOne();

  if (!measure) {
    measure = MeasureTaken.create({
      depravation: depravation,
      imprisoning: imprisoning,
      forfeiture: forfeiture,
    });
  }
  if (measure.ku) {
    measure.ku.push(ku);
  } else measure.ku = [ku];
  measure = await connection.manager.save(measure);
  return measure;
}
