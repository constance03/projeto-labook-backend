import { TPostModel } from "../types"

export interface TGetPostsInputDTO {
    token: string | undefined
}

export type TGetPostsOutputDTO = TPostModel[]

export interface TCreatePostInputDTO {
    token: string | undefined
}

export interface TEditPostInputDTO {
    idToEdit: string,
    token: string | undefined,
    content: unknown
}

export interface TDeletePostInputDTO {
    idToEdit: string,
    token: string | undefined
}
