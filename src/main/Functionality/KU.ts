import { BrowserWindow } from "electron";
import { getConnection, getRepository, Like } from "typeorm";
import { Worker } from "../../entities/Worker";
import { KUData, KUFilterParams, KUSearchParams } from "../Helpers/DataTypes";
import { assignLSNumbers } from "../Helpers/EntityManagers/LSNumbersManager";
import {
  getProperty,
  KUDisplayData,
  propertyToString,
  removeProperty,
} from "../Helpers/Utils";
import { assignKUBasicProperties } from "../Helpers/EntityManagers/KUManager";
import { assignMeasures } from "../Helpers/EntityManagers/MeasuresManger";
import {
  assignCrimes,
  getCrimes,
} from "../Helpers/EntityManagers/CrimeManager";
import { assignReported } from "../Helpers/EntityManagers/reportedManager";
import { assignLEDamaged } from "../Helpers/EntityManagers/LEDamagedManager";
import { assignIDamaged } from "../Helpers/EntityManagers/IDamagedManager";
import { assignTakenItems } from "../Helpers/EntityManagers/TakenItemsManager";
import { KU } from "../../entities/KU";

export async function saveKU(data: KUData, win: BrowserWindow) {
  try {
    console.log("PODACI " + data);
    const connection = getConnection();
    let ku = await connection
      .getRepository(KU)
      .createQueryBuilder("ku")
      .where("ku.number = :number", { number: data.values.ku_number })
      .getOne();

    ku = await assignKUBasicProperties(data.values, connection);
    if (!ku) {
      console.log("SENDING AN ERROR THAT INPUT IS INVALID");
      return;
    }
    let ls_numbers = await assignLSNumbers(data.LSNumbers, ku, connection);

    ku.ls_numbers = ls_numbers;

    ku.measure = await assignMeasures(
      ku,
      data.values.depravation,
      data.values.imprisoning,
      data.values.forfeiture,
      connection
    );
    ku.crimes = await assignCrimes(data.criminalActs, connection);

    ku.reported = await assignReported(data.reportedPeople, connection);

    ku.DamagedLegalEntities = await assignLEDamaged(
      data.damagedLegalEntities,
      connection
    );

    ku.DamagedIndividual = await assignIDamaged(
      data.damagedIndividuals,
      connection
    );

    ku.taken_items = await assignTakenItems(data.takenItems, ku, connection);
    console.log("TAKEN ITEMS:\n" + ku.taken_items);
    await connection.manager.save(ku);

    win.webContents.send("update-ku-display", await getKUDisplayData(0, 10));

    // const display = await connection
    //     .getRepository(KU)
    //     .createQueryBuilder("ku")
    //     .leftJoinAndSelect("ku.clerk", "worker")
    //     .leftJoinAndSelect("ku.ls_numbers", "lsnumber")
    //     .leftJoinAndSelect("ku.measure", "MeasureTaken")
    //     .leftJoinAndSelect("ku.crimes", "Crime")
    //     .leftJoinAndSelect("ku.reported", "reported")
    //     .leftJoinAndSelect(
    //         "ku.DamagedLegalEntities",
    //         "DamagedLegalEntities"
    //     )
    //     .leftJoinAndSelect("ku.taken_items", "TakenItems")
    //     .getMany();
    // console.log("Proso sve: \n" + JSON.stringify(display));
  } catch (err) {
    console.log("Save KU error\n" + err);
  }
}

// Gives elements that are avaialable in the specified and not in the other list

export async function getKUDisplayData(
  _start: number,
  _end: number,
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
        (one.delivery_date == new Date(params.delivery_vjt).toDateString() ||
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
      (new Date(one.input_date) < new Date(params.before) || !params.before) &&
      (new Date(one.input_date) > new Date(params.after) || !params.after) &&
      Boolean(one.ska_date) == params.ska_delivered &&
      Boolean(one.delivery_date) == params.vjt_delivered &&
      (!params.crimes_number || one.crimes.length == params.crimes_number) &&
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
