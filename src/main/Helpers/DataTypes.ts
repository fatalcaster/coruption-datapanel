export interface KUData {
    values: {
        ku_number: string;
        ku_file: string;
        case_number: string;
        input_date: string;
        depravation: boolean;
        imprisoning: boolean;
        forfeiture: boolean;
        ku_delivering_date: string;
        ska_date: string;
        po_connection: string;
        materialDamage: string;
        euros: boolean;
        ku_note: string;
        clerk: string;
    };
    criminalActs: string[] | undefined;
    reportedPeople: ReportedTableElements[] | undefined;
    LSNumbers: string[] | undefined;
    takenItems: TakenItem[] | undefined;
    damagedIndividuals: DamagedIndividual[] | undefined;
    damagedLegalEntities: DamagedLegalEntity[] | undefined;
}

export interface KUSearchParams {
    input_date: string;
    delivery_vjt: string;
    delivery_ska: string;
    ku_number: string;
    note: string;
    case_number: string;
}

export interface KUFilterParams {
    before: string;
    after: string;
    vjt_delivered: boolean;
    ska_delivered: boolean;
    crimes_number: number | undefined;
    crime: string;
    clerk: string;
}
