const store = window.localStorage;
let users = JSON.parse(store.getItem("users") || "{}");

export default class AdminService {
  constructor() {}

  getAllUsers = () => users;

  deleteUser = (email: string) => {
    users = users.filter((user: any) => user.email !== email);
    return store.setItem("users", JSON.stringify(users));
  };
}
