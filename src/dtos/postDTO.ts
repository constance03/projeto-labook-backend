import { TPostModel } from "../types"

export interface TGetPostsInputDTO {
    token: string | undefined
}

export type TGetPostsOutputDTO = TPostModel[]

export interface TCreatePostInputDTO {
    token: string | undefined,
    content: unknown
}

export interface TEditPostInputDTO {
    idToEdit: string,
    token: string | undefined,
    content: unknown
}

export interface TDeletePostInputDTO {
    idToDelete: string,
    token: string | undefined
}
