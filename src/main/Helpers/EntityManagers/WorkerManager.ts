import { getConnection } from "typeorm";
import { Worker } from "../../../entities/Worker";

export async function getWorkers(): Promise<string[]> {
  const data = await getConnection().getRepository(Worker).find();
  let p = [];
  console.log("WORKERS DATA\n" + data);
  for (let i = 0; i < data.length; i++) {
    p.push(`${data[i].name} ${data[i].surname}`);
  }
  return p;
}
