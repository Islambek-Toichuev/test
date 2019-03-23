import _ from "lodash";
import { User } from "../interfaces/index";

// Notes: I know that this part is hacky and saving sensetive data in localstorage is not secure
// for sure this code should use JSON Web Tokens and Passport.js

const response = {
  emailExist: { text: "This email already exist", res: false },
  noUsersInDb: { text: "No Users in db", res: false },
  emailOrPasswordError: { text: "Incorrect Username or Password", res: false },
  success: { text: "Success", res: true }
};

export default class AuthorizationService {
  constructor() {}

  store = window.localStorage;
  registeredUsers = JSON.parse(this.store.getItem("users") || "{}");
  noUsersInDB = this.registeredUsers.length === 0;
  findUserbyEmail = (user: User) => {
    return this.registeredUsers.find(
      (item: User) =>
        item.email === user.email && item.password === user.password
    );
  };

  registerNewUser = (user: User) => {
    let userIsRegistered = this.noUsersInDB
      ? false
      : !!this.findUserbyEmail(user);
    if (userIsRegistered) return response.emailExist;
    if (!this.noUsersInDB) {
      this.store.setItem(
        "users",
        JSON.stringify([...this.registeredUsers, user])
      );
      return response.success;
    }
    this.store.setItem("users", JSON.stringify([user]));
    return response.success;
  };

  logIn = (user: User) => {
    if (this.noUsersInDB) return response.noUsersInDb;
    let userIsRegistered = this.registeredUsers.find(
      (usr: User) => usr.email === user.email && usr.password === user.password
    );
    if (!!userIsRegistered) return response.success;
    return response.emailOrPasswordError;
  };
}
