import { Request, Response } from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { PostDatabase } from '../database/PostDatabase'
import { TGetPostsInputDTO } from '../dtos/postDTO'
import { BaseError } from '../errors/BaseError'
import { Post } from '../models/Post'
import { TPostDB } from '../types'

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
}