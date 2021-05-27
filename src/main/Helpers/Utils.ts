import { Connection } from "typeorm";
import { Crime } from "../../entities/Crime";
import { KU } from "../../entities/KU";
import { Reported } from "../../entities/Reported";
import { Worker } from "../../entities/Worker";

export interface KUDisplayData {
    ku_number?: string;
    input_date?: string;
    delivered_vjt?: boolean;
    reported?: string[];
    crimes?: string[];
    clerk?: string;
    delivered_ska?: boolean;
}

export function propertyToString(obj: any[], wantedProps: string[]): string[] {
    let new_list: string[] = [];
    try {
        for (let i = 0; i < obj.length; i++) {
            let temp = "";
            for (let j = 0; j < wantedProps.length; j++) {
                if (j < wantedProps.length - 1)
                    temp += obj[i][wantedProps[j]] + " ";
                else temp += obj[i][wantedProps[j]];
            }
            new_list.push(temp);
        }
    } catch {
        throw "Given properites don't exist";
    }
    return new_list;
}

export function getProperDate(input?: string | undefined): string {
    if (!input) {
        return new Date().toLocaleDateString();
    } else return new Date(input).toLocaleDateString();
}

export function getProperWorkerName(
    input: string
): { name: string; surname: string } | undefined {
    if (input.length == 0 || input.length > 60) {
        return undefined;
    }
    const p = input.split(" ");
    return {
        name: p[0],
        surname: p[1],
    };
}

export function addProperty<ListType, DataType>(
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

export function getListDifference(
    list1: any[],
    list2: any[],
    propertyToCompare: string,
    listToReturn: 1 | 2 = 1
) {
    if (listToReturn == 1) {
        let difference = list1.filter(
            (i) =>
                !list2.some(
                    (k) => k[propertyToCompare] === i[propertyToCompare]
                )
        );
        return difference;
    } else
        return list2.filter(
            (i) =>
                !list1.some(
                    (k) => k[propertyToCompare] === i[propertyToCompare]
                )
        );
}

export function getProperty(list: any[], property: string): any[] {
    let new_list = list.map((o) => o[property]);
    console.log(new_list);
    return new_list;
}

export function removeProperty(list: any[], property: string) {
    list.forEach(function (v) {
        delete v[property];
    });
    return list;
}
