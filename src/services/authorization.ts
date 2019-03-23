import _ from "lodash";

// Notes: I know that this part is hacky and saving sensetive data in localstorage is not secure
// for sure this code should use JSON Web Tokens and Passport.js
export default class AuthorizationService {
  constructor() {}

  store = window.localStorage;
  registeredUsers = JSON.parse(this.store.getItem("users") || "{}");
  noUsersInDB =  this.registeredUsers.length === 0;

  registerNewUser = (user: any) => {
    let userIsRegistered = this.noUsersInDB
      ? false
      : this.registeredUsers.find(
          (usr: any) =>
            usr.email === user.email && usr.password === user.password
        );
    if (!!userIsRegistered) return new Error("This email already exist");
    if (!_.isEmpty(this.registeredUsers)) return this.store.setItem("users", JSON.stringify([...this.registeredUsers, user]));
    return this.store.setItem("users", JSON.stringify([user]));
  };

  logIn = (user: any) => {
    if (this.noUsersInDB) return { text: "No Users in db", res: false };
    let userIsRegistered = this.registeredUsers.find(
      (usr: any) => usr.email === user.email && usr.password === user.password
    );
    if (!!userIsRegistered) {
      this.store.setItem("currentUser", JSON.stringify(userIsRegistered));
      return { text: "Success", res: true, user: userIsRegistered};
    }
    return { text: "Incorrect Username or Password", res: false };
  };

  getCurrentSession = () => {};
}
