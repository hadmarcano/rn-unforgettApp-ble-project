// Authenticate
export const authenticate = (data) => {
  // Set the Token with async-storage here...
  //  if (typeof window !== "undefined") {
  //    localStorage.setItem("jwt", JSON.stringify(data));
  //    next();
  //  }
};

export const isAuthenticate = () => {
  // Verify if exist an Token at async-storage here...
  // if (typeof window == "undefined") {
  //     return false;
  // }
  // if (localStorage.getItem("jwt")) {
  //     return JSON.parse(localStorage.getItem("jwt"));
  // } else {
  //     return false;
  // }
};
