const store = window.localStorage;

export default class AdminService {
    constructor() {}
    getAllUsers = () => store.getItem('users')
}
