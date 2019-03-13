const store = window.localStorage;

export default class AdminService {
    constructor() {}
    getAllUsers = () => JSON.parse(store.getItem('users') || '{}')
}
