export const notEmpty = (value: string): string | undefined => {
    let error;

    if (value.length === 0) error = "Empty field";
    if (/\d/.test(value)) "Number inside the field";
    return error;
};
export const validID = (value: string): string | undefined => {
    let error;
    if (value.length !== 13) error = "Empty field";

    if (!/^[0-9]*$/.test(value)) "NaN inside the field";
    return error;
};

export const validLegalID = (value: string): string | undefined => {
    let error;
    if (value.length !== 8) error = "Empty field";

    if (!/^[0-9]*$/.test(value)) "NaN inside the field";
    return error;
};
