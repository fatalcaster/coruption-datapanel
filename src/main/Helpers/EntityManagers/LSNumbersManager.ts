import { Connection } from "typeorm";
import { KU } from "../../../entities/KU";
import { LSNumber } from "../../../entities/LSNumber";
import { Reported } from "../../../entities/Reported";
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

    let temp = await connection
        .getRepository(LSNumber)
        .createQueryBuilder("LSNumber")
        .where("LSNumber.number IN (:numbers)", { numbers: ls_numbers })
        .getMany();

    return temp;
}

// await connection.createQueryBuilder()
//         .insert()
//         .into(Post)
//         .values(post2)
//         .onConflict(`("id") DO UPDATE SET "title" = :title`)
//         .setParameter("title", post2.title)
//         .execute();
