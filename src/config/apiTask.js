import { URL } from "./index";

//Get all Tasks
export const getAllTasks = (token) => {
  return fetch(`${URL}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(values),
  })
    .then((response) => {
      const result = response.json();
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

//Create new Task
export const createTask = (token, values) => {
  return fetch(`${URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

//Update Task
export const updateTask = (token, taskId, values) => {
  return fetch(`${URL}/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

//Delete Task
export const deleteTask = (token, taskId) => {
  return fetch(`${URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(values),
  })
    .then((response) => {
      const result = response.json();
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};
