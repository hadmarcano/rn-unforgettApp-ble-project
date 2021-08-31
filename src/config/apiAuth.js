import { URL } from "./index";

//Signin
export const userSignin = (values) => {
  return fetch(`${URL}/users/login`, {
    method: "POST",
    body: JSON.stringify(values),
  })
    .then((response) => {
      const result = response.json();
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

//Signup
export const userSignup = (values) => {
  return fetch(`${URL}/users`, {
    method: "POST",
    body: JSON.stringify(values),
  })
    .then((response) => {
      const result = response.json();
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

//Signout
export const userSignout = (values) => {
  return fetch(`${URL}/users/logout`, {
    method: "POST",
    // body: JSON.stringify(values)
  })
    .then((response) => {
      const result = response.json();
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};
