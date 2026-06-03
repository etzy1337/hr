import axios from "axios";
import type { LoggedUserDto, LoginDto, RegisterDto } from "../Models/User";
import api from "./api";

export const register = async(dto: RegisterDto):Promise<LoggedUserDto>=>{
    const res = await api.post("/account/register",dto);
    return res.data;
}

export const login = async (dto: LoginDto): Promise<LoggedUserDto> => {
  const res = await api.post<LoggedUserDto>("/account/login", dto);
  return res.data;
};


export const logout = async (): Promise<void> => {
  await api.post("/account/logout");
};

export const authMe=async():Promise<LoggedUserDto>=>{
    const res = await api.get<LoggedUserDto>("/account/authme")
    return res.data;
}