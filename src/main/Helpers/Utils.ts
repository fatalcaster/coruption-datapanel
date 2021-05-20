import { Crime } from "../../entities/Crime";
import { Reported } from "../../entities/Reported";

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
