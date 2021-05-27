import { Connection } from "typeorm";
import { KU } from "../../../entities/KU";
import { TakenItem } from "../../../entities/TakenItem";
import { getProperty } from "../Utils";

export async function assignTakenItems(
    taken_items: InterfaceHelpers.TakenItem[] | undefined,
    ku: KU,
    connection: Connection
): Promise<TakenItem[]> {
    if (!taken_items || taken_items.length == 0) {
        return [];
    }
    let ti: TakenItem[] = [];

    for (let i = 0; i < taken_items.length; i++) {
        const p = new TakenItem();
        (p.id = taken_items[i].id),
            (p.delivered_to = taken_items[i].id),
            (p.ku = ku),
            ti.push(p);
    }

    await connection
        .createQueryBuilder()
        .insert()
        .into(TakenItem)
        .values(ti)
        .onConflict(`("id") DO NOTHING`)
        .execute();

    let ti_ids = getProperty(ti, "id");

    let temp = await connection
        .getRepository(TakenItem)
        .createQueryBuilder("takenitem")
        .where("takenitem.id IN (:ids)", { ids: ti_ids })
        .getMany();

    return temp;
}
