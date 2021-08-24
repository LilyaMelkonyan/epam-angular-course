import { IProject } from "./project.interface";

export interface IuserInfo {
    id: string | number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword?: string,
    circlesProject?: IProject[]
  }