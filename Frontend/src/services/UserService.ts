import axios from "axios";
import {SignUpDTO} from "../models/dtos/SignUpDTO.ts";

export class UserService {
    api = axios.create({
        baseURL: `http://localhost:9092/`,
    });

    register = async (dto: SignUpDTO) => {
        try {
            const response = await this.api.post("register", dto);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    login = async (dto: SignUpDTO) => {
        try {
            const response = await this.api.post("login", dto);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
