import { TUserDB, TUserModel, USER_ROLES } from "../types";

export class User {
    constructor (
        private id: string,
        private name: string, 
        private email: string, 
        private password: string,
        private role: USER_ROLES,
        private createdAt: string
    ) {}

    public getCreatedAt(): string {
        return this.createdAt;
    }
    public setCreatedAt(value: string) {
        this.createdAt = value;
    }
    public getRole(): USER_ROLES {
        return this.role;
    }
    public setRole(value: USER_ROLES) {
        this.role = value;
    }
    public getPassword(): string {
        return this.password;
    }
    public setPassword(value: string) {
        this.password = value;
    }
    public getEmail(): string {
        return this.email;
    }
    public setEmail(value: string) {
        this.email = value;
    }
    public getName(): string {
        return this.name;
    }
    public setName(value: string) {
        this.name = value;
    }
    public getId(): string {
        return this.id;
    }
    public setId(value: string) {
        this.id = value;
    } 

    public toDBModel() : TUserDB {
        return { 
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.createdAt
        }
    }

    public toBusinessModel(): TUserModel {
        return { 
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            createdAt: this.createdAt
        }
    }
}
