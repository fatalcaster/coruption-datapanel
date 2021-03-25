import argon2 from "argon2";
// import { User } from "../../entities/User";
// import DB from "./../../DBInitizaliation";

interface Error {
    field: string;
    message: string;
}

interface ServerResponse {
    auth: boolean;
    error?: Error;
    response: string;
}
function checkPassword(password: string): ServerResponse | null {
    if (!password || password === "")
        return {
            auth: false,
            error: {
                field: "password",
                message: "Ово поље не сме остати празно!",
            },
            response: "401",
        };

    const passCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
        password
    );

    if (!passCheck)
        return {
            auth: false,
            error: {
                field: "password",
                message: "Унета лозинка није тачна!",
            },
            response: "401",
        };
    return null;
}
function checkUsername(username: string): ServerResponse | null {
    if (!username || username === "")
        return {
            auth: false,
            error: {
                field: "username",
                message: "Ово поље не сме остати празно!",
            },
            response: "401",
        };
    const userCheck = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){3,15}[a-zA-Z0-9]$/.test(
        username
    );
    if (!userCheck)
        return {
            auth: false,
            error: {
                field: "username",
                message: "Неисправан унос!",
            },
            response: "401",
        };
    return null;
}

export async function LogUserIn(
    username: string,
    password: string
): Promise<ServerResponse> {
    // const validUsername = checkUsername(username);
    // if (validUsername !== null) return validUsername;

    // if (!DB.em) await DB.initialize();
    // console.log(typeof DB.em);
    // const user = await DB.em.findOne(User, { username: username });
    // if (!user)
    //     return {
    //         auth: false,
    //         error: {
    //             field: "username",
    //             message: "Корисник није пронађен!",
    //         },
    //         response: "404",
    //     };

    // const validPassword = checkPassword(password);
    // if (validPassword !== null) return validPassword;

    // if (!(await argon2.verify(user.password, password))) {
    //     return {
    //         auth: false,
    //         error: {
    //             field: "password",
    //             message: "Унета лозинка није тачна!",
    //         },
    //         response: "401",
    //     };
    // }
    return {
        auth: true,
        response: "200",
    };
}
