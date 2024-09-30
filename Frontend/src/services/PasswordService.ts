import axios from "axios";


export class UserService {
    api = axios.create({
        baseURL: `http://localhost:9092/api/Password`,
    });
}
