import { Connection, getConnection } from "typeorm";
import { DamagedLegalEntity } from "../../../entities/DamagedLegalEntity";
import { Reported } from "../../../entities/Reported";
import { addProperty, getListDifference, getProperty } from "../Utils";

export async function assignLEDamaged(
    dle: DamagedLegalEntity[] | undefined,
    connection: Connection
): Promise<DamagedLegalEntity[]> {
    if (!dle || dle.length == 0) {
        return [];
    }
    await connection
        .createQueryBuilder()
        .insert()
        .into(DamagedLegalEntity)
        .values(dle)
        .onConflict(`("id") DO NOTHING`)
        .execute();

    let dle_numbers = getProperty(dle, "id");

    let temp = await connection
        .getRepository(DamagedLegalEntity)
        .createQueryBuilder("DamagedLegalEntity")
        .where("DamagedLegalEntity.id IN (:ids)", { ids: dle_numbers })
        .getMany();

    return temp;
}
