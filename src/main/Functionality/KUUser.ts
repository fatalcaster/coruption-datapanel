export default class KUUser {
    public static AddFormVisibility: boolean;

    constructor() {
        KUUser.AddFormVisibility = false;
    }

    public static navParams = [
        () => {
            console.log("visB" + KUUser.AddFormVisibility);
            KUUser.AddFormVisibility = true;
            console.log("bisA" + KUUser.AddFormVisibility);
        },
        () => {},
        () => {},
        () => {},
        () => {},
        () => {},
        () => {},
        () => {},
    ];
}
