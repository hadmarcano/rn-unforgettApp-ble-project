import { URL } from "./index";

//Signin

export const userSignin = (values) => {
    return fetch(`${URL}/users/login`, {
        method="POST",
        body: JSON.stringify(values)
    }).then((response) => {
        const result = response.json();
        return result;
    }).catch((err) => {
        console.log(err);
    })
};

