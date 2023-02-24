export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TTokenPayload {
    id: string,
	name: string,
    role: USER_ROLES
}

export interface TPostModel {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export interface TPostDB { 
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export interface TPostWithCreatorDB extends TPostDB {
    creator_name: string
}

export interface TUserDB { 
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES, 
    created_at: string
}

export interface TUserModel { 
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES, 
    createdAt: string
}