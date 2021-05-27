import { Connection, getConnection } from "typeorm";
import { DamagedIndividual } from "../../../entities/DamagedIndividual";
import { DamagedLegalEntity } from "../../../entities/DamagedLegalEntity";
import { getProperty } from "../Utils";

export async function assignIDamaged(
    di: DamagedIndividual[] | undefined,
    connection: Connection
): Promise<DamagedIndividual[]> {
    if (!di || di.length == 0) {
        return [];
    }
    await connection
        .createQueryBuilder()
        .insert()
        .into(DamagedIndividual)
        .values(di)
        .onConflict(`("id") DO NOTHING`)
        .execute();

    let di_numbers = getProperty(di, "id");

    let temp = await connection
        .getRepository(DamagedIndividual)
        .createQueryBuilder("DamagedIndividual")
        .where("DamagedIndividual.id IN (:ids)", { ids: di_numbers })
        .getMany();

    return temp;
}
