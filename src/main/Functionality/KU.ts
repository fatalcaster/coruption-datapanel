import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { BrowserWindow, ipcMain } from "electron";
import { connect } from "formik";
import { worker } from "node:cluster";
import { table } from "node:console";
import {
    Connection,
    createConnection,
    EntityTarget,
    getConnection,
    getConnectionManager,
    getRepository,
    Like,
} from "typeorm";
import { ConnectionNumber } from "../../entities/ConnectionNumber";
import { Crime } from "../../entities/Crime";
import { DamagedIndividual } from "../../entities/DamagedIndividual";
import { DamagedLegalEntity } from "../../entities/DamagedLegalEntity";
import { KU } from "../../entities/KU";
import { LSNumber } from "../../entities/LSNumber";
import { MeasureTaken } from "../../entities/MeasureTaken";
import { Reported } from "../../entities/Reported";
import { TakenItem } from "../../entities/TakenItem";
import { Worker } from "../../entities/Worker";
import { KUData, KUFilterParams, KUSearchParams } from "../Helpers/DataTypes";
import { KUDisplayData, propertyToString } from "../Helpers/Utils";

export async function saveKU(data: KUData, win: BrowserWindow) {
    try {
        const connection = getConnection();

        // let p = await connection
        //     .createQueryBuilder()
        //     .select("damagedindividual")
        //     .from(DamagedIndividual, "damagedindividual")
        //     .getMany();
        // console.log("IZLAZ: \n" + JSON.stringify(p));
        // return;
        let ku = await connection
            .createQueryBuilder()
            .select("ku")
            .from(KU, "ku")
            .where("ku.number = :ku_number", {
                ku_number: data.values.ku_number,
            })
            .getOne();

        if (!ku) {
            ku = KU.create({
                number: data.values.ku_number,
                case_number: data.values.case_number,
                input_date: data.values.input_date
                    ? new Date(data.values.input_date).toDateString()
                    : new Date().toDateString(),
                edit_date: new Date().toString(),
                materialDamage: data.values.materialDamage,
                note: data.values.ku_note,
                file: data.values.ku_file,
                euros: data.values.euros,
            });
        }
        if (data.values.ku_delivering_date)
            ku.delivery_date = new Date(
                data.values.ku_delivering_date
            ).toDateString();

        if (data.values.ska_date)
            ku.ska_date = new Date(data.values.ska_date).toDateString();

        ku.DamagedIndividual = await addKUProperty<DamagedIndividual>(
            DamagedIndividual,
            ku,
            data.damagedIndividuals,
            "id"
        );
        console.log("DMG INDIVIDUAL\n" + ku.DamagedIndividual);
        ku = await connection.manager.save(ku);
        return;
        // removeManyManyRelation<Crime>(
        //     Crime,
        //     "ku",
        //     ku,
        //     data.criminalActs,
        //     "name"
        // );
        // ku.crimes = data.criminalActs
        //     ? await addProperty<string, KU>(
        //           getListDifference(
        //               await connection
        //                   .createQueryBuilder()
        //                   .select("crime")
        //                   .from(Crime, "crime")
        //                   .where("crime.ku.number = :ku_number", {
        //                       ku_number: data.values.ku_number,
        //                   })
        //                   .getMany(),
        //               data.criminalActs,
        //               "name",
        //               2
        //           ),
        //           ku,
        //           "ku"
        //       )
        //     : [];
        // removeManyManyRelation<DamagedLegalEntity>(
        //     DamagedLegalEntity,
        //     "ku",
        //     ku,
        //     data.damagedLegalEntities,
        //     "id"
        // );
        // ku.DamagedLegalEntities = data.damagedLegalEntities
        //     ? await addProperty<typeof data.damagedLegalEntities[0], KU>(
        //           data.damagedLegalEntities,
        //           ku,
        //           "ku"
        //       )
        //     : [];

        // removeManyManyRelation<Reported>(
        //     Reported,
        //     "ku",
        //     ku,
        //     data.damagedLegalEntities,
        //     "id"
        // );
        // ku.reported = data.reportedPeople
        //     ? await addProperty<ReportedTableElements, KU>(
        //           data.reportedPeople,
        //           ku,
        //           "ku"
        //       )
        //     : [];
        // if (data.takenItems) {
        //     ku.taken_items = await setOneMany<TakenItem>(
        //         ku,
        //         await addProperty<typeof data.takenItems[0], KU>(
        //             data.takenItems,
        //             ku,
        //             "ku"
        //         ),
        //         TakenItem
        //     );
        // }
        // console.log("DOVDE");
        // let measure = await setMeasures(
        //     ku,
        //     data.values.depravation,
        //     data.values.imprisoning,
        //     data.values.forfeiture
        // );

        // measure = await connection.manager.save(measure);

        // //ku.measure = measure;

        // if (data.LSNumbers) {
        //     ku.ls_numbers =
        //         (await setOneMany<LSNumber>(
        //             ku,
        //             await addProperty<typeof data.LSNumbers[0], KU>(
        //                 data.LSNumbers,
        //                 ku,
        //                 "ku"
        //             ),
        //             LSNumber
        //         )) || [];
        // }

        // // getting the worker
        // const worker_name = data.values.clerk.split(" ")[0];
        // const worker_surname = data.values.clerk.split(" ")[1];

        // const t: Worker | undefined = await getRepository(Worker)
        //     .createQueryBuilder("worker")
        //     .where("worker.name = :name AND worker.surname = :surname", {
        //         name: worker_name,
        //         surname: worker_surname,
        //     })
        //     .getOne();
        // if (!t) {
        //     console.log("NOVI PRAVIM DA OPRAVIM");
        //     const worker = Worker.create({
        //         name: worker_name,
        //         surname: worker_surname,
        //     });
        //     console.log("RADNIK \n" + JSON.stringify(worker));
        //     await connection.manager.save(worker);
        //     let p = await getRepository(Worker)
        //         .createQueryBuilder("worker")
        //         .where("worker.name = :name AND worker.surname = :surname", {
        //             name: worker_name,
        //             surname: worker_surname,
        //         })
        //         .getOne()!;
        //     ku.clerk = p!;
        // } else {
        //     console.log("STARI RECIKLIRAM");
        //     let p = t.ku ? t.ku : [];
        //     p.push(ku);
        //     t.ku = p;
        //     ku.clerk = t;
        //     connection.manager.save(t);
        // }
        // ku = await connection.manager.save(ku);

        // // Update Renderer data
        // win.webContents.send(
        //     "update-ku-display",
        //     await getKUDisplayData(0, 10)
        // );

        // {
        //     const connection_num = data.values.po_connection;
        //     if (!connection_num) return;
        //     const t: ConnectionNumber | undefined = await getRepository(
        //         ConnectionNumber
        //     )
        //         .createQueryBuilder("connectionnumber")
        //         .where("connectionnumber.id = :id", {
        //             id: connection_num,
        //         })
        //         .getOne();
        //     if (!t) {
        //         const con = Worker.create({
        //             id: connection_num,
        //             ku: [ku],
        //         });
        //         connection.manager.save(con);
        //     } else {
        //         let p = t.ku ? t.ku : [];
        //         p.push(ku);
        //         t.ku = p;
        //         connection.manager.save(t);
        //     }
        // }
    } catch (err) {
        console.log("Save KU error\n" + err);
    }
}

async function addKUProperty<T>(
    entityClass: EntityTarget<T>,
    ku: KU,
    newData: any[] | undefined,
    deletionPropertyComparer: string
) {
    if (!newData) return [];
    const table_name = entityClass.toString().split(" ")[1].toLowerCase();
    const connection = getConnection();
    const new_data = addProperty<T, KU>(
        getListDifference(
            await connection
                .getRepository(entityClass)
                .createQueryBuilder(table_name)
                .leftJoinAndSelect("damagedindividual.ku", `ku`)
                .where(`ku.number = :input`, {
                    input: ku.number,
                })
                .getMany(),
            newData,
            deletionPropertyComparer,
            2
        ),
        ku,
        "ku"
    );
    return new_data;
    // removeManyManyRelation<T>(
    //     entityClass,
    //     KU,
    //     ku,
    //     newData,
    //     deletionPropertyComparer
    // );

    /*if (!newData)*/ return [];

    // const table_name = entityClass.toString().toLowerCase();
    // const dataToBeAdded = addProperty<T, KU>(
    //     getListDifference(
    //         await connection
    //             .getRepository(entityClass)
    //             .createQueryBuilder(table_name)
    //             .where(`${table_name}.ku = :input`, {
    //                 input: ku,
    //             })
    //             .getMany(),
    //         newData,
    //         deletionPropertyComparer,
    //         2
    //     ),
    //     ku,
    //     "ku"
    // );
    // return dataToBeAdded;
}

async function removeManyManyRelation<T>(
    entityClass: EntityTarget<T>,
    property_name: string,
    property_value: any,
    joinName: "string",

    newData: any[] | undefined,
    deletionPropertyComparer: string
) {
    const table_name = entityClass.toString().split(" ")[1].toLowerCase();
    const connection = getConnection();

    console.log("tablename: \n" + table_name);

    const old_data = await connection
        .getRepository(entityClass)
        .createQueryBuilder(table_name)
        .leftJoinAndSelect("damagedindividual.ku", `ku`)
        .where(`ku.number = :input`, {
            input: property_value.number,
        })
        .getMany();
    console.log("REMOVE: " + JSON.stringify(old_data));
    if (!newData) {
        connection.manager.softRemove(old_data);
        return;
    }
    const toBeRemoved = getListDifference(
        old_data,
        newData,
        deletionPropertyComparer,
        1
    );
    console.log("TO BE REMOVED: \n" + toBeRemoved);
    connection.manager.softRemove(toBeRemoved);
}

async function setMeasures(
    ku: KU,
    depravation: boolean,
    imprisoning: boolean,
    forfeiture: boolean
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

    console.log("MEASURE GOTTEN\n" + measure);

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

    return measure;
}

async function setOneMany<T>(ku: KU, data: T[], entityClass: EntityTarget<T>) {
    {
        let name = entityClass.toString().toLowerCase();
        let items = getRepository(entityClass)
            .createQueryBuilder(name)
            .where(`${name}.ku = :ku_number`, {
                ku_number: ku.number,
            });
        if (!data && items) {
            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(entityClass)
                .where("ku = :ku", { ku: ku.number })
                .execute();
            return [];
        }
    }

    return data;
} // add removal of unnecessary data

async function addProperty<ListType, DataType>(
    list: ListType[],
    data: DataType,
    property: string
) {
    let new_list: any = list;

    for (let i = 0; i < list.length; i++) {
        if (list[i] !== Object(list[i])) {
            let temp = {
                name: list[i],
                property: data,
            };
            new_list[i] = temp;
        } else new_list[i][property] = data;
    }
    return new_list;
}

// Gives elements that are avaialable in the specified and not in the other list
function getListDifference(
    list1: any[],
    list2: any[],
    propertyToComapre: string,
    listToReturn: 1 | 2 = 1
) {
    if (listToReturn == 1) {
        let difference = list1.filter(
            (i) =>
                !list2.some(
                    (k) => k[propertyToComapre] === i[propertyToComapre]
                )
        );
        return difference;
    } else
        return list2.filter(
            (i) =>
                !list1.some(
                    (k) => k[propertyToComapre] === i[propertyToComapre]
                )
        );
}

export async function getKUDisplayData(
    start: number,
    end: number,
    ku_wanted?: string[]
) {
    const connection = getConnection();
    let KUDisplay;
    if (ku_wanted) {
        KUDisplay = await connection
            .getRepository(KU)
            .createQueryBuilder("ku")
            .leftJoinAndSelect("ku.clerk", "worker")
            .leftJoinAndSelect("ku.reported", "reported")
            .leftJoinAndSelect("ku.crimes", "crime")
            .andWhere("ku.number IN (:values)", { values: ku_wanted })
            .getMany();
    } else {
        KUDisplay = await connection
            .getRepository(KU)
            .createQueryBuilder("ku")
            .leftJoinAndSelect("ku.clerk", "worker")
            .leftJoinAndSelect("ku.reported", "reported")
            .leftJoinAndSelect("ku.crimes", "crime")
            .getMany();
    }

    // console.log(KUDisplay[0]);
    console.log("PETLJICA");
    let temp: KUDisplayData[] = [];
    for (let i = 0; i < KUDisplay.length; i++) {
        let r = KUDisplay[i];
        console.log(`${r.number} ${r.clerk}`);
        let p: KUDisplayData = {
            ku_number: r.number,
            input_date: new Date(r.input_date).toLocaleDateString(),
            delivered_vjt: r.delivery_date ? true : false,
            reported: r.reported
                ? propertyToString(r.reported, ["name", "surname", "id"])
                : [],
            crimes: r.crimes ? propertyToString(r.crimes, ["name"]) : [],
            clerk: `${r.clerk?.name} ${r.clerk?.surname}`,
            delivered_ska: r.ska_date ? true : false,
        };
        temp.push(p);
    }
    return temp;
}

export async function getWorkers() {
    const data = await getConnection().getRepository(Worker).find();
    if (!data) return null;
    let workers: string[] = [];
    for (let i = 0; i < workers.length; i++) {
        workers.push(`${data[i].name} ${data[i].surname}`);
    }
    return workers;
}

export async function getCrimes() {
    const data = await getConnection().getRepository(Crime).find();
    let crimes = getProperty(data, "name");
    if (!crimes) return null;
    return crimes;
}

function getProperty(list: any[], property: string): any[] {
    let new_list = list.map((o) => o[property]);
    console.log(new_list);
    return new_list;
}

export async function getStandardData() {
    const crimes = await getCrimes();
    const workers = await getWorkers();
    return { crimes, workers };
}

export async function searchKU(params: KUSearchParams, win: BrowserWindow) {
    let data: KU[] | undefined = undefined;

    if (!params) return;
    if (params.ku_number) {
        let p = await getRepository(KU)
            .createQueryBuilder("ku")
            .where("ku.number = :ku_number", {
                ku_number: params.ku_number,
            })
            .getOne();
        data = p ? [p] : [];
    } else if (params.case_number) {
        let p = await getRepository(KU)
            .createQueryBuilder("ku")
            .where("ku.case_number = :case_number", {
                case_number: params.case_number,
            })
            .getOne();
        data = p ? [p] : [];
    } else {
        if (params.note) {
            data = await getRepository(KU).find({
                note: Like(`%${params.note}%`),
            });
        } else if (params.delivery_vjt) {
            data = await getRepository(KU).find({
                delivery_date: new Date(params.delivery_vjt).toDateString(),
            });
        } else if (params.delivery_ska) {
            data = await getRepository(KU).find({
                ska_date: new Date(params.delivery_ska).toDateString(),
            });
        } else if (params.input_date) {
            data = await getRepository(KU).find({
                input_date: new Date(params.input_date).toDateString(),
            });
        }
        data = testKUSearchData(data, params);
        const filteredResults = getProperty(data!, "number");
        if (!filteredResults || filteredResults.length == 0) return;
        win.webContents.send(
            "update-ku-display",
            await getKUDisplayData(0, 10, filteredResults)
        );
    }
}

function testKUSearchData(data: KU[] | undefined, params: KUSearchParams) {
    if (!data) return [];
    data = data.filter(function (one) {
        return (
            ((one.number == params.ku_number || !params.ku_number) &&
                (one.delivery_date ==
                    new Date(params.delivery_vjt).toDateString() ||
                    !params.delivery_vjt) &&
                (one.ska_date == new Date(params.delivery_ska).toDateString() ||
                    !params.delivery_ska) &&
                (one.note?.includes(params.note) || !params.note)) ||
            one.case_number == params.case_number ||
            !params.case_number
        );
    });
    return data;
}

export async function filterKU(params: KUFilterParams, win: BrowserWindow) {
    console.log("UDJOH\n", params);
    if (!params) return;
    let data: KU[] | undefined = undefined;
    if (params.crime) {
        data = await getRepository(KU)
            .createQueryBuilder("ku")
            .leftJoinAndSelect("ku.crimes", "crime")
            .where("crime.name = :name", { name: params.crime })
            .leftJoinAndSelect("ku.clerk", "worker")
            .getMany();
    } else if (params.clerk) {
        let temp = params.clerk.split(" ");
        let surname = temp[1];
        let name = temp[0];
        data = await getRepository(KU)
            .createQueryBuilder("ku")
            .leftJoinAndSelect("ku.clerk", "worker")
            .where("worker.name = :name AND worker.surname = :surname", {
                name: name,
                surname: surname,
            })
            .leftJoinAndSelect("ku.crimes", "crime")
            .getMany();
    } else {
        data = await getRepository(KU)
            .createQueryBuilder("ku")
            .leftJoinAndSelect("ku.crimes", "crime")
            .leftJoinAndSelect("ku.clerk", "worker")
            .getMany();
    }
    console.log("NOVI PODACI\n", data);

    data = testKUFilterData(data, params);
    console.log("PODACI NAKON OBRADE", data);
    const filteredResults = getProperty(data!, "number");
    if (!filteredResults || filteredResults.length == 0) return;
    win.webContents.send(
        "update-ku-display",
        await getKUDisplayData(0, 10, filteredResults)
    );
}

function testKUFilterData(data: KU[] | undefined, params: KUFilterParams) {
    if (!data) return [];

    data = data.filter(function (one) {
        return (
            (new Date(one.input_date) < new Date(params.before) ||
                !params.before) &&
            (new Date(one.input_date) > new Date(params.after) ||
                !params.after) &&
            Boolean(one.ska_date) == params.ska_delivered &&
            Boolean(one.delivery_date) == params.vjt_delivered &&
            (!params.crimes_number ||
                one.crimes.length == params.crimes_number) &&
            (!params.clerk ||
                `${one.clerk.name} ${one.clerk.surname}` == params.clerk) &&
            (!params.crime ||
                one.crimes.filter((one) => {
                    return one.name == params.crime;
                }).length > 0)
        );
    });
    return data;
}

export async function getKUEditData(ku_number: string) {
    const connection = getConnection();

    let data = await connection
        .getRepository(KU)
        .createQueryBuilder("ku")
        .where("ku.number = :ku_number", { ku_number: ku_number })
        .leftJoinAndSelect("ku.clerk", "worker")
        .leftJoinAndSelect("ku.reported", "reported")
        .leftJoinAndSelect("ku.crimes", "crime")
        .leftJoinAndSelect("ku.measure", "measuretaken")
        .leftJoinAndSelect("ku.taken_items", "takenitem")
        .leftJoinAndSelect("ku.DamagedLegalEntities", "damagedlegalentity")
        .leftJoinAndSelect("ku.DamagedIndividual", "damagedindividual")
        .leftJoinAndSelect("ku.ls_numbers", "lsnumber")
        .getOne()
        .catch((err) => {
            console.log(err);
        });

    if (!data) return undefined;
    const editableData: KUData = {
        values: {
            ku_number: data.number,
            ku_file: data.file,
            case_number: data.case_number,
            input_date: new Date(data.input_date).toLocaleDateString(),
            depravation: data.measure.depravation,
            imprisoning: data.measure.imprisoning,
            forfeiture: data.measure.forfeiture,
            ku_delivering_date: data.delivery_date
                ? new Date(data.delivery_date).toLocaleDateString()
                : "",
            ska_date: data.ska_date
                ? new Date(data.ska_date).toLocaleDateString()
                : "",
            po_connection: data.po_connection ? data.po_connection.id : "",
            materialDamage: data.materialDamage ? data.materialDamage : "",
            euros: data.euros,
            ku_note: data.note ? data.note : "",
            clerk: `${data.clerk.name} ${data.clerk.surname}`,
        },
        criminalActs: getProperty(data.crimes, "name"),
        reportedPeople: data.reported,
        LSNumbers: getProperty(data.ls_numbers, "number"),
        takenItems: data.taken_items,
        damagedIndividuals: data.DamagedIndividual
            ? removeProperty(data.DamagedIndividual, "ku")
            : [],
        damagedLegalEntities: data.DamagedLegalEntities
            ? removeProperty(data.DamagedLegalEntities, "ku")
            : [],
    };
    console.log("editable\n", editableData);
    return editableData;
}

function removeProperty(list: any[], property: string) {
    list.forEach(function (v) {
        delete v[property];
    });
    return list;
}
