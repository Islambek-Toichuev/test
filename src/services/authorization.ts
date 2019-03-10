import _ from "lodash";
const store = window.localStorage;
let registeredUsers = JSON.parse(store.getItem('users') || '{}');
let currentUser = store.getItem('currentUser') || '';

// Notes: I know that this part is hacky and saving sensetive data in localstorage is not secure
// for sure this code should use JSON Web Tokens and Passport.js
export default class AuthorizationService {
  constructor() { }

  registerNewUser = (user: any) => {
    let userIsRegistered = _.isEmpty(registeredUsers) ? false : registeredUsers.find((usr: any) => usr.email === user.email && usr.password === user.password);
    if (!!userIsRegistered) return new Error('This email already exist');
    if (!_.isEmpty(registeredUsers)) return store.setItem('users', JSON.stringify([...registeredUsers, user]));
    store.setItem('currentUser', user.email)
    return store.setItem('users', JSON.stringify([user]));
  }

  logIn = (user: any) => {
    if (_.isEmpty(registeredUsers)) return Error('No Users in db');
    let userIsRegistered = registeredUsers.find((usr: any) => usr.email === user.email && usr.password === user.password);
    if (!!userIsRegistered) {
      store.setItem('currentUser', JSON.stringify(userIsRegistered));
      return true;
    }
    return new Error('Incorrect Username or Password');
  }

  logOut = () => store.setItem('currentUser', '');

  getCurrentUser = () => currentUser;
}