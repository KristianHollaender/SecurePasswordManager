import axios from "axios";
import {CreatePasswordDTO} from "../models/dtos/CreatePasswordDTO.ts";


export class PasswordService {
    api = axios.create({
        baseURL: `http://localhost:9092/api/`,
    });

    getPasswordsByUser = async (userId: string, token: string) => {
        try {
            const response = await this.api.get(`password/${userId}`, {
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

    createPassword = async (dto: CreatePasswordDTO, token: string) => {
        try {
            const response = await this.api.post("password", dto, {
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
