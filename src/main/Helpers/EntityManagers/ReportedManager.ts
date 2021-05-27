import { Connection, getConnection } from "typeorm";
import { Reported } from "../../../entities/Reported";
import { addProperty, getListDifference, getProperty } from "../Utils";

export async function assignReported(
    reported: Reported[] | undefined,
    connection: Connection
): Promise<Reported[]> {
    if (!reported || reported.length == 0) {
        return [];
    }
    await connection
        .createQueryBuilder()
        .insert()
        .into(Reported)
        .values(reported)
        .onConflict(`("id") DO NOTHING`)
        .execute();

    let reported_numbers = getProperty(reported, "id");

    let temp = await connection
        .getRepository(Reported)
        .createQueryBuilder("reported")
        .where("reported.id IN (:ids)", { ids: reported_numbers })
        .getMany();

    return temp;
}
