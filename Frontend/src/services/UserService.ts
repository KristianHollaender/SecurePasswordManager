import axios from "axios";
import {SignUpDTO} from "../models/dtos/SignUpDTO.ts";
import {SignInDTO} from "../models/dtos/SignInDTO.ts";

export class UserService {
    api = axios.create({
        baseURL: `http://localhost:9092/`,
    });

    signup = async (dto: SignUpDTO) => {
        try {
            const response = await this.api.post("api/user/sign-up", dto);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    login = async (dto: SignInDTO) => {
        try {
            const response = await this.api.post("login", dto);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getCurrentUserInfo = async (token: string) => {
        try {
            const response = await this.api.get("api/user/me", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
