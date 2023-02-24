import { Request, Response } from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { TCreatePostInputDTO, TDeletePostInputDTO, TEditPostInputDTO, TGetPostsInputDTO } from '../dtos/postDTO'
import { BaseError } from '../errors/BaseError'

export class PostController { 
    constructor (
        private postBusiness: PostBusiness
    ) {}

    public getPosts = async (req: Request, res: Response) => {
        try {

            const input: TGetPostsInputDTO = {
                token: req.headers.authorization
            }

            const output = await this.postBusiness.getPosts(input)
    
            res.status(200).send(output)
        } catch (error) {
            console.log(error);
            
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createPost = async (req: Request, res: Response) => {
        try {
            const input: TCreatePostInputDTO = {
                token: req.headers.authorization,
                content: req.body.name
            }

            await this.postBusiness.createPost(input)
    
            res.status(201).end()
        } catch (error) {
            console.log(error);
            
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {
            const input: TEditPostInputDTO = {
                token: req.headers.authorization,
                content: req.body.name,
                idToEdit: req.params.id
            }

            await this.postBusiness.editPost(input)
    
            res.status(201).end()
        } catch (error) {
            console.log(error);
            
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const input: TDeletePostInputDTO = {
                token: req.headers.authorization,
                idToDelete: req.params.id
            }

            await this.postBusiness.deletePost(input)
    
            res.status(200).end()
        } catch (error) {
            console.log(error);
            
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}